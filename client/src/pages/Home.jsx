import React from 'react';
import Footer from '../components/Footer'; 
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-4xl font-bold mb-8">Welcome to ChitChatCentral!</h1>
        <div className="max-w-md w-full bg-white shadow-md rounded-md p-4">
          {/* Your chatbox content goes here */}
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