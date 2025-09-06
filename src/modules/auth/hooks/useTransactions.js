import { useQuery } from '@apollo/client'
import { GET_TRANSACTIONS } from '@/gql/queries'
import { useAuth } from '../context/AuthContext';

export const useTransactions = () => {
  const { user } = useAuth();

  console.log("🔍 DEBUG - useTransactions iniciado");
  console.log("👤 Usuario actual:", user);

  const { data, loading, error } = useQuery(GET_TRANSACTIONS, {
     fetchPolicy: 'cache-and-network',
  });

  const transactions = data?.transactions?.edges ? data?.transactions?.edges : []

  return {
    transactions,
    loading,
    error,
  }
}
