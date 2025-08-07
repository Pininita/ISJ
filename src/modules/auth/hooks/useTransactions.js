import { useQuery } from '@apollo/client'
import { GET_TRANSACTIONS } from '@/gql/queries'
import { useAuth } from '../context/AuthContext';

export const useTransactions = () => {
  const { user } = useAuth();

  // console.log("🔍 DEBUG - useTransactions iniciado");
  // console.log("👤 Usuario actual:", user);

  const { data, loading, error } = useQuery(GET_TRANSACTIONS, {
     fetchPolicy: 'cache-and-network',
  });

  // console.log(user);
  // console.log(data?.transactions);

  // const gettingUserId = data.transactions.edges.map(edge => {
  //   const node = edge?.node;
  //   console.log("📋 Node procesado:", node);
  //   return node;
  // }).filter(Boolean)

  //   console.log("📋 Todas las transacciones:", gettingUserId);


  const transactions = data?.transactions?.edges ? data?.transactions?.edges : []

  // console.log(transactions)

  return {
    transactions,
    loading,
    error,
  }
}
