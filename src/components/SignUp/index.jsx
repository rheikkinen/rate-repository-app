import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import { SIGN_UP } from '../../graphql/mutations';
import useSignIn from '../../hooks/useSignIn';
import SignUpForm from './SignUpForm';

const SignUp = () => {
  const [mutate] = useMutation(SIGN_UP);
  const [signIn] = useSignIn();
  const navigateTo = useNavigate();

  const handleSignUp = async (values) => {
    const { username, password } = values;

    try {
      await mutate({ variables: { user: { username, password } } });
      await signIn({ username, password });
      navigateTo('/');
    } catch (error) {
      console.error(error);
    }
  };
  return <SignUpForm onSubmit={handleSignUp} />;
};

export default SignUp;
