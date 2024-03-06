// Messages.js
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import io from "socket.io-client";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3000/messages");

    newSocket.on("connect", () => {
      console.log("Connected to server");
    });

    newSocket.on("message", (data) => {
      console.log("Message received:", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newMessage.trim() === "") {
      return; // Don't add empty messages
    } else if (newMessage.trim() !== "") {
      socket.emit("sendMessage", newMessage);
      setNewMessage("");
    }

    // Add the new message to the messages state
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: newMessage, type: "user" },
    ]);

    // Simulate a response from the server (in this example, a simple echo)
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: `You said: ${newMessage}`, type: "bot" },
      ]);
    }, 500);

    // Clear the input field
    setNewMessage("");
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500">
        <div className="w-full max-w-2xl mx-auto mt-8 p-4 rounded-md shadow-md bg-gradient-to-br from-red-500 to-blue-500">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Conversation Form
            </h2>
            <div className="max-h-96 overflow-y-auto border border-gray-300 p-2 bg-white bg-opacity-50 rounded-md">
              {messages.length === 0 ? (
                <p className="text-center text-gray-500">No messages yet.</p>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`p-2 text-sm ${
                      message.type === "user"
                        ? "text-right text-blue-600"
                        : "text-left text-green-600"
                    }`}
                  >
                    {message.text}
                  </div>
                ))
              )}
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <label className="block mb-2 text-white">
              Your Message:
              <input
                type="text"
                value={newMessage}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded-md text-black" // Change text color to black
                style={{ color: "black" }} // Alternatively, set text color using inline style
                placeholder="Type your message..."
              />
            </label>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
