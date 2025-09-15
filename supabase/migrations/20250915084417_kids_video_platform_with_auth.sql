-- Location: supabase/migrations/20250915084417_kids_video_platform_with_auth.sql
-- Schema Analysis: No existing schema - fresh implementation
-- Integration Type: Complete kids video platform with authentication
-- Dependencies: Full authentication + video management + storage system

-- 1. ENUMS AND TYPES
CREATE TYPE public.user_role AS ENUM ('parent', 'creator', 'educator', 'admin');
CREATE TYPE public.video_status AS ENUM ('draft', 'processing', 'published', 'archived');
CREATE TYPE public.age_rating AS ENUM ('toddler', 'preschool', 'elementary', 'tween');
CREATE TYPE public.content_category AS ENUM ('educational', 'entertainment', 'music', 'stories', 'science', 'art');

-- 2. CORE TABLES

-- Critical intermediary table for PostgREST compatibility
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    display_name TEXT,
    role public.user_role DEFAULT 'parent'::public.user_role,
    avatar_url TEXT,
    bio TEXT,
    date_of_birth DATE,
    parent_email TEXT, -- For creator/educator accounts managed by parents
    is_active BOOLEAN DEFAULT true,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Video content table
CREATE TABLE public.videos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    creator_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    video_url TEXT, -- Supabase Storage path
    thumbnail_url TEXT, -- Supabase Storage path
    duration_seconds INTEGER,
    status public.video_status DEFAULT 'draft'::public.video_status,
    age_rating public.age_rating DEFAULT 'preschool'::public.age_rating,
    category public.content_category DEFAULT 'educational'::public.content_category,
    tags TEXT[] DEFAULT '{}',
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    content_warnings TEXT[],
    educational_notes TEXT,
    language_code TEXT DEFAULT 'en',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Video interactions (views, likes, watch time)
CREATE TABLE public.video_interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    video_id UUID REFERENCES public.videos(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    interaction_type TEXT NOT NULL, -- 'view', 'like', 'favorite'
    watch_time_seconds INTEGER DEFAULT 0,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(video_id, user_id, interaction_type)
);

-- Comments system
CREATE TABLE public.video_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    video_id UUID REFERENCES public.videos(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    parent_comment_id UUID REFERENCES public.video_comments(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT false, -- Moderation for safety
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Playlists/Collections
CREATE TABLE public.playlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    creator_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    thumbnail_url TEXT,
    is_public BOOLEAN DEFAULT false,
    age_rating public.age_rating DEFAULT 'preschool'::public.age_rating,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Playlist videos junction table
CREATE TABLE public.playlist_videos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    playlist_id UUID REFERENCES public.playlists(id) ON DELETE CASCADE,
    video_id UUID REFERENCES public.videos(id) ON DELETE CASCADE,
    sort_order INTEGER DEFAULT 0,
    added_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(playlist_id, video_id)
);

-- Parental controls and safety settings
CREATE TABLE public.parental_controls (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    child_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    max_daily_minutes INTEGER DEFAULT 60,
    allowed_categories public.content_category[] DEFAULT ARRAY['educational', 'stories']::public.content_category[],
    max_age_rating public.age_rating DEFAULT 'preschool'::public.age_rating,
    blocked_creators UUID[] DEFAULT '{}',
    time_restrictions JSONB DEFAULT '{"start_time": "08:00", "end_time": "18:00"}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(parent_id, child_id)
);

-- 3. INDEXES FOR PERFORMANCE
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX idx_videos_creator_id ON public.videos(creator_id);
CREATE INDEX idx_videos_status ON public.videos(status);
CREATE INDEX idx_videos_category ON public.videos(category);
CREATE INDEX idx_videos_age_rating ON public.videos(age_rating);
CREATE INDEX idx_videos_created_at ON public.videos(created_at DESC);
CREATE INDEX idx_videos_view_count ON public.videos(view_count DESC);
CREATE INDEX idx_video_interactions_video_id ON public.video_interactions(video_id);
CREATE INDEX idx_video_interactions_user_id ON public.video_interactions(user_id);
CREATE INDEX idx_video_comments_video_id ON public.video_comments(video_id);
CREATE INDEX idx_playlists_creator_id ON public.playlists(creator_id);
CREATE INDEX idx_playlist_videos_playlist_id ON public.playlist_videos(playlist_id);
CREATE INDEX idx_parental_controls_parent_id ON public.parental_controls(parent_id);

-- 4. FUNCTIONS AND TRIGGERS

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'parent'::public.user_role)
  );
  RETURN NEW;
