const typeDefs = `
  type User {
    id: ID
    username: String
    email: String
    password: String
    friends: [Friend]
    Message: [Message]
  }

  type Friend {
    id: ID!
    user: User!
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
    user(userId: ID!): User
    me: User
    friends: [Friend]!
    getMessages: [Message!]!
  }
  
  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addFriend(id: ID!): Friend
    sendMessage(username: String!, content: String!): Message!
  }
  
  type Subscription {
    messageSent: Message!
  }
`;

module.exports = typeDefs;