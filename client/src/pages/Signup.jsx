// Signup.js
import { TypeAnimation } from "react-type-animation";
import Navbar from "../components/Navbar";

import { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

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
          {/* Signup Form */}
          {data ? (
            <p>
              Success! You may now head{" "}
              <Link to="/">back to the homepage.</Link>
            </p>
          ) : (
            <form onSubmit={handleFormSubmit} className="mt-8">
              <div className="grid grid-cols-1 gap-6">
                <label className="block text-lg font-medium text-gold">
                  Name:
                </label>
                <input
                  name="username"
                  type="text"
                  className="mt-1 p-3 border border-gold rounded-md w-full focus:outline-none focus:ring focus:ring-gold"
                  placeholder="John Doe"
                  value={formState.name}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-1 gap-6 mt-4">
                <label className="block text-lg font-medium text-gold">
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
          )}

          {error && (
            <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
