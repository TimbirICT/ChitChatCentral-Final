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
    getMessages: () => messages,
  },
  Mutation: {
    sendMessage: (_, { username, content }) => {
      const newMessage = {
        id: String(messages.length + 1),
        user: { id: String(messages.length + 1), username },
        content,
        createdAt: new Date().toISOString(),
      };
      messages.push(newMessage);
      sendMessageToClients(newMessage); // Send the new message to all clients
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
    id: (user) => user.id,
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
