// Signup.js
import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import Navbar from '../components/Navbar';

const Signup = () => {
  return (
    <div className="bg-gradient-to-br from-purple-900 via-purple-500 to-blue-400 min-h-screen">
      <Navbar />
      <div id="main" className="h-screen flex justify-center items-center">
        <div className="max-w-lg w-full p-8 bg-white rounded-lg shadow-lg text-center">
          <h1 className="text-3xl sm:text-5xl font-bold text-gold mb-6">
            Join ChitChat Central
          </h1>
          <h2 className="text-4xl sm:text-3xl flex items-center justify-center text-gold mb-6">
            The Next
            <TypeAnimation
              sequence={['Hotspot', 1000, 'Messenger', 1000, 'Connection', 1000]}
              wrapper="div"
              cursor={true}
              speed={50}
              style={{ fontSize: '1em', paddingLeft: '5px' }}
              repeat={Infinity}
            />
          </h2>
          {/* Signup Form */}
          <form className="mt-8">
            <div className="grid grid-cols-1 gap-6">
              <label className="block text-lg font-medium text-gold">
                Name:
              </label>
              <input
                type="text"
                className="mt-1 p-3 border border-gold rounded-md w-full focus:outline-none focus:ring focus:ring-gold"
                placeholder="John Doe"
              />
            </div>
            <div className="grid grid-cols-1 gap-6 mt-4">
              <label className="block text-lg font-medium text-gold">
                Email Address:
              </label>
              <input
                type="email"
                className="mt-1 p-3 border border-gold rounded-md w-full focus:outline-none focus:ring focus:ring-gold"
                placeholder="you@example.com"
              />
            </div>
            <div className="grid grid-cols-1 gap-6 mt-4">
              <label className="block text-lg font-medium text-gold">
                Password:
              </label>
              <input
                type="password"
                className="mt-1 p-3 border border-gold rounded-md w-full focus:outline-none focus:ring focus:ring-gold"
                placeholder="********"
              />
            </div>
            <div className="grid grid-cols-1 gap-6 mt-4">
              <label className="block text-lg font-medium text-gold">
                Confirm Password:
              </label>
              <input
                type="password"
                className="mt-1 p-3 border border-gold rounded-md w-full focus:outline-none focus:ring focus:ring-gold"
                placeholder="********"
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full p-3 bg-gold text-purple-800 rounded-md hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-500"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
