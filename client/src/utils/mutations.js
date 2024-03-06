import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($username: String!, $_id: String!) {
    addFriend(username: $username, _id: $_id) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation removeFriend($username: String!, $_id: String!) {
    removeFriend(username: $username, _id: $_id) {
      user {
        _id
        username
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage($messageId: ID!, $messageText: String!) {
    sendMessage(messageId: $messageId, messageText: $messageText) {
      _id
      messageText
      messageAuthor
      createdAt
  }
`;

export const GET_MESSAGE = gql`
  mutation getMessage($messageId: ID!, $messageText: String!) {
    getMessage(messageId: $messageId, messageText: $messageText) {
      _id
      messageText
      messageAuthor
      createdAt
    }
  }
`;