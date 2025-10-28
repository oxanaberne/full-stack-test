'use server'

import { createClient } from '@/utils/supabaseServer';
import { CreateItemData } from '@/utils/models';

export async function createItem(data: CreateItemData) {
  const supabase = await createClient();
  const { data: newItem, error } = await supabase.from('item_alba').insert({
    name: data.name,
    description: data.description,
    quantity: data.quantity,
    price: data.price,
    created_by: data.created_by,
  })
  if (error) throw error;
  return newItem;
}
