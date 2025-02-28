import { useApolloClient, useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import { useEffect, useState } from 'react';
import useAuthStorage from './useAuthStorage';

const useSession = () => {
  const { data, loading } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
  });
  const [currentUser, setCurrentUser] = useState(null);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  useEffect(() => {
    if (!loading) {
      setCurrentUser(data?.me);
    }
  }, [data, loading]);

  const signOut = async () => {
    setCurrentUser(null);
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return { currentUser, loading, signOut };
};

export default useSession;
