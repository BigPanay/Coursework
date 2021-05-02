import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
mutation loginUser($login: LoginUserInput!) {
  loginUser(login: $login) {
    id
    last_name
  }
}
`;

export const REGISTER_USER = gql`
mutation registerUser($registerUser: RegisterUserInput!) {
  registerUser(registerUser: $registerUser) {
    status
    info
    access_token
  }
}
`;

export const UPDATE_USER = gql`
mutation updateUser($updateUser: UpdateUserInput!) {
  updateUser(updateUser: $updateUser) {
    id
  }
}
`;

export const NEW_MESSAGE = gql`
mutation newMessage($newMessage: NewMessageInput!){
  newMessage(newMessage: $newMessage) {
    status
    info
  }
}
`;

export const DM_SUBSCRIPTION = gql`
subscription {
  userNewMessage {
    senderId
  }
}
`;