import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../utils/supabaseClient';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export const useCurrentUser = () => {  
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async (): Promise<User | null> => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return null;

      const { data: userData } = await supabase
        .from('user_alba')
        .select('*')
        .eq('id', data.user.id)
        .single();

      return {
        id: data.user.id,
        email: data.user.email || '',
        name: userData?.name || data.user.user_metadata?.name || '',
        role: userData?.role || data.user.user_metadata?.role || 'USER',
      };
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      await supabase.auth.signInWithPassword({ email, password });
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, email, password }: { name: string; email: string; password: string }) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });
      if (error) throw error;
      if (!data.user) throw new Error('Failed to create user');

      const { error: insertError } = await supabase.from('user_alba').insert({
        id: data.user.id,
        name: name || '',
      });

      if (insertError) throw insertError;

      const user: User = {
        id: data.user.id,
        email: data.user.email || '',
        name: data.user.user_metadata?.name || '',
        role: data.user.user_metadata?.role || 'USER',
      };

      return {
        user,
        token: data.session?.access_token || '',
      };
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      queryClient.setQueryData(['currentUser'], data.user);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      localStorage.removeItem('token');
      await supabase.auth.signOut();
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['currentUser'] });
      queryClient.clear();
    },
  });
};
