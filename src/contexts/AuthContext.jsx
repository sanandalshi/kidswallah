import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [profileLoading, setProfileLoading] = useState(false)

  // Separate async operations object to prevent auth callback issues
  const profileOperations = {
    async load(userId) {
      if (!userId) return
      setProfileLoading(true)
      try {
        const { data, error } = await supabase
          ?.from('user_profiles')
          ?.select('*')
          ?.eq('id', userId)
          ?.single()
        
        if (!error && data) {
          setUserProfile(data)
        }
      } catch (error) {
        console.error('Profile loading error:', error)
      } finally {
        setProfileLoading(false)
      }
    },
    
    clear() {
      setUserProfile(null)
      setProfileLoading(false)
    }
  }

  // Protected auth handlers - MUST remain synchronous
  const authStateHandlers = {
    // CRITICAL: This MUST remain synchronous - no async/await allowed
    onChange: (event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
      
      if (session?.user) {
        // Fire-and-forget async operation
        profileOperations?.load(session?.user?.id)
      } else {
        profileOperations?.clear()
      }
    }
  }

  useEffect(() => {
    // Get initial session
    supabase?.auth?.getSession()?.then(({ data: { session } }) => {
      authStateHandlers?.onChange(null, session)
    })

    // Listen for auth changes - callback MUST remain synchronous
    const { data: { subscription } } = supabase?.auth?.onAuthStateChange(
      authStateHandlers?.onChange
    )

    return () => subscription?.unsubscribe()
  }, [])

  // Authentication methods
  const signIn = async (email, password) => {
    const { data, error } = await supabase?.auth?.signInWithPassword({
      email,
      password
    })
    
    if (error) {
      throw new Error(error.message)
    }
    
    return data
  }

  const signUp = async (email, password, userData = {}) => {
    const { data, error } = await supabase?.auth?.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    
    if (error) {
      throw new Error(error.message)
    }
    
    return data
  }

  const signOut = async () => {
    const { error } = await supabase?.auth?.signOut()
    if (error) {
      throw new Error(error.message)
    }
  }

  const updateProfile = async (updates) => {
    if (!user) return
    
    setProfileLoading(true)
    try {
      const { data, error } = await supabase?.from('user_profiles')?.update({ ...updates, updated_at: new Date()?.toISOString() })?.eq('id', user?.id)?.select()?.single()
      
      if (error) throw error
      
      setUserProfile(data)
      return data
    } finally {
      setProfileLoading(false)
    }
  }

  const value = {
    user,
    userProfile,
    loading,
    profileLoading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}