import React from 'react';
import Navbar from '../components/Navbar';

const Friends = () => {
  // Sample data for friends list
  const friends = [
    { id: 1, name: 'Sara Doe', online: true },
    { id: 2, name: 'Dylan Smith', online: false },
    { id: 3, name: 'Jacob Johnson', online: true },
    { id: 4, name: 'Timbir Williams', online: false },
    { id: 5, name: 'Jon Brown', online: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-200">
      <Navbar /> {/* Include Navbar component here */}
      <div className="container mx-auto py-6">
        <h2 className="text-6xl font-extrabold mb-8 text-white">Friends</h2>
        <div className="grid grid-cols-3 gap-4">
          {friends.map(friend => (
            <div
              key={friend.id}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4 rounded-md shadow-md flex flex-col justify-between"
            >
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <h3 className="text-xl font-semibold italic text-white mr-2">{friend.name}</h3>
                  {friend.online ? (
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  ) : (
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  )}
                </div>
                <p className="text-gray-300">Status: {friend.online ? 'Online' : 'Offline'}</p>
              </div>
              <button className="border-2 border-black bg-white text-black px-4 py-2 rounded-md">Message</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Friends;