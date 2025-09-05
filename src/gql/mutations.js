import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
    mutation TokenAuth($username: String!, $password: String!) {
        tokenAuth(username: $username, password: $password) {
            token
            payload
            refreshExpiresIn
        }
    }
`;

export const REGISTER_MUTATION = gql`
    mutation CreateUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            user {
                id
                username
                email
            }
        }
    }
`;

export const CREATE_TRANSACTION_MUTATION = gql`
  mutation CreateTransaction(
    $description: String!
    $amount: Decimal!
    $city: String!
    $location: String!
    $transactionType: TransactionType!
  ) {
    createTransaction(
      input: {
        description: $description
        amount: $amount
        city: $city
        location: $location
        transactionType: $transactionType
      }
    ) {
      transaction {
        id
        amount
        transactionType
        city
        location
        description
      }
    }
  }
`;