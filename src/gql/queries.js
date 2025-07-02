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

export const GET_ME = gql`
    query GetMe {
        me {
            id
            username
            email
            firstName
            lastName
        }
    }
`;