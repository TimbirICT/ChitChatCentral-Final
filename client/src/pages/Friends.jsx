import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import * as images from "../assets/images/index";
import { Link } from 'react-router-dom';

const Friends = () => {
  // Sample data for friends list
  const friends = [
    { id: 2, name: "Dylan Smith", online: false, profilePic: "profile_Logo" },
    { id: 3, name: "Jacob Johnson", online: true, profilePic: "Jacob_Avatar" },
    { id: 4, name: "Timbir Williams", online: false, profilePic: "" },
    { id: 5, name: "Jon Brown", online: true, profilePic: "jon_profile" },
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
        <h2 className="text-7xl font-extrabold mb-8 text-white">
          Friends ({friends.length})
        </h2>
        <div className="flex flex-col">
          {friends.map((friend) => (
            <div
              key={friend.id}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4 rounded-md shadow-md mb-4 flex flex-col relative" // Added relative class
            >
              <div className="flex items-center justify-between">
                {" "}
                {/* Changed to flex and added justify-between */}
                {/* Profile Picture */}
                {friend.profilePic && images[friend.profilePic] ? (
                  <img
                    src={images[friend.profilePic]}
                    alt={friend.name}
                    className="w-24 h-24 rounded-full"
                  />
                ) : (
                  // If no profile picture is available, display a placeholder image
                  <img
                    src={images.default}
                    alt="Placeholder"
                    className="w-24 h-24 rounded-full"
                  />
                )}
                <div className="flex flex-col mt-2">
                  {" "}
                  {/* Adjusted to flex-col */}
                  <Link to="/conversations">
                    <button className="border-2 border-black bg-white text-black px-4 py-2 rounded-md mb-2">Message</button>
                  </Link>
                  {/* Button for sending money through PayPal */}
                  <a
                    href="https://www.paypal.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center border-2 border-black bg-blue-800 text-white px-4 py-2 rounded-md"
                  >
                    <span className="border-b-2 border-black">
                      Send Money through PayPal
                    </span>
                    <span role="img" aria-label="Money" className="ml-2">
                      {" "}
                      💸
                    </span>
                  </a>
                </div>
              </div>
              <div className="ml-4 flex-grow">
                {" "}
                {/* Adjusted margin */}
                <h3 className="text-2xl font-semibold italic text-white">
                  {friend.name}
                </h3>
                <div
                  className={`w-4 h-4 rounded-full ${
                    friend.online ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
              </div>
              <p className="text-gray-300">
                Status: {friend.online ? "Online" : "Offline"}
              </p>
              <div className="absolute right-4 bottom-4">
                {" "}
                {/* Adjust positioning */}
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
