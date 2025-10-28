'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Item } from '@/utils/models';
import { useDeleteItem } from '@/hooks/useDeleteItem';

export default function ItemCard({ item, onDelete }: {item: Item, onDelete?: () => void}) {
  const router = useRouter();
  const { user } = useAuth();
  const deleteItemMutation = useDeleteItem();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'AED',
    }).format(price);
  };

  const handleClick = () => {
    router.push(`/item/${item.id}`);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/admin/${item.id}/edit`);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!confirm('Are you sure you want to delete this plant? This action cannot be undone.')) {
      return;
    }

    try {
      await deleteItemMutation.mutateAsync(item.id);
      if (onDelete) onDelete();
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete plant. Please try again.');
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer relative"
      onClick={handleClick}
    >
      <div className="relative w-full h-60 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {item.name}
        </h3>
        <span className="text-md font-bold text-green-900">
            {formatPrice(item.price)}
        </span>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-sm text-gray-500">Quantity:</span>
            <span className="ml-2 text-sm font-medium text-gray-900">
              {item.quantity}
            </span>
          </div>
          
          {user?.role === 'admin' && (
            <div className="flex space-x-2">
              <button
                onClick={handleEdit}
                className="text-white px-2 py-1 rounded text-xs hover:bg-blue-200 hover:cursor-pointer transition-colors"
                title="Edit plant"
              >
                ✏️
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteItemMutation.isPending}
                className="text-white px-2 py-1 rounded text-xs hover:bg-red-200 hover:cursor-pointer transition-colors disabled:opacity-50"
                title="Delete plant"
              >
                {deleteItemMutation.isPending ? '⏳' : '🗑️'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
