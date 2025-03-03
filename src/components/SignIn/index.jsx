import { useNavigate } from 'react-router-native';
import useSignIn from '../../hooks/useSignIn';
import SignInForm from './SignInForm';

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigateTo = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
      navigateTo('/');
    } catch (error) {
      console.error(error);
    }
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
