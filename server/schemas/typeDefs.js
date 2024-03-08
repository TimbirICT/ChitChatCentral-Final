const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    friends: [User]
    Message: [Message]
  }

  type Message {
    id: ID!
    user: User!
    content: String!
    createdAt: String!
  }

  type Auth {
    token: ID
    user: User
  }
  
  type Query {
    users: [User]!
    user(username: String!): User
    me: User
    friends: [User]!
    getMessages: [Message!]!
  }
  
  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addFriend(myId: ID!, friendId: ID!): User
    sendMessage(username: String!, content: String!): Message!
  }
  
  type Subscription {
    messageSent: Message!
  }
`;

module.exports = typeDefs;