import { useState } from "react";
import { AiOutlineMenu, AiOutlineHome, AiOutlineProject } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { Link } from "react-router-dom";

import Auth from "../utils/auth";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
    console.log("nav state changed");
  };

  const isAuthenticated =
    Auth.getToken() && !Auth.isTokenExpired(Auth.getToken());

  return (
    <div>
      <AiOutlineMenu
        onClick={handleNav}
        className="absolute top-4 right-4 z-[99]"
      />
      {nav ? (
        <div className="fixed w-full h-screen bg-white/70 flex flex-col items-center justify-start z-20">
          <Link
            to="/"
            className="w-[50%] flex justify-center items-center rounded-full shadow-lg rounded-full m-2 p-3 cursor-pointer hover:scale-105 ease-in duration-200 bg-blue-500 bg-opacity-75"
          >
            <AiOutlineHome size={20} />
            <span className="pl-4">Home</span>
          </Link>
          <Link
            to="/friends"
            className="w-[50%] flex justify-center items-center rounded-full shadow-lg rounded-full m-2 p-3 cursor-pointer hover:scale-105 ease-in duration-200 bg-blue-500 bg-opacity-75"
          >
            <AiOutlineProject size={20} />
            <span className="pl-4">Friends</span>
          </Link>
          {!isAuthenticated && (
            <>
              <Link
                to="/signup"
                className="w-[50%] flex justify-center items-center rounded-full shadow-lg rounded-full m-2 p-3 cursor-pointer hover:scale-105 ease-in duration-200 bg-blue-500 bg-opacity-75"
              >
                <BsPerson size={20} />
                <span className="pl-4">Sign Up</span>
              </Link>
              <Link
                to="/login"
                className="w-[50%] flex justify-center items-center rounded-full shadow-lg rounded-full m-2 p-3 cursor-pointer hover:scale-105 ease-in duration-200 bg-blue-500 bg-opacity-75"
              >
                <BsPerson size={20} />
                <span className="pl-4">Login</span>
              </Link>
            </>
          )}
          {isAuthenticated && (
            <Link
              to="/logout"
              className="w-[50%] flex justify-center items-center rounded-full shadow-lg rounded-full m-2 p-3 cursor-pointer hover:scale-105 ease-in duration-200 bg-blue-500 bg-opacity-75"
            >
              <BsPerson size={20} />
              <span className="pl-4">Logout</span>
            </Link>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Navbar;
