import { supabase } from '../lib/supabase';

export const videoService = {
  // Get all published videos with pagination
  async getVideos(options = {}) {
    try {
      const { 
        page = 1, 
        limit = 12, 
        category, 
        ageRating, 
        searchTerm,
        sortBy = 'created_at',
        sortOrder = 'desc'
      } = options;

      let query = supabase?.from('videos')?.select(`
          *,
          creator:user_profiles!creator_id(
            id,
            display_name,
            full_name,
            avatar_url
          )
        `)?.eq('status', 'published');

      // Apply filters
      if (category) {
        query = query?.eq('category', category);
      }
      
      if (ageRating) {
        query = query?.eq('age_rating', ageRating);
      }
      
      if (searchTerm) {
        query = query?.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      // Apply sorting
      query = query?.order(sortBy, { ascending: sortOrder === 'asc' });

      // Apply pagination
      const from = (page - 1) * limit;
      query = query?.range(from, from + limit - 1);

      const { data, error } = await query;
      
      if (error) {
        return { success: false, error: error?.message };
      }
      
      return { success: true, data: data || [] };
    } catch (error) {
      return { success: false, error: 'Failed to fetch videos' };
    }
  },

  // Get video by ID with creator info
  async getVideoById(videoId) {
    try {
      const { data, error } = await supabase?.from('videos')?.select(`
          *,
          creator:user_profiles!creator_id(
            id,
            display_name,
            full_name,
            avatar_url,
            bio
          )
        `)?.eq('id', videoId)?.single();
      
      if (error) {
        return { success: false, error: error?.message };
      }
      
      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to fetch video' };
    }
  },

  // Create a new video
  async createVideo(videoData) {
    try {
      const { data, error } = await supabase?.from('videos')?.insert([videoData])?.select()?.single();
      
      if (error) {
        return { success: false, error: error?.message };
      }
      
      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to create video' };
    }
  },

  // Update video
  async updateVideo(videoId, updates) {
    try {
      const { data, error } = await supabase?.from('videos')?.update({ ...updates, updated_at: new Date()?.toISOString() })?.eq('id', videoId)?.select()?.single();
      
      if (error) {
        return { success: false, error: error?.message };
      }
      
      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to update video' };
    }
  },

  // Delete video
  async deleteVideo(videoId) {
    try {
      const { error } = await supabase?.from('videos')?.delete()?.eq('id', videoId);
      
      if (error) {
        return { success: false, error: error?.message };
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to delete video' };
    }
  },

  // Increment video view count
  async incrementViewCount(videoId) {
    try {
      const { error } = await supabase?.rpc('increment_video_views', {
        video_uuid: videoId
      });
      
      if (error) {
        return { success: false, error: error?.message };
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to update view count' };
    }
  },

  // Record video interaction (view, like, favorite)
  async recordInteraction(videoId, interactionType, watchTimeSeconds = 0, completed = false) {
    try {
      const { data, error } = await supabase?.from('video_interactions')?.upsert([{
          video_id: videoId,
          user_id: (await supabase?.auth?.getUser())?.data?.user?.id,
          interaction_type: interactionType,
          watch_time_seconds: watchTimeSeconds,
          completed
        }])?.select()?.single();
      
      if (error) {
        return { success: false, error: error?.message };
      }
      
      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to record interaction' };
    }
  },

  // Get user's video interactions
  async getUserInteractions(userId, videoId = null) {
    try {
      let query = supabase?.from('video_interactions')?.select('*')?.eq('user_id', userId);
      
      if (videoId) {
        query = query?.eq('video_id', videoId);
      }
      
      const { data, error } = await query;
      
      if (error) {
        return { success: false, error: error?.message };
      }
      
      return { success: true, data: data || [] };
    } catch (error) {
      return { success: false, error: 'Failed to fetch interactions' };
    }
  },

  // Get videos by creator
  async getVideosByCreator(creatorId) {
    try {
      const { data, error } = await supabase?.from('videos')?.select('*')?.eq('creator_id', creatorId)?.order('created_at', { ascending: false });
      
      if (error) {
        return { success: false, error: error?.message };
      }
      
      return { success: true, data: data || [] };
    } catch (error) {
      return { success: false, error: 'Failed to fetch creator videos' };
    }
  }
};