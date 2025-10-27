import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../utils/supabaseClient';
import { Item } from '../types/Item';

interface CreateItemData {
  name: string;
  description: string;
  quantity: number;
  price: number;
  image: string;
  created_by: string;
}

export const useCreateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateItemData): Promise<Item> => {
      const { data: newItem, error } = await supabase
        .from('item_alba')
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return newItem;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plants'] });
    },
  });
};
