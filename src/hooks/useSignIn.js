import { useApolloClient, useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    try {
      const response = await mutate({
        variables: { credentials: { username, password } },
      });

      const { accessToken } = response.data.authenticate;
      await authStorage.setAccessToken(accessToken);
      apolloClient.resetStore();

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  return [signIn, result];
};

export default useSignIn;
