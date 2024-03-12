import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        friends {
          _id
          username
        }
      }
    }
  }
`;

export const ADD_FRIEND = gql`
mutation AddFriend($myId: ID!, $friendId: ID!) {
  addFriend(myId: $myId, friendId: $friendId) {
    success
    message
    sender {
      username
      _id
    }
    receiver {
      _id
      username
    }
  }
}`

export const REMOVE_FRIEND = gql`
  mutation removeFriend($friendId: String!) {
    removeFriend(friendId: $friendId) {
      _id
      username
      email
      friends {
        _id
        username
      }
    }
  }
`;

