'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { supabase } from '@/utils/supabaseClient'

interface AuthContextType {
  user: any | null
  loading: boolean
  logout: () => Promise<void>,
  login: (email: string, password: string) => Promise<void>,
  register: (name: string, email: string, password: string) => Promise<void>,
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children, initialUser }: { children: ReactNode; initialUser: any }) {
  const [user, setUser] = useState(initialUser)
  const [loading, setLoading] = useState(!initialUser)

  useEffect(() => {
    fetchUser();
  }, []);


  const fetchUser = async () => {
    try {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        const { data: userData, error: userError } = await supabase.from("user_alba").select("*").eq("id", data.user.id).single();
        if (userError) throw userError;
        setUser({
          id: data.user.id,
          email: data.user.email || '',
          name: userData?.name || '',
          role: userData?.role,
        });
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    const { data: userData } = await supabase.from("user_alba").select("*").eq("id", data.user.id).single();
    if (!userData) throw new Error('User not found');
    
    setUser({
      id: data.user.id,
      email: data.user.email || '',
      name: userData?.name || '',
      role: userData?.role,
    });
  };

  const register = async (name: string, email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });
    if (error) throw error;
    if (!data.user) throw new Error('Failed to create user');

    const { error: insertError } = await supabase.from("user_alba").insert({
      id: data.user.id,
      name : name || '',
    });

    if (insertError) throw insertError;

    setUser({
      id: data.user.id || '',
      email: data.user.email || '',
      name: data.user.user_metadata?.name || '',
      role: data.user.user_metadata?.role || 'USER',
    });
  };

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, loading, logout, login, register }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}