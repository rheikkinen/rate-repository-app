import { useFormik } from 'formik';
import { StyleSheet, TextInput, View } from 'react-native';
import * as yup from 'yup';
import theme from '../../theme';
import Button from '../Button';
import Text from '../Text';

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
  error: {
    color: theme.colors.textError,
    marginVertical: 4,
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
              borderColor: isInvalid('username')
                ? theme.colors.textError
                : '#d3d3d3',
            },
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
            {
              borderColor: isInvalid('password')
                ? theme.colors.textError
                : '#d3d3d3',
            },
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
      <Button testID='submitButton' size='large' onPress={formik.handleSubmit}>
        Sign in
      </Button>
    </View>
  );
};

export default SignInForm;
