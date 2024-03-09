import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import profileImage from '../assets/images/profile.jpg';
import PropTypes from 'prop-types';

import Auth from '../utils/auth';

const Home = ({ user }) => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  // Ensure user.messages and user.friends are defined
  const recentMessages = user.messages || [];
  const friendsList = user.friends || [];

  Home.propTypes = {
    user: PropTypes.shape({
      _id: PropTypes.string,
      username: PropTypes.string,
      email: PropTypes.string,
      messages: PropTypes.arrayOf(PropTypes.object),
      friends: PropTypes.arrayOf(PropTypes.object),
    }),
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-600 to-indigo-600">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-6xl font-extrabold mb-8 text-white">Welcome to ChitChatCentral!</h1>
        <div className="max-w-3xl w-full bg-white shadow-md rounded-md p-4 mb-8">
          {Auth.getToken() && !Auth.isTokenExpired(Auth.getToken()) ? (
            <>
              {/* User Profile Section */}
              <div className="flex flex-col border-b-2 border-gray-200 pb-4 mb-4">
                {/* User Profile Title */}
                <h2 className="text-2xl font-extrabold mb-4 text-black">User Profile:</h2>
                {/* Welcome Back, dynamic username */}
                <p className="text-2xl font-bold" style={{ backgroundImage: 'linear-gradient(to right, #ff00cc, #333399)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                  Welcome back, {user.username}!
                </p>
                {/* User Profile Image and Edit Profile Button */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {/* Replace 'profileImage' with the actual path to the user's profile image */}
                    <img src={user.profileImage} alt="Profile" className="h-22 w-22 rounded-full mr-3" />
                  </div>
                  <button className="btn btn-lg btn-light m-2" onClick={logout}>
                    Logout
                  </button>
                </div>
              </div>
              {/* Recent Messages Section */}
              <div className="border-b-2 border-gray-200 pb-4 mb-4">
                <h2 className="text-2xl font-extrabold mb-4 text-black">Recent Messages</h2>
                <ul>
                  {recentMessages.map((message) => (
                    <li key={message.id} className="mb-2">
                      <div className="flex flex-col items-start max-w-sm">
                        <div className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md">
                          {message.message}
                        </div>
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
                  {friendsList.map((friend) => (
                    <li key={friend.id} className="text-purple-600 mb-3">
                      {friend.name}
                    </li>
                  ))}
                </ul>
              </div>
              {/* ... (other components) */}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