END;
$$;

-- Trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update video view count
CREATE OR REPLACE FUNCTION public.increment_video_views(video_uuid UUID)
RETURNS VOID
LANGUAGE sql
SECURITY DEFINER
AS $$
UPDATE public.videos 
SET view_count = view_count + 1, updated_at = CURRENT_TIMESTAMP
WHERE id = video_uuid;
$$;

-- Function to get user's watch time for parental controls
CREATE OR REPLACE FUNCTION public.get_daily_watch_time(user_uuid UUID)
RETURNS INTEGER
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT COALESCE(SUM(vi.watch_time_seconds), 0)::INTEGER
FROM public.video_interactions vi
WHERE vi.user_id = user_uuid 
AND vi.interaction_type = 'view'
AND DATE(vi.created_at) = CURRENT_DATE;
$$;

-- 5. ROW LEVEL SECURITY SETUP
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.playlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.playlist_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parental_controls ENABLE ROW LEVEL SECURITY;

-- 6. RLS POLICIES

-- Pattern 1: Core user profiles table - Simple ownership
CREATE POLICY "users_manage_own_user_profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- Pattern 4: Public read, private write for videos
CREATE POLICY "public_can_view_published_videos"
ON public.videos
FOR SELECT
TO public
USING (status = 'published'::public.video_status);

CREATE POLICY "creators_manage_own_videos"
ON public.videos
FOR ALL
TO authenticated
USING (creator_id = auth.uid())
WITH CHECK (creator_id = auth.uid());

-- Pattern 2: Simple user ownership for interactions
CREATE POLICY "users_manage_own_video_interactions"
ON public.video_interactions
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Pattern 2: Simple user ownership for comments
CREATE POLICY "users_manage_own_video_comments"
ON public.video_comments
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Public read for approved comments
CREATE POLICY "public_can_view_approved_comments"
ON public.video_comments
FOR SELECT
TO public
USING (is_approved = true);

-- Pattern 2: Simple user ownership for playlists
CREATE POLICY "users_manage_own_playlists"
ON public.playlists
FOR ALL
TO authenticated
USING (creator_id = auth.uid())
WITH CHECK (creator_id = auth.uid());

-- Public read for public playlists
CREATE POLICY "public_can_view_public_playlists"
ON public.playlists
FOR SELECT
TO public
USING (is_public = true);

-- Playlist videos - access through playlist ownership
CREATE OR REPLACE FUNCTION public.can_access_playlist_videos(playlist_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.playlists p
    WHERE p.id = playlist_uuid 
    AND (p.creator_id = auth.uid() OR p.is_public = true)
)
$$;

CREATE POLICY "users_manage_playlist_videos"
ON public.playlist_videos
FOR ALL
TO authenticated
USING (public.can_access_playlist_videos(playlist_id))
WITH CHECK (public.can_access_playlist_videos(playlist_id));

-- Pattern 2: Parental controls - parent manages
CREATE POLICY "parents_manage_parental_controls"
ON public.parental_controls
FOR ALL
TO authenticated
USING (parent_id = auth.uid())
WITH CHECK (parent_id = auth.uid());

-- 7. STORAGE BUCKETS

-- Public bucket for video thumbnails and public assets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'video-thumbnails',
    'video-thumbnails',
    true,
    10485760, -- 10MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
);

-- Public bucket for video files
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'videos',
    'videos',
    true,
    104857600, -- 100MB limit for videos
    ARRAY['video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mov']
);

-- Private bucket for user profile images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'profile-images',
    'profile-images',
    false,
    5242880, -- 5MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
);

-- 8. STORAGE RLS POLICIES

-- Anyone can view video thumbnails and videos (public content)
CREATE POLICY "public_can_view_video_thumbnails"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'video-thumbnails');

