import { format } from 'date-fns';
import { StyleSheet, View } from 'react-native';
import theme from '../../theme';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 8,
    marginLeft: 8,
    marginRight: 8,
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
  },
  repositoryInfo: {
    backgroundColor: theme.colors.background.secondary,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    marginBottom: 4,
  },
  content: {
    padding: 12,
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

const RepositoryReview = ({ review, showRepositoryInfo = false }) => {
  return (
    <View style={styles.container}>
      {showRepositoryInfo && (
        <View style={styles.repositoryInfo}>
          <Text fontSize={'subheading'} color={'textSecondary'}>
            {review.repository?.fullName}
          </Text>
        </View>
      )}
      <View style={styles.content}>
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
        {review.text && <Text>{review.text}</Text>}
      </View>
    </View>
  );
};

export default RepositoryReview;
