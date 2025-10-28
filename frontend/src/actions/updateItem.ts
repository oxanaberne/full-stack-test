'use server'

import { createClient } from '@/utils/supabaseServer';
import { UpdateItemData } from '@/utils/models';


export async function updateItem(data: UpdateItemData) {
  console.log('data', data);
  const supabase = await createClient();
  const { data: updatedItem, error } = await supabase
    .from('item_alba')
    .update({
      name: data.name,
      description: data.description,
      quantity: data.quantity,
      price: data.price,
    })
    .eq('id', data.id);
    if (error) {
      console.log('error', error);
    }
  if (error) throw error;
  return true;
};
