import { useFormik } from 'formik';
import { StyleSheet, TextInput, View } from 'react-native';
import * as yup from 'yup';
import theme from '../../theme';
import Button from '../Button';
import Text from '../Text';

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number('Rating must be a number')
    .required('Rating is required')
    .integer('Rating must be a whole number')
    .min(1, 'Rating must be a number between 1 and 100')
    .max(100, 'Rating must be a number between 1 and 100'),
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  textReview: '',
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

const ReviewForm = ({ onSubmit }) => {
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
              borderColor: isInvalid('ownerName')
                ? theme.colors.textError
                : '#d3d3d3',
            },
          ]}
          placeholder='Repository owner name'
          value={formik.values.ownerName}
          onChangeText={formik.handleChange('ownerName')}
        />
        {isInvalid('ownerName') && (
          <Text style={styles.error}>{formik.errors.ownerName}</Text>
        )}
      </View>
      <View>
        <TextInput
          style={[
            styles.formInputItem,
            {
              borderColor: isInvalid('repositoryName')
                ? theme.colors.textError
                : '#d3d3d3',
            },
          ]}
          placeholder='Repository name'
          value={formik.values.repositoryName}
          onChangeText={formik.handleChange('repositoryName')}
        />
        {isInvalid('repositoryName') && (
          <Text style={styles.error}>{formik.errors.repositoryName}</Text>
        )}
      </View>
      <View>
        <TextInput
          inputMode='numeric'
          style={[
            styles.formInputItem,
            {
              borderColor: isInvalid('rating')
                ? theme.colors.textError
                : '#d3d3d3',
            },
          ]}
          placeholder='Rating between 1 and 100'
          value={formik.values.rating}
          onChangeText={formik.handleChange('rating')}
        />
        {isInvalid('rating') && (
          <Text style={styles.error}>{formik.errors.rating}</Text>
        )}
      </View>
      <View>
        <TextInput
          style={[
            styles.formInputItem,
            {
              borderColor: isInvalid('textReview')
                ? theme.colors.textError
                : '#d3d3d3',
            },
          ]}
          placeholder='Review (optional)'
          value={formik.values.textReview}
          onChangeText={formik.handleChange('textReview')}
        />
        {isInvalid('review') && (
          <Text style={styles.error}>{formik.errors.textReview}</Text>
        )}
      </View>
      <Button testID='submitButton' size='large' onPress={formik.handleSubmit}>
        Create a review
      </Button>
    </View>
  );
};

export default ReviewForm;
