import { useApolloClient, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-native';
import { ME } from '../graphql/queries';
import useAuthStorage from './useAuthStorage';

const useSession = () => {
  const { data, loading } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
  });
  const [currentUser, setCurrentUser] = useState(null);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!loading) {
      setCurrentUser(data?.me);
    }
  }, [data, loading]);

  const signOut = async () => {
    setCurrentUser(null);
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigateTo('/');
  };

  return { currentUser, loading, signOut };
};

export default useSession;
