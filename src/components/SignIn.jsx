import { useFormik } from 'formik';
import { StyleSheet, TextInput, View } from 'react-native';
import theme from '../theme';
import Button from './Button';

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
    onSubmit,
  });

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.formInputItem}
        placeholder='Username'
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      <TextInput
        style={styles.formInputItem}
        placeholder='Password'
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      <Button size='large' onPress={formik.handleSubmit}>
        Sign in
      </Button>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
