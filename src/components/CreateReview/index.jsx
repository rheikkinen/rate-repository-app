import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import { CREATE_REVIEW } from '../../graphql/mutations';
import ReviewForm from './ReviewForm';

const CreateReview = () => {
  const [mutate] = useMutation(CREATE_REVIEW);
  const navigateTo = useNavigate();

  const submitReview = async (values) => {
    const { ownerName, repositoryName, rating, textReview } = values;

    try {
      const response = await mutate({
        variables: {
          review: {
            ownerName,
            repositoryName,
            rating: Number(rating),
            text: textReview,
          },
        },
      });

      const { createReview: review } = response.data;
      navigateTo(`/repositories/${review.repositoryId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return <ReviewForm onSubmit={submitReview} />;
};

export default CreateReview;
