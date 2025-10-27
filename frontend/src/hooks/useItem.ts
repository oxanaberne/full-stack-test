import { useQuery } from '@tanstack/react-query';
import { supabase } from '../utils/supabaseClient';
import { Item } from '../types/Item';

export const useItem = (itemId: string | string[] | undefined) => {
  return useQuery({
    queryKey: ['item', itemId],
    queryFn: async (): Promise<Item> => {
      if (!itemId) throw new Error('Item ID is required');
      
      const { data, error } = await supabase
        .from('item_alba')
        .select('*')
        .eq('id', itemId)
        .single();

      if (error) throw error;
      if (!data) throw new Error('Item not found');
      
      return data;
    },
    enabled: !!itemId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 3,
  });
};
