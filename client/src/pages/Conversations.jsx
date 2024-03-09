import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import io from "socket.io-client";

const Conversations = () => {
  const { id: friendId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [friendName, setFriendName] = useState("");

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

    const fetchFriendDetails = () => {
      fetch(`YOUR_API_ENDPOINT/friends/${friendId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Friend details:", data); // Log friend details
          setFriendName(data.name);
        })
        .catch((error) => {
          console.error("Error fetching friend details:", error);
        });
    };

    fetchFriendDetails();

    return () => {
      newSocket.disconnect();
    };
  }, [friendId]);

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newMessage.trim() === "") {
      return;
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'You', message: newMessage },
    ]);

    socket.emit("sendMessage", { sender: 'You', message: newMessage });

    setNewMessage("");

    setTimeout(() => {
      const responseMessage = `You said: ${newMessage}`;
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'Bot', message: responseMessage },
      ]);
    }, 500);
  };

  console.log("Friend ID:", friendId); // Log friendId
  console.log("Friend Name:", friendName); // Log friendName

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500">
        <div className="w-full max-w-2xl mx-auto mt-8 p-4 rounded-md shadow-md bg-gradient-to-br from-red-500 to-blue-500">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4 text-white">Chatting with {friendName}</h2>
            <div className="max-h-96 overflow-y-auto border border-gray-300 p-2 bg-white bg-opacity-50 rounded-md">
              {messages.length === 0 ? (
                <p className="text-center text-gray-500">No messages yet.</p>
              ) : (
                messages.map((message, index) => (
                  <div key={index} className="p-2 text-sm">
                    <span className="font-bold">{message.sender}: </span>
                    {message.message}
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
                className="w-full border border-gray-300 p-2 rounded-md text-black"
                style={{ color: "black" }}
                placeholder={`Type your message to ${friendName}...`}
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

export default Conversations;
