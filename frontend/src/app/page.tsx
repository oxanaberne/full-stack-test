'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../utils/supabaseClient';
import { Item } from '../types/Item';
import SearchItem from '../components/SearchItem';

export default function Home() {
  const { user, logout, loading } = useAuth();
  const [plants, setPlants] = useState<Item[]>([]);
  const [plantsLoading, setPlantsLoading] = useState(true);
  const [plantsError, setPlantsError] = useState('');

  const fetchPlants = async () => {
    try {
      setPlantsLoading(true);
      setPlantsError('');
      
      const { data, error } = await supabase
        .from('item_alba')
        .select('*')
        .order('quantity', { ascending: true });

      if (error) throw error;

      setPlants(data || []);
    } catch (error) {
      console.error('Error fetching plants:', error);
      setPlantsError('Failed to load plants. Please try again.');
    } finally {
      setPlantsLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchPlants();
  }, [user]);

  useEffect(() => {
    const handleFocus = () => {
      if (user) {
        fetchPlants();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
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
                  <span className="text-sm text-gray-700">
                    Welcome {user.name}!
                  </span>
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
                  <div className="text-red-600 mb-4">{plantsError}</div>
                  <button
                    onClick={fetchPlants}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <SearchItem items={plants} onDelete={fetchPlants} />
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
