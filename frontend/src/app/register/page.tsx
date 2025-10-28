'use server'

import { createClient } from '@/utils/supabaseServer';
import { AuthProvider } from '@/contexts/AuthContext';
import RegisterClient from '@/components/RegisterClient';

export default async function RegisterPage() {
  const supabase = await createClient();
  return <AuthProvider><RegisterClient /></AuthProvider>;
}
