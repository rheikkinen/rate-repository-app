import { useFormik } from 'formik';
import { StyleSheet, TextInput, View } from 'react-native';
import theme from '../theme';
import Button from './Button';
import Text from './Text';

import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const initialValues = {
  username: '',
  password: '',
};

const styles = StyleSheet.create({
  formContainer: {
    display: 'flex',
    gap: 12,
    padding: 12,
  },
  formInputItem: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 8,
    padding: 12,
    height: 64,
    fontSize: 18,
  },
  submitButton: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: theme.colors.primary,
  },
  buttonLabel: {
    color: 'white',
    fontSize: 18,
    fontWeight: theme.fontWeights.bold,
  },
});

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const isInvalid = (field) => {
    return formik.touched[field] && formik.errors[field];
  };

  return (
    <View style={styles.formContainer}>
      <View>
        <TextInput
          style={[
            styles.formInputItem,
            {
              borderColor: isInvalid('username') ? 'red' : '#d3d3d3',
            },
          ]}
          placeholder='Username'
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
        />
        {isInvalid('username') && (
          <Text style={{ color: 'red', marginVertical: 4 }}>
            {formik.errors.username}
          </Text>
        )}
      </View>
      <View>
        <TextInput
          style={[
            styles.formInputItem,
            { borderColor: isInvalid('password') ? 'red' : '#d3d3d3' },
          ]}
          placeholder='Password'
          secureTextEntry
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
        />
        {isInvalid('password') && (
          <Text style={{ color: 'red', marginVertical: 4 }}>
            {formik.errors.password}
          </Text>
        )}
      </View>
      <Button size='large' onPress={formik.handleSubmit}>
        Sign in
      </Button>
    </View>
  );
};

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
