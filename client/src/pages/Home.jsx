import React from 'react';
import Footer from '../components/Footer'; 
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import profileImage from '../assets/images/profile.jpg';

const Home = () => {
  // Sample data for recent messages and friends list
  const recentMessages = [
    { id: 1, sender: 'Dylan Smith', message: 'Hey, what\'s up?' },
    { id: 2, sender: 'Jacob Johnson', message: 'Not much, just chilling.' },
    { id: 3, sender: 'Timbir Williams', message: 'How\'s the project going?' },
  ];

  const friendsList = [
    { id: 1, name: 'Dylan Smith' },
    { id: 2, name: 'Jacob Johnson' },
    { id: 3, name: 'Timbir Williams' },
    { id: 4, name: 'Jon Brown' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-600 to-indigo-600">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-6xl font-extrabold mb-8 text-white">Welcome to ChitChatCentral!</h1>
        <div className="max-w-3xl w-full bg-white shadow-md rounded-md p-4 mb-8">
          {/* User Profile Section */}
          <div className="flex flex-col border-b-2 border-gray-200 pb-4 mb-4">
            {/* User Profile Title */}
            <h2 className="text-2xl font-extrabold mb-4 text-black">User Profile:</h2>
            {/* Welcome Back, Sara */}
            <p className="text-2xl font-bold" style={{backgroundImage: 'linear-gradient(to right, #ff00cc, #333399)', WebkitBackgroundClip: 'text', color: 'transparent'}}>Welcome back, Sara!</p>
            {/* User Profile Image and Edit Profile Button */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img src={profileImage} alt="Profile" className="h-22 w-22 rounded-full mr-3" />
              </div>
              {/* Button linking to Edit Profile */}
              <Link to="/edit-profile">
                <button className="bg-purple-600 text-white px-4 py-2 rounded-md">Edit Profile</button>
              </Link>
            </div>
          </div>
          {/* Messaging Section Access */}
          <div className="flex items-center justify-between border-b-2 border-gray-200 pb-4 mb-4">
            <div>
              <h2 className="text-2xl font-extrabold mb-4 text-black">Messaging</h2>
              <p className="text-gray-600">Start chatting with your friends!</p>
            </div>
            {/* Button linking to Messages */}
            <Link to="/messages">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md">Go to Messages</button>
            </Link>
          </div>
          {/* Recent Messages Section */}
          <div className="border-b-2 border-gray-200 pb-4 mb-4">
            <h2 className="text-2xl font-extrabold mb-4 text-black">Recent Messages</h2>
            <ul>
              {recentMessages.map(message => (
                <li key={message.id} className="mb-2">
                  <div className="flex flex-col items-start max-w-sm">
                    <div className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md">{message.message}</div>
                    <p className="text-sm text-gray-600 mt-1">{message.sender}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* Friends List Section */}
          <div>
            <h2 className="text-2xl font-extrabold mb-4 text-black">Friends List</h2>
            <ul>
              {friendsList.map(friend => (
                <li key={friend.id} className="text-purple-600 mb-3">{friend.name}</li>
              ))}
            </ul>
          </div>
          {/* Chatbox */}
          <div className="bg-gray-100 p-4 rounded-md">
            {/* Chatbox content */}
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;