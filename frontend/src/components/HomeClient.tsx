'use client'

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useItems } from '@/hooks/useItem';
import SearchItem from '@/components/SearchItem';
import UserAvatar from '@/components/UserAvatar';
import { Item } from '@/utils/models';
import { User } from '@supabase/supabase-js';

interface HomeClientProps {
    items: Item[]
  }

export default function HomeClient({ items }: HomeClientProps) {
  const { user, logout, loading } = useAuth();

  console.log("user", user);
  console.log("loading", loading);

  const { data: plants, isLoading: plantsLoading, error: plantsError, refetch } = useItems(items);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-lg text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-700">Alb's App</h1>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <UserAvatar />
                  <button
                    onClick={logout}
                    className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex space-x-2">
                  <Link
                    href="/login"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {user ? `Welcome back, ${user.name}!` : 'Welcome to Alb\'s App'}
            </h2>
            {user && (<p className="text-gray-600"> Browse our collection of beautiful plants or search for a specific plant <span className="text-3xl">🪴</span></p>)}
          </div>

          {user && (
            <>
              {plantsLoading ? (
                <div className="text-center py-8">
                  <div className="text-lg">Loading plants...</div>
                </div>
              ) : plantsError ? (
                <div className="text-center py-8">
                  <div className="text-red-600 mb-4">Failed to load plants. Please try again.</div>
                  <button
                    onClick={() => refetch()}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <SearchItem items={plants || []} />
              )}
            </>
          )}

          {!user && (
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Please login or register to access the application features.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
