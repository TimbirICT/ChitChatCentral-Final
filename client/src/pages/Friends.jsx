import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import * as images from '../assets/images/index';
import { Link } from 'react-router-dom';

const Friends = () => {
  // Sample data for friends list
  const [searchQuery, setSearchQuery] = useState('');
  const [friends, setFriends] = useState([
    { id: 2, name: 'Dylan Smith', online: false, profilePic: 'profile_Logo' },
    { id: 3, name: 'Jacob Johnson', online: true, profilePic: 'Jacob_Avatar' },
    { id: 4, name: 'Timbir Williams', online: false, profilePic: '' },
    { id: 5, name: 'Jon Brown', online: true, profilePic: 'jon_profile' },
  ]);

  const [searchedUser, setSearchedUser] = useState('');
  const [searchedUserId, setSearchedUserId] = useState('');

  // Function to handle removing a friend
  const removeFriend = (friendId) => {
    const updatedFriends = friends.filter((friend) => friend.id !== friendId);
    setFriends(updatedFriends);
  };

  // Function to handle adding a friend
  const addFriend = () => {
    if (searchedUser.trim() === '') return;
    const newFriend = { id: friends.length + 1, name: searchedUser, online: false };
    setFriends([...friends, newFriend]);
    setSearchedUser('');
    setSearchedUserId('');
  };

  // Function to navigate to conversation page
  const navigateToConversation = (friendId) => {
    window.location.href = `/conversation/${friendId}`; // Navigate to conversation page with friendId
  };

  // Function to search user by ID
  const searchUserById = () => {
    if (searchedUserId.trim() === '') return;
    // Logic to search for user by ID
    // Replace this with your actual search functionality
  };

  // Filter friends based on search query
  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-800 to-gray-200">
      <Navbar />
      <div className="container mx-auto py-6 flex-grow">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-7xl font-extrabold mb-2 text-white">Friends ({filteredFriends.length})</h2>
            <div className="flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search friends..."
                className="border border-gray-300 px-4 py-2 rounded-md mr-4"
              />
              <button
                onClick={searchUserById}
                className="border-2 border-gray-500 bg-gray-500 text-white px-4 py-2 rounded-md mr-4"
              >
                Search User
              </button>
              <input
                type="text"
                value={searchedUserId}
                onChange={(e) => setSearchedUserId(e.target.value)}
                placeholder="Enter user ID..."
                className="border border-gray-300 px-4 py-2 rounded-md mr-4"
              />
              <button
                onClick={addFriend}
                className="border-2 border-green-500 bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Add Friend
              </button>
            </div>
          </div>
          <div>
            <a href="https://www.paypal.com/" target="_blank" rel="noopener noreferrer" className="flex items-center border-2 border-black bg-blue-800 text-white px-4 py-2 rounded-md">
              <span className="border-b-2 border-black">Send Money through PayPal</span>
              <span role="img" aria-label="Money" className="ml-2"> 💸</span>
            </a>
          </div>
        </div>
        <div className="flex flex-col">
          {filteredFriends.map((friend) => (
            <div
              key={friend.id}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4 rounded-md shadow-md mb-4 flex flex-col relative"
            >
              <div className="flex items-center justify-between">
                {/* Profile Picture */}
                {friend.profilePic && images[friend.profilePic] ? (
                  <img
                    src={images[friend.profilePic]}
                    alt={friend.name}
                    className="w-24 h-24 rounded-full"
                  />
                ) : (
                  <img src={images.default} alt="Placeholder" className="w-24 h-24 rounded-full" />
                )}
                <div className="flex flex-col mt-2">
                  <Link to={`/conversation/${friend.id}`}>
                    <button className="border-2 border-black bg-white text-black px-4 py-2 rounded-md mb-2">
                      Message
                    </button>
                  </Link>
                </div>
              </div>
              <div className="ml-4 flex-grow">
                <h3 className="text-2xl font-semibold italic text-white">{friend.name}</h3>
                <div className={`w-4 h-4 rounded-full ${friend.online ? 'bg-green-500' : 'bg-red-500'}`}></div>
              </div>
              <p className="text-gray-300">Status: {friend.online ? 'Online' : 'Offline'}</p>
              <div className="absolute right-4 bottom-4">
                <button
                  onClick={() => removeFriend(friend.id)}
                  className="border-2 border-red-500 bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Remove Friend
                </button>
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
