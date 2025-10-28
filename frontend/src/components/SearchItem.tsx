import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Item } from "@/utils/models";
import ItemCard from "./ItemCard";
import { useAuth } from "@/contexts/AuthContext";

export interface SearchItemProps {
  items: Item[];
  onDelete?: () => void;
}

export default function SearchItem({ items, onDelete }: SearchItemProps) {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const router = useRouter();

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim())
      return items;
    
    const term = searchTerm.toLowerCase();
    return items.filter(item => 
      item.name.toLowerCase().includes(term)
    );
  }, [searchTerm, items]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="m-5">
      <div className="flex justify-center items-center gap-2 mb-6">
        <input 
          type="text" 
          placeholder="🔍 Search for a plant..."
          className="w-sm p-2 border border-gray-300 rounded-md text-gray-700" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div>
        {searchTerm ? (
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Search Results ({filteredItems.length} found)
          </h3>
        ) : (
          <div className="flex justify-between items-start ">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Our Plant Collection
            </h3>
            {user?.role === 'admin' && (
              <button 
                onClick={() => router.push('/admin/new')}
                className="bg-emerald-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-emerald-800 hover:cursor-pointer"
              >
                Add Plant
              </button>
            )}
          </div>
        )}

        {currentItems.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {currentItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
            
            <div className="flex justify-center items-center mt-8 space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>
              
              <div className="flex space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 text-sm font-medium rounded-full ${
                      currentPage === page
                        ? 'bg-emerald-700 text-white'
                        : 'text-gray-500 bg-white hover:cursor-pointer hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-500 hover:cursor-pointer hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No plants found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}