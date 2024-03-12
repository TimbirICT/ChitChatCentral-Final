import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import Auth from "../utils/auth";

const Logout = () => {
  // State to track if the user has logged out
  const [loggedOut, setLoggedOut] = useState(false);

  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    Auth.logout(navigate);
    setLoggedOut(true);
  };
  // Array of languages and their translations for "Goodbye"
  const languages = [
    { id: 1, language: "English", translation: "Goodbye" },
    { id: 2, language: "Spanish", translation: "Adiós" },
    { id: 3, language: "French", translation: "Au revoir" },
    { id: 4, language: "German", translation: "Auf Wiedersehen" },
    { id: 5, language: "Italian", translation: "Arrivederci" },
    { id: 6, language: "Portuguese", translation: "Adeus" },
    { id: 7, language: "Russian", translation: "До свидания" },
    { id: 8, language: "Japanese", translation: "さようなら" },
    { id: 9, language: "Chinese", translation: "再见" },
    { id: 10, language: "Arabic", translation: "وداعا" },
    { id: 11, language: "Korean", translation: "안녕" },
    // Add more languages as needed
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-600 to-indigo-600">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-1">
        {!loggedOut && (
          <>
            <h1 className="text-3xl font-bold text-black mb-4">
              Are you sure you want to logout?
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Logout
            </button>
            <Link to="/" className="text-blue-500 mt-2">
              Back to home page?
            </Link>
          </>
        )}
        {loggedOut && (
          <h1 className="text-3xl font-bold text-white mb-4">Goodbye!</h1>
        )}
      </div>
      {/* Display "Goodbye" in different languages */}
      <div className="text-white absolute top-0 left-0 right-0 bottom-0 flex flex-wrap justify-center items-center pointer-events-none overflow-hidden">
        {languages.map((lang) => (
          <p
            key={lang.id}
            className="absolute opacity-25"
            style={{
              top: `${Math.random() * 70}%`,
              left: `${Math.random() * 70}%`,
              fontSize: `${Math.floor(Math.random() * 20) + 10}px`,
              fontFamily: Math.random() > 0.5 ? "Arial" : "Verdana",
              transform: `rotate(${Math.floor(Math.random() * 360)}deg)`,
            }}
          >
            {lang.translation} ({lang.language})
          </p>
        ))}
      </div>
    </div>
  );
};

export default Logout;
