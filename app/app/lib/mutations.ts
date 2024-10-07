// lib/mutations/login.ts
import { gql } from '@apollo/client';


export const CREATE_USER = gql`
  mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
      id
      username
      createdAt
      updatedAt
    }
  }
`;
export const CREATE_CHAT=gql`
mutation CreateChat($input: ChatInput!) {
  createChat(input: $input) {
    id
    title
    
  }
}

`;

export const LOGIN_USER = gql`
  mutation Login($loginData: LoginInput) {
  login(loginData: $loginData) {
    token
    user {
      id
      username
      createdAt
      updatedAt
    }
  }
}

`;
