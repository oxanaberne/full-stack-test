import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../utils/supabaseClient';
import { Item } from '../types/Item';

interface UpdateItemData {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
}

export const useUpdateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateItemData): Promise<Item> => {
      const { data: updatedItem, error } = await supabase
        .from('item_alba')
        .update({
          name: data.name,
          description: data.description,
          quantity: data.quantity,
          price: data.price,
        })
        .eq('id', data.id)
        .select()
        .single();

      if (error) throw error;
      return updatedItem;
    },
    onSuccess: (updatedItem) => {
      queryClient.invalidateQueries({ queryKey: ['plants'] });
      queryClient.setQueryData(['item', updatedItem.id], updatedItem);
    },
  });
};
