import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'; 
import * as images from '../assets/images/index';

const Friends = () => {
  // Sample data for friends list
  const friends = [
    { id: 1, name: 'Sara Doe', online: true, profilePic: 'profile' },
    { id: 2, name: 'Dylan Smith', online: false, profilePic: 'profile_Logo' },
    { id: 3, name: 'Jacob Johnson', online: true, profilePic: 'Jacob_Avatar' },
    { id: 4, name: 'Timbir Williams', online: false, profilePic: '' },
    { id: 5, name: 'Jon Brown', online: true, profilePic: 'jon_profile' },
  ];

  // Function to handle removing a friend
  const removeFriend = (friendId) => {
    // Logic to remove the friend with the given ID
    console.log(`Removed friend with ID: ${friendId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-800 to-gray-200">
      <Navbar />
      <div className="container mx-auto py-6 flex-grow">
        <h2 className="text-7xl font-extrabold mb-8 text-white">Friends ({friends.length})</h2>
        <div className="flex flex-col">
          {friends.map(friend => (
            <div
              key={friend.id}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4 rounded-md shadow-md mb-4 flex flex-col"
            >
              <div className="mb-4 flex items-center">
                {/* Profile Picture */}
                {friend.profilePic && images[friend.profilePic] ? (
                  <img src={images[friend.profilePic]} alt={friend.name} className="w-24 h-24 rounded-full" />
                ) : (
                  // If no profile picture is available, display a placeholder image
                  <img src={images.default} alt="Placeholder" className="w-24 h-24 rounded-full" />
                )}
                <div className="ml-4">
                  <h3 className="text-2xl font-semibold italic text-white">{friend.name}</h3>
                  <div className={`w-4 h-4 rounded-full ${friend.online ? 'bg-green-500' : 'bg-red-500'}`}></div>
                </div>
              </div>
              <p className="text-gray-300">Status: {friend.online ? 'Online' : 'Offline'}</p>
              <div className="flex justify-between">
                <button className="border-2 border-black bg-white text-black px-4 py-2 rounded-md mr-2">Message</button>
                <button onClick={() => removeFriend(friend.id)} className="border-2 border-red-500 bg-red-500 text-white px-4 py-2 rounded-md">Remove Friend</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Friends;