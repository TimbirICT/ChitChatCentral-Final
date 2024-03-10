import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
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
                  Welcome back, {user.data.username}!
                </p>
                <p className="text-2xl font-bold" style={{ backgroundImage: 'linear-gradient(to right, #ff00cc, #333399)', WebkitBackgroundClip: 'text', color: 'black' }}>
                  Your User ID is {user.data._id}!
                </p>

                {/* User Profile Image and Edit Profile Button */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img src="./src/assets/images/default_avatar.png" alt="Profile" className="h-20 md:h-24 lg:h-26 w-auto max-w-full rounded-full mr-3" />
                  </div>
                  <button className="btn btn-lg btn-light m-2" onClick={logout}>
                    Logout
                  </button>
                </div>
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

Home.propTypes = {
  user: PropTypes.shape({
    data: PropTypes.shape({
      username: PropTypes.string,
      _id: PropTypes.string,
      email: PropTypes.string,
    }),
    messages: PropTypes.arrayOf(PropTypes.object),
    friends: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default Home;
