import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      friends {
        _id
        username
      }
      messages {
        _id
        messageText
        createdAt
        sender {
          _id
          username
        }
        recipient {
          _id
          username
        }
      }
    }
  }
`;

export const QUERY_MESSAGES = gql`
  query messages($userId: ID!) {
    messages(userId: $userId) {
      _id
      messageText
      createdAt
      sender {
        _id
        username
      }
      recipient {
        _id
        username
      }
    }
  }
`;

export const QUERY_SINGLE_MESSAGE = gql`
  query getSingleMessage($messageId: ID!) {
    message(messageId: $messageId) {
      _id
      messageText
      createdAt
      sender {
        _id
        username
      }
      recipient {
        _id
        username
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      friends {
        _id
        username
        profilePic  
      }
      messages {
        _id
        messageText
        createdAt
        sender {
          _id
          username
        }
        recipient {
          _id
          username
        }
      }
    }
  }
`;


export const ADD_FRIEND = gql`
  mutation addFriend($friendId: ID!) {
    addFriend(friendId: $friendId) {
      _id
      username
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage($recipientId: ID!, $messageText: String!) {
    sendMessage(recipientId: $recipientId, messageText: $messageText) {
      _id
      messageText
      createdAt
      sender {
        _id
        username
      }
      recipient {
        _id
        username
      }
    }
  }
`;
