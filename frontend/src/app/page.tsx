'use server';

import HomeClient from '@/components/HomeClient'
import { getItems } from '@/actions/getItem'
import { AuthProvider } from '@/contexts/AuthContext';

export default async function HomePage() {
  const items = await getItems();

  return <AuthProvider><HomeClient items={items} /></AuthProvider>
}