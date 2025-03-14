import { useQuery } from '@apollo/client';
import { FlatList, StyleSheet, View } from 'react-native';
import { ME } from '../../graphql/queries';
import RepositoryReview from '../RepositoryReview';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    paddingBlockStart: 12,
  },
  listHeader: {
    margin: 8,
    paddingBlockStart: 8,
  },
  separator: {
    height: 12,
  },
  footer: {
    paddingBlockStart: 20,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ListFooter = () => <View style={styles.footer} />;

const MyReviews = () => {
  const { data, error, loading } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
    variables: {
      includeReviews: true,
    },
  });

  if (loading)
    return (
      <View>
        <Text>Loading reviews...</Text>
      </View>
    );

  if (error)
    return (
      <View>
        <Text>Error loading reviews.</Text>
      </View>
    );

  const reviews = data?.me?.reviews;

  const reviewNodes = reviews?.edges
    ? reviews.edges.map((review) => review.node)
    : [];

  return (
    <FlatList
      style={styles.container}
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ id }) => id}
      ListEmptyComponent={
        <View style={{ paddingHorizontal: 8 }}>
          <Text>No reviews yet.</Text>
        </View>
      }
      renderItem={({ item }) => (
        <RepositoryReview review={item} showRepositoryInfo />
      )}
      ListFooterComponent={<ListFooter />}
    />
  );
};

export default MyReviews;
