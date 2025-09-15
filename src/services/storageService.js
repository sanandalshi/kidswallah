import { supabase } from '../lib/supabase';

export const storageService = {
  // Upload video file
  async uploadVideo(file, fileName, onProgress) {
    try {
      const { data, error } = await supabase?.storage?.from('videos')?.upload(fileName, file, {
          upsert: false,
          onUploadProgress: onProgress
        });
      
      if (error) {
        return { success: false, error: error?.message };
      }
      
      // Get public URL for the uploaded video
      const { data: urlData } = supabase?.storage?.from('videos')?.getPublicUrl(fileName);
      
      return { 
        success: true, 
        data: {
          path: data?.path,
          url: urlData?.publicUrl
        }
      };
    } catch (error) {
      return { success: false, error: 'Failed to upload video' };
    }
  },

  // Upload thumbnail image
  async uploadThumbnail(file, fileName, onProgress) {
    try {
      const { data, error } = await supabase?.storage?.from('video-thumbnails')?.upload(fileName, file, {
          upsert: true,
          onUploadProgress: onProgress
        });
      
      if (error) {
        return { success: false, error: error?.message };
      }
      
      // Get public URL for the uploaded thumbnail
      const { data: urlData } = supabase?.storage?.from('video-thumbnails')?.getPublicUrl(fileName);
      
      return { 
        success: true, 
        data: {
          path: data?.path,
          url: urlData?.publicUrl
        }
      };
    } catch (error) {
      return { success: false, error: 'Failed to upload thumbnail' };
    }
  },

  // Upload profile image
  async uploadProfileImage(file, userId, onProgress) {
    try {
      const fileExt = file?.name?.split('.')?.pop();
      const fileName = `${userId}/profile.${fileExt}`;
      
      const { data, error } = await supabase?.storage?.from('profile-images')?.upload(fileName, file, {
          upsert: true,
          onUploadProgress: onProgress
        });
      
      if (error) {
        return { success: false, error: error?.message };
      }
      
      // Get signed URL for the uploaded profile image (private bucket)
      const { data: signedUrlData, error: signedUrlError } = await supabase?.storage?.from('profile-images')?.createSignedUrl(fileName, 3600); // 1 hour expiry
      
      if (signedUrlError) {
        return { success: false, error: signedUrlError?.message };
      }
      
      return { 
        success: true, 
        data: {
          path: data?.path,
          signedUrl: signedUrlData?.signedUrl
        }
      };
    } catch (error) {
      return { success: false, error: 'Failed to upload profile image' };
    }
  },

  // Get signed URL for profile image
  async getProfileImageUrl(userId, expiresIn = 3600) {
    try {
      const { data, error } = await supabase?.storage?.from('profile-images')?.createSignedUrl(`${userId}/profile.jpg`, expiresIn);
      
      if (error) {
        return { success: false, error: error?.message };
      }
      
      return { success: true, url: data?.signedUrl };
    } catch (error) {
      return { success: false, error: 'Failed to get profile image URL' };
    }
  },

  // Delete file from storage
  async deleteFile(bucketName, fileName) {
    try {
      const { error } = await supabase?.storage?.from(bucketName)?.remove([fileName]);
      
      if (error) {
        return { success: false, error: error?.message };
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to delete file' };
    }
  },

  // Get file list from bucket
  async listFiles(bucketName, folderPath = '', options = {}) {
    try {
      const { data, error } = await supabase?.storage?.from(bucketName)?.list(folderPath, {
          limit: options?.limit || 100,
          offset: options?.offset || 0,
          sortBy: options?.sortBy || { column: 'name', order: 'asc' }
        });
      
      if (error) {
        return { success: false, error: error?.message };
      }
      
      return { success: true, data: data || [] };
    } catch (error) {
      return { success: false, error: 'Failed to list files' };
    }
  },

  // Generate video thumbnail URL
  getVideoThumbnailUrl(thumbnailPath) {
    if (!thumbnailPath) return null;
    
    const { data } = supabase?.storage?.from('video-thumbnails')?.getPublicUrl(thumbnailPath);
    
    return data?.publicUrl;
  },

  // Generate video URL
  getVideoUrl(videoPath) {
    if (!videoPath) return null;
    
    const { data } = supabase?.storage?.from('videos')?.getPublicUrl(videoPath);
    
    return data?.publicUrl;
  }
};