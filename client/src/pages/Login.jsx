import { TypeAnimation } from "react-type-animation";
import Navbar from "../components/Navbar";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import { Link } from "react-router-dom";

import Auth from "../utils/auth";
import PropTypes from "prop-types";

const Login = ({ updateUser }) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data, errors } = await login({
        variables: { ...formState },
      });

      console.log("GraphQL Response:", data);
      console.log("GraphQL Errors:", errors);

      if (data && data.login && data.login.token) {
        Auth.login(data.login.token);

        // If the updateUser function is available, call it with the user data
        if (updateUser) {
          updateUser(data.login.user);
        }
      } else {
        console.error("Invalid response from the server:", data);
      }
    } catch (e) {
      console.error("GraphQL Error:", e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <div className="bg-gradient-to-br from-purple-900 via-purple-500 to-blue-400 min-h-screen">
      <Navbar />
      <div id="main" className="h-screen flex justify-center items-center">
        <div className="max-w-lg w-full p-8 bg-white rounded-lg shadow-lg text-center">
          <h1 className="text-3xl sm:text-5xl font-bold text-gold mb-6">
            Welcome to ChitChat Central
          </h1>
          <h2 className="text-4xl sm:text-3xl flex items-center justify-center text-gold mb-6">
            The Next
            <TypeAnimation
              sequence={[
                "Hotspot",
                1000,
                "Messenger",
                1000,
                "Connection",
                1000,
              ]}
              wrapper="div"
              cursor={true}
              speed={50}
              style={{ fontSize: "1em", paddingLeft: "5px" }}
              repeat={Infinity}
            />
          </h2>
          {/* Login Form */}
          <form onSubmit={handleFormSubmit} className="mt-8">
            <div className="grid grid-cols-1 gap-6">
              <label className="block text-lg font-medium text-gold">
                {" "}
                {/* Increased font size */}
                Email Address:
              </label>
              <input
                name="email"
                type="email"
                className="mt-1 p-3 border border-gold rounded-md w-full focus:outline-none focus:ring focus:ring-gold"
                placeholder="you@example.com"
                value={formState.email}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-1 gap-6 mt-4">
              <label className="block text-lg font-medium text-gold">
                {" "}
                {/* Increased font size */}
                Password:
              </label>
              <input
                name="password"
                type="password"
                className="mt-1 p-3 border border-gold rounded-md w-full focus:outline-none focus:ring focus:ring-gold"
                placeholder="********"
                value={formState.password}
                onChange={handleChange}
              />
            </div>
            <div className="mt-6 flex justify-between">
              {" "}
              {/* Added flex and justify-between */}
              <button
                type="submit"
                style={{ cursor: "pointer" }}
                className="w-full p-3 bg-gold text-purple-800 rounded-md hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-500"
              >
                Log In
              </button>
              {/* Button linking to Signup */}
              <Link to="/signup">
                <button className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
                  Sign Up
                </button>
              </Link>
            </div>
          </form>
          {error && (
            <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
          )}
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  updateUser: PropTypes.func.isRequired,
};

export default Login;
