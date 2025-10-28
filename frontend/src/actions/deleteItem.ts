'use server'

import { createClient } from '@/utils/supabaseServer';

export async function deleteItem(itemId: string) {
    const supabase = await createClient();
    const { error } = await supabase
      .from('item_alba')
      .delete()
      .eq('id', itemId);

    if (error) throw error;
    return true;
};
