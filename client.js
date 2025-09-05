import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client'
import { AUTH_TOKEN_KEY } from './src/modules/auth/constants'

// export const authTokenReactiveVar = makeVar(localStorage.getItem(AUTH_TOKEN_KEY))

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_GRAPHQL_URL,
})

console.log(import.meta.env.VITE_API_GRAPHQL_URL);


const authLink = new ApolloLink((operation, forward) => {
  const authToken = localStorage.getItem('access_token')

  if (authToken) {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        Authorization: `JWT ${authToken}`,
      },
    }))
  }

  return forward(operation)
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default client