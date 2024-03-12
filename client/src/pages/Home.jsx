import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PropTypes from "prop-types";

import Auth from "../utils/auth";

const Home = ({ user }) => {
  // Ensure user.messages and user.friends are defined
  const recentMessages = user.messages || [
    { sender: "Dylan", message: "Hey, what's up?" },
    { sender: "Timbir", message: "Not much, just chilling." },
    { sender: "Sara", message: "Are you guys ready to Top Golf?" },
    { sender: "Jon", message: "Oh yea! Its gonna be lit!" },
    { sender: "Me", message: "See you all there!" },
  ];
  const friendsList = user.friends || [
    { name: "Dylan" },
    { name: "Timbir" },
    { name: "Jon" },
    { name: "Sara" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-600 to-indigo-600">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-extrabold mb-4 md:mb-6 lg:mb-8 text-white mx-auto">
          Welcome to ChitChatCentral!
        </h1>
        <div className="max-w-3xl w-full bg-white shadow-md rounded-md p-4 mb-8">
          {Auth.getToken() && !Auth.isTokenExpired(Auth.getToken()) ? (
            <>
              {/* User Profile Section */}
              <div className="flex flex-col border-b-2 border-gray-200 pb-4 mb-4">
                {/* User Profile Title */}
                <h2 className="text-2xl font-extrabold mb-4 text-black">
                  User Profile:
                </h2>
                {/* Welcome Back, dynamic username */}
                <p
                  className="text-2xl font-bold"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #ff00cc, #333399)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Welcome back, {user.data.username}!
                </p>
                {/* User Profile Image and Edit Profile Button */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src="./src/assets/images/Jacob_Avatar.png"
                      alt="Profile"
                      className="h-24 md:h-28 lg:h-30 w-auto max-w-full rounded-full mr-3"
                    />
                  </div>
                </div>
                <p
                  className="text-lg font-medium md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #ff00cc, #333399)",
                    WebkitBackgroundClip: "text",
                    color: "black",
                  }}
                >
                  User ID: {user.data._id}!
                </p>
              </div>
              {/* Recent Messages Section */}
              <div className="border-b-2 border-gray-200 pb-4 mb-4">
                <h2 className="text-2xl font-extrabold mb-4 text-black">
                  Recent Messages
                </h2>
                <ul>
                  {recentMessages.map((message) => (
                    <li key={message.id} className="mb-2">
                      <div className="flex flex-col items-start max-w-sm">
                        <div className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md">
                          {message.message}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {message.sender}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Friends List Section */}
              <div>
                <h2 className="text-2xl font-extrabold mb-4 text-black">
                  Friends List
                </h2>
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
