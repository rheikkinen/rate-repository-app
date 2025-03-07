import { useFormik } from 'formik';
import { StyleSheet, TextInput, View } from 'react-native';
import * as yup from 'yup';
import theme from '../../theme';
import Button from '../Button';
import Text from '../Text';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(5, 'Username must be between 5 and 30 characters long')
    .max(30, 'Username must be between 5 and 30 characters long'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be between 5 and 50 characters long')
    .max(50, 'Password must be between 5 and 50 characters long'),
  confirmPassword: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password'), null], 'Passwords must be the same'),
});

const initialValues = {
  username: '',
  password: '',
  confirmPassword: '',
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
    error: {
      borderColor: theme.colors.textError,
    },
  },
  error: {
    color: theme.colors.textError,
    marginVertical: 4,
  },
});

const SignUpForm = ({ onSubmit }) => {
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
            isInvalid('username') && styles.formInputItem.error,
          ]}
          placeholder='Username'
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
        />
        {isInvalid('username') && (
          <Text style={styles.error}>{formik.errors.username}</Text>
        )}
      </View>
      <View>
        <TextInput
          style={[
            styles.formInputItem,
            isInvalid('password') && styles.formInputItem.error,
          ]}
          placeholder='Password'
          secureTextEntry
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
        />
        {isInvalid('password') && (
          <Text style={styles.error}>{formik.errors.password}</Text>
        )}
      </View>
      <View>
        <TextInput
          style={[
            styles.formInputItem,
            isInvalid('confirmPassword') && styles.formInputItem.error,
          ]}
          placeholder='Password confirmation'
          secureTextEntry
          value={formik.values.confirmPassword}
          onChangeText={formik.handleChange('confirmPassword')}
        />
        {isInvalid('confirmPassword') && (
          <Text style={styles.error}>{formik.errors.confirmPassword}</Text>
        )}
      </View>
      <Button testID='submitButton' size='large' onPress={formik.handleSubmit}>
        Sign up
      </Button>
    </View>
  );
};

export default SignUpForm;
