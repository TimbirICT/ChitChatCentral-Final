const User = require("../models/User");
const { Types } = require("mongoose");
const { signToken, AuthenticationError } = require("../utils/auth");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

// Define a list to store messages
let messages = [];

// Define a list to store connected clients
let clients = [];

// Function to send a message to all connected clients
const sendMessageToClients = (message) => {
  clients.forEach((client) => {
    client.emit("messageSent", message);
  });
};

const resolvers = {
  Query: {
    users: async () => {
      return await User.find().populate("friends");
    },

    user: async (parent, { username }) => {
      try {
        const user = await User.findOne({ username });

        if (!user) {
          return null;
        }

        // Convert ObjectId to string
        const userIdString = Types.ObjectId(user._id).toString();

        return {
          ...user.toObject(),
          _id: userIdString,
          friends: user.friends.map((friend) => ({
            ...friend.toObject(),
            _id: Types.ObjectId(friend._id).toString(),
          })),
        };
      } catch (error) {
        console.error("Error fetching user:", error);
        return null;
      }
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ id: context.user.id });
      }
      throw AuthenticationError;
    },

    getMessages: () => messages,
  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return {
            success: false,
            message: "User not found.",
          };
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          return {
            success: false,
            message: "Invalid password.",
          };
        }

        const token = signToken(user);

        // Extract necessary fields from the user
        const sanitizedUser = {
          _id: user._id.toString(),
          username: user.username,
          email: user.email,
          friends:
            user.friends &&
            user.friends.map((friend) => ({
              _id: friend._id.toString(),
              username: friend.username,
            })),
        };

        return {
          success: true,
          message: "Successfully logged in!",
          user: sanitizedUser,
          token,
        };
      } catch (error) {
        console.error("Login error:", error);
        return {
          success: false,
          message: "An error occurred during login.",
        };
      }
    },
    addFriend: async (_, { myId, friendId }, context) => {
      try {
        // Update the sender's friends array
        const updatedSender = await User.findOneAndUpdate(
          { _id: myId },
          { $addToSet: { friends: friendId } },
          { new: true }
        ).populate("friends");

        console.log("updatedSender", updatedSender);

        // Update the receiver's friends array
        const updatedReceiver = await User.findOneAndUpdate(
          { _id: friendId },
          { $addToSet: { friends: myId } },
          { new: true }
        ).populate("friends");

        // console.log(friendId);

        if (!updatedSender || !updatedReceiver) {
          return {
            success: false,
            message: "One or both users not found.",
          };
        }

        // Return the updated sender and receiver objects
        return {
          success: true,
          message: "Friend added successfully.",
          sender: updatedSender,
          receiver: updatedReceiver,
        };
      } catch (error) {
        console.error("Error adding friend:", error);
        return {
          success: false,
          message: "An error occurred while adding a friend.",
        };
      }
    },
    sendMessage: (_, { username, content }) => {
      const newMessage = {
        id: String(messages.length + 1),
        user: { id: String(messages.length + 1), username },
        content,
        createdAt: new Date().toISOString(), // Add createdAt field
      };
      messages.push(newMessage);
      pubsub.publish("MESSAGE_SENT", { messageSent: newMessage });
      return newMessage;
    },
  },
  Subscription: {
    messageSent: {
      subscribe: () => pubsub.asyncIterator("MESSAGE_SENT"),
    },
  },
  Message: {
    user: (message) => message.user,
    content: (message) => message.content,
    createdAt: (message) => message.createdAt,
  },
  User: {
    _id: (user) => user.id,
    username: (user) => user.username,
  },
};

// Function to set up WebSocket server
const setupWebSocketServer = (server) => {
  const io = require("socket.io")(server);

  io.on("connection", (socket) => {
    // console.log('New client connected:', socket.id);
    clients.push(socket);

    // Remove client when disconnected
    socket.on("disconnect", () => {
      // console.log('Client disconnected:', socket.id);
      clients = clients.filter((client) => client.id !== socket.id);
    });
  });

  // Set up PubSub for GraphQL subscriptions
  io.on("connection", (socket) => {
    socket.on("messageSent", (message) => {
      pubsub.publish("MESSAGE_SENT", { messageSent: message });
    });
  });
};

module.exports = { resolvers, setupWebSocketServer };
