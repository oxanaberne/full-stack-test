'use server'

import { createClient } from '@/utils/supabaseServer';
import CreateItemClient from '@/components/CreateItemClient';
import { AuthProvider } from '@/contexts/AuthContext';

export default async function CreateItemPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession()
  const user = session?.user ?? null;

  return <AuthProvider initialUser={user}><CreateItemClient /></AuthProvider>;
}
