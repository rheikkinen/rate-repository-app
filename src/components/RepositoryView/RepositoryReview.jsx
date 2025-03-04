import { format } from 'date-fns';
import { StyleSheet, View } from 'react-native';
import Text from '../Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 4,
    padding: 12,
    marginLeft: 8,
    marginRight: 8,
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    marginBottom: 4,
  },
  rating: {
    width: 42,
    height: 42,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
});

const RepositoryReview = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.rating}>
          <Text fontSize={'subheading'} fontWeight={'bold'} color={'primary'}>
            {review.rating}
          </Text>
        </View>
        <View>
          <Text fontWeight={'bold'} fontSize={'subheading'}>
            {review.user.username}
          </Text>
          <Text color={'textSecondary'}>
            {format(review.createdAt, 'dd.MM.yyyy')}
          </Text>
        </View>
      </View>
      <Text>{review.text}</Text>
    </View>
  );
};

export default RepositoryReview;
