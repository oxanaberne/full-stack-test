'use server'

import LoginClient from '@/components/LoginClient';
import { createClient } from '@/utils/supabaseServer';
import { AuthProvider } from '@/contexts/AuthContext';

export default async function LoginPage() {
  return <AuthProvider><LoginClient /></AuthProvider>;
}
