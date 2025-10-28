import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/utils/supabaseClient'
import { Item } from '@/utils/models'

export function useItems(initialData?: Item[]) {
  return useQuery<Item[], Error>({
    queryKey: ['item_alba'],
    queryFn: async () => {
      const { data, error } = await supabase.from('item_alba').select('*')
      if (error) throw error
      return data
    },
    initialData,
  })
}

export function useItem(itemId: string) {
  return useQuery<Item, Error>({
    queryKey: ['item', itemId],
    queryFn: async () => {
      const { data, error } = await supabase.from('item_alba').select('*').eq('id', itemId).single();
      if (error) throw error;
      return data;
    },
  });
}