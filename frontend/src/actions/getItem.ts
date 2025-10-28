'use server'

import { createClient } from '@/utils/supabaseServer';

export async function getItems() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('item_alba').select('*')
  if (error) throw error;
  return data;
};

export async function getItem(itemId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('item_alba').select('*').eq('id', itemId).single();
  if (error) throw error;
  return data;
}