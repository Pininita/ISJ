import { gql } from '@apollo/client';

export const GET_ME = gql`
    query GetMe {
        me {
            id
            username
            email
            firstName
            lastName
            phone
            totalIncome
            totalExpense
            balance
        }
    }
`;

export const GET_TRANSACTIONS = gql`
    query GetTransactions {
        transactions {
            edges {
              node {
                id
                amount
                city
                location
                description
                transactionType
                createdAt
                user {
                  id
                }
              }
            }
          }
    }
`;