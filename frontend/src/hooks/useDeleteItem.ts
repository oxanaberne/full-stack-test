import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../utils/supabaseClient';

export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemId: string): Promise<void> => {
      const { error } = await supabase
        .from('item_alba')
        .delete()
        .eq('id', itemId);

      if (error) throw error;
    },
    onSuccess: (_, itemId) => {
      // Invalidate and refetch plants list
      queryClient.invalidateQueries({ queryKey: ['plants'] });
      // Remove the specific item from cache
      queryClient.removeQueries({ queryKey: ['item', itemId] });
    },
  });
};
