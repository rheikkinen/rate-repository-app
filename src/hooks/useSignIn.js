import { useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutations';

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    try {
      const response = await mutate({
        variables: { credentials: { username, password } },
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  return [signIn, result];
};

export default useSignIn;
