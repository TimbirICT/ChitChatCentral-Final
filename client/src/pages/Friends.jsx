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
    <div>
      <Navbar />
      <div className="container mx-auto py-6">
        <h2 className="text-3xl font-semibold mb-6">Friends</h2>
        <div className="grid grid-cols-3 gap-4">
          {friends.map((friend) => (
            <div
              key={friend.id}
              className="bg-white p-4 rounded-md shadow-md flex items-center justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold">{friend.name}</h3>
                <p className="text-gray-500">Status: Online</p>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Message
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default Friends;