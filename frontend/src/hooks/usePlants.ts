import { useQuery } from '@tanstack/react-query';
import { supabase } from '../utils/supabaseClient';
import { Item } from '../types/Item';

export const usePlants = () => {
  return useQuery({
    queryKey: ['plants'],
    queryFn: async (): Promise<Item[]> => {
      const { data, error } = await supabase
        .from('item_alba')
        .select('*')
        .order('quantity', { ascending: true });

      if (error) throw error;
      return data || [];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 3,
  });
};
