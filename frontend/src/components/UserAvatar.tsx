'use client';

import { useAuth } from '../contexts/AuthContext';

export default function UserAvatar() {
  const { user } = useAuth();
  
  if (!user) return null;
  const getRandomAvatar = () => {
    const avatarNumber = (user.id.charCodeAt(0) + user.id.charCodeAt(1)) % 11 + 1;
    return `/images/plant-${avatarNumber}.jpg`;
  };

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2">
        <img
          src={getRandomAvatar()}
          alt={`${user.name}'s avatar`}
          className="w-8 h-8 rounded-full object-cover border-2 border-gray-300"
        />
        <div className="text-sm">
          <div className="font-medium text-gray-900">{user.name}</div>
          <div className="text-gray-500 text-xs">{user.email}</div>
          <div className="text-xs font-semibold text-emerald-600 uppercase">
            {user.role}
          </div>
        </div>
      </div>
    </div>
  );
}
