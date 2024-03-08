const User = require('../models/User');
const { signToken, AuthenticationError } = require('../utils/auth');
// Import necessary libraries
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

// Define a list to store messages
let messages = [];

// Define a list to store connected clients
let clients = [];

// Function to send a message to all connected clients
const sendMessageToClients = (message) => {
  clients.forEach((client) => {
    client.emit('messageSent', message);
  });
};

const resolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },

    user: async (parent, { username }) => {
      return await User.findOne({ username: username })
        .populate({ 
          path: "user", 
          Model: "User",
        },
        {
          strictPopulate: false
        });
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
      console.log(user, token);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      const correctPw = await user.isCorrectPassword(password);

      if (!user || !correctPw) {
        console.log('Log in unsuccesful');

        return {
          success: false,
          message: 'Invalid credentials. Unable to log in.',
        };
      } else {
        const token = signToken(user);

        console.log('Log in succesful');

        return {
          success: true,
          message: 'Successfully logged in!',
          user,
          token,
        };
      }
    },
    // addFriend: async (_, { user1, user2 }, context) => {
    //   if (context.user) {
    //     // Create a new Friend object with the appropriate data
    //     const newFriend = new Friend({
    //       // Populate this with the necessary fields
    //       user: context.user.id,
    //       // Other friend-related fields
    //     });

    //     // Update the user's friends array
    //     await User.findByIdAndUpdate(context.user._id, {
    //       $push: { friends: newFriend },
    //     });

    //     return newFriend;
    //   }

    //   throw AuthenticationError;
    // },
    addFriend: async (_, { myId, friendId }, context) => {
      return (await User.findOneAndUpdate(
        { _id: myId },
        { $addToSet: { friends: friendId }},
        {new: true }
      )).populate("User")
    },
    sendMessage: (_, { username, content }) => {
      const newMessage = {
        id: String(messages.length + 1),
        user: { id: String(messages.length + 1), username },
        content,
        createdAt: new Date().toISOString(), // Add createdAt field
      };
      messages.push(newMessage);
      pubsub.publish('MESSAGE_SENT', { messageSent: newMessage });
      return newMessage;
    },
  },
  Subscription: {
    messageSent: {
      subscribe: () => pubsub.asyncIterator('MESSAGE_SENT')
    }
  },
  Message: {
    user: (message) => message.user,
    content: (message) => message.content,
    createdAt: (message) => message.createdAt
  },
  User: {
    _id: (user) => user.id,
    username: (user) => user.username
  }
};

// Function to set up WebSocket server
const setupWebSocketServer = (server) => {
  const io = require('socket.io')(server);

  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);
    clients.push(socket);

    // Remove client when disconnected
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
      clients = clients.filter((client) => client.id !== socket.id);
    });
  });

  // Set up PubSub for GraphQL subscriptions
  io.on('connection', (socket) => {
    socket.on('messageSent', (message) => {
      pubsub.publish('MESSAGE_SENT', { messageSent: message });
    });
  });
};

module.exports = { resolvers, setupWebSocketServer };
