import { supabase } from '../lib/supabase';

export const authService = {
  // Sign in with email and password
  async signIn(email, password) {
    try {
      const { data, error } = await supabase?.auth?.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        return { success: false, error: error?.message };
      }
      
      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  },

  // Sign up with email and password
  async signUp(email, password, metadata = {}) {
    try {
      const { data, error } = await supabase?.auth?.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });
      
      if (error) {
        return { success: false, error: error?.message };
      }
      
      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  },

  // Sign out
  async signOut() {
    try {
      const { error } = await supabase?.auth?.signOut();
      
      if (error) {
        return { success: false, error: error?.message };
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  },

  // Get current session
  async getSession() {
    try {
      const { data: { session }, error } = await supabase?.auth?.getSession();
      
      if (error) {
        return { success: false, error: error?.message };
      }
      
      return { success: true, session };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  },

  // Get user profile
  async getUserProfile(userId) {
    try {
      const { data, error } = await supabase?.from('user_profiles')?.select('*')?.eq('id', userId)?.single();
      
      if (error) {
        return { success: false, error: error?.message };
      }
      
      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  },

  // Update user profile
  async updateUserProfile(userId, updates) {
    try {
      const { data, error } = await supabase?.from('user_profiles')?.update({ ...updates, updated_at: new Date()?.toISOString() })?.eq('id', userId)?.select()?.single();
      
      if (error) {
        return { success: false, error: error?.message };
      }
      
      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  }
};