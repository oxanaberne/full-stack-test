'use server'

import { createClient } from '@/utils/supabaseServer';
import UpdateItemClient from '@/components/UpdateItemClient';
import { AuthProvider } from '@/contexts/AuthContext';

export default async function EditItemPage({ params }: { params: Promise<{ id: string }> }) {
  return <AuthProvider><UpdateItemClient itemId={(await params).id} /></AuthProvider>;
}