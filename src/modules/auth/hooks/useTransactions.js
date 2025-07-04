import { useQuery } from '@apollo/client'
import { GET_TRANSACTIONS } from '@/gql/queries'
import { useAuth } from '../context/AuthContext';

export const useTransactions = () => {

  const { user } = useAuth();
  const { data, loading, error } = useQuery(GET_TRANSACTIONS, {
    fetchPolicy: 'cache-and-network',
  });

  const transactions = data?.transactions?.edges
    ?.map(edge => edge.node)
    ?.filter(tx => tx.user?.id === user?.id) || [];

  return {
    transactions,
    loading,
    error,
  }
}
