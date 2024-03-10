import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import * as images from '../assets/images';
import { Link } from 'react-router-dom';
import { QUERY_USER, ADD_FRIEND } from '../utils/query';

const Friends = () => {
  const { loading: meLoading, data: meData } = useQuery(QUERY_USER);
  const [addFriendMutation] = useMutation(ADD_FRIEND);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchedUserId, setSearchedUserId] = useState('');

  if (meLoading) {
    return <p>Loading...</p>;
  }

  const user = meData?.user;
  const currentUser = user || {};
  const friends = currentUser.friends || [];

  const removeFriend = (friendId) => {
    // Implement logic to remove a friend (you might need a mutation for this)
  };

  const addFriend = async () => {
    if (searchedUserId.trim() === '') return;

    try {
      const { data } = await addFriendMutation({
        variables: { friendId: searchedUserId },
      });

      const newFriend = data.addFriend;

      setSearchedUserId('');

      // Use the spread operator to create a new array
      // This ensures the state remains immutable
      // and triggers a re-render
      friends.push(newFriend);
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };

  const navigateToConversation = (friendId, friendName) => {
    // Use the `history` object from React Router to navigate
    // instead of directly manipulating the window location
    // This keeps the navigation within your React app
    // and provides better control
    history.push(`/conversation/${friendId}/${encodeURIComponent(friendName)}`);
  };

  const searchUserById = () => {
    if (searchedUserId.trim() === '') return;
    // Logic to search for user by ID
    // Replace this with your actual search functionality
  };

  const filteredFriends = friends.filter((friend) =>
    friend.username.toLowerCase().includes(searchQuery.toLowerCase())
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
            <a
              href="https://www.paypal.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center border-2 border-black bg-blue-800 text-white px-4 py-2 rounded-md"
            >
              <span className="border-b-2 border-black">Send Money through PayPal</span>
              <span role="img" aria-label="Money" className="ml-2"> 💸</span>
            </a>
          </div>
        </div>
        <div className="flex flex-col">
          {filteredFriends.map((friend) => (
            <div
              key={friend._id}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4 rounded-md shadow-md mb-4 flex flex-col relative"
            >
              <div className="flex items-center justify-between">
                {/* Profile Picture */}
                <img
                  src={images[friend.profilePic] || images.default}
                  alt={friend.username}
                  className="w-24 h-24 rounded-full"
                />
                <div className="flex flex-col mt-2">
                  <button
                    onClick={() => navigateToConversation(friend._id, friend.username)}
                    className="border-2 border-black bg-white text-black px-4 py-2 rounded-md mb-2"
                  >
                    Message
                  </button>
                </div>
              </div>
              <div className="ml-4 flex-grow">
                <h3 className="text-2xl font-semibold italic text-white">{friend.username}</h3>
              </div>
              <div className="absolute right-4 bottom-4">
                <button
                  onClick={() => removeFriend(friend._id)}
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
