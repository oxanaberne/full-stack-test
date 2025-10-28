'use server'

import ViewItem from '@/components/ViewItem';
import { createClient } from '@/utils/supabaseServer';
import { AuthProvider } from '@/contexts/AuthContext';

export default async function ViewItemPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession()  
  const user = session?.user ?? null;

  return <AuthProvider><ViewItem itemId={(await params).id} /></AuthProvider>;
}