CREATE POLICY "public_can_view_videos"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'videos');

-- Only authenticated users can upload videos and thumbnails
CREATE POLICY "authenticated_users_upload_video_thumbnails"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'video-thumbnails');

CREATE POLICY "authenticated_users_upload_videos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'videos');

-- Only file owner can delete videos and thumbnails
CREATE POLICY "owners_manage_video_thumbnails"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'video-thumbnails' AND owner = auth.uid());

CREATE POLICY "owners_manage_videos"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'videos' AND owner = auth.uid());

-- Private profile images - only uploader can access
CREATE POLICY "users_view_own_profile_images"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'profile-images' AND owner = auth.uid());

CREATE POLICY "users_upload_own_profile_images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'profile-images' 
    AND owner = auth.uid()
);

CREATE POLICY "users_update_own_profile_images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'profile-images' AND owner = auth.uid())
WITH CHECK (bucket_id = 'profile-images' AND owner = auth.uid());

CREATE POLICY "users_delete_own_profile_images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'profile-images' AND owner = auth.uid());

-- 9. MOCK DATA FOR DEVELOPMENT

DO $$
DECLARE
    parent_id UUID := gen_random_uuid();
    creator_id UUID := gen_random_uuid();
    educator_id UUID := gen_random_uuid();
    video1_id UUID := gen_random_uuid();
    video2_id UUID := gen_random_uuid();
    video3_id UUID := gen_random_uuid();
    playlist_id UUID := gen_random_uuid();
BEGIN
    -- Create auth users with required fields
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (parent_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'parent@kidsvid.com', crypt('parent123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Sarah Johnson", "role": "parent"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (creator_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'creator@kidsvid.com', crypt('creator123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Creative Kids Studio", "role": "creator"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (educator_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'teacher@kidsvid.com', crypt('teacher123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Ms. Emily Teacher", "role": "educator"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Create sample videos
    INSERT INTO public.videos (id, creator_id, title, description, status, age_rating, category, view_count, like_count)
    VALUES
        (video1_id, creator_id, 'Learning Colors with Fun Animals', 'Join our friendly animals as they teach you about different colors! Perfect for toddlers and preschoolers.', 'published'::public.video_status, 'toddler'::public.age_rating, 'educational'::public.content_category, 1250, 89),
        (video2_id, creator_id, 'The Magic Garden Adventure', 'Follow Lily and her magical garden friends on an exciting adventure full of wonder and learning!', 'published'::public.video_status, 'preschool'::public.age_rating, 'stories'::public.content_category, 2100, 156),
        (video3_id, educator_id, 'Simple Science: How Plants Grow', 'Discover the amazing world of plants and learn how they grow from tiny seeds to beautiful flowers.', 'published'::public.video_status, 'elementary'::public.age_rating, 'science'::public.content_category, 875, 67);

    -- Create sample playlist
    INSERT INTO public.playlists (id, creator_id, title, description, is_public, age_rating)
    VALUES
        (playlist_id, creator_id, 'Educational Fun for Preschoolers', 'A curated collection of safe, educational, and entertaining videos perfect for preschool-aged children.', true, 'preschool'::public.age_rating);

    -- Add videos to playlist
    INSERT INTO public.playlist_videos (playlist_id, video_id, sort_order)
    VALUES
        (playlist_id, video1_id, 1),
        (playlist_id, video2_id, 2);

    -- Create sample interactions
    INSERT INTO public.video_interactions (video_id, user_id, interaction_type, watch_time_seconds, completed)
    VALUES
        (video1_id, parent_id, 'view', 180, true),
        (video1_id, parent_id, 'like', 0, false),
        (video2_id, parent_id, 'view', 240, true);

    -- Create sample approved comment
    INSERT INTO public.video_comments (video_id, user_id, content, is_approved)
    VALUES
        (video1_id, parent_id, 'My daughter loves this video! Great way to learn colors.', true);

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key error: %', SQLERRM;
    WHEN unique_violation THEN
        RAISE NOTICE 'Unique constraint error: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Unexpected error: %', SQLERRM;
END $$;