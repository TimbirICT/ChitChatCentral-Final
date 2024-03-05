const typeDefs = `
  type User {
    id: ID!
    username: String!
  }
  
  type Message {
    id: ID!
    user: User!
    content: String!
    createdAt: String!
  }
  
  type Query {
    getMessages: [Message!]!
  }
  
  type Mutation {
    sendMessage(username: String!, content: String!): Message!
  }
  
  type Subscription {
    messageSent: Message!
  }
`;

module.exports = typeDefs;