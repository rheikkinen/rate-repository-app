import { useQuery } from '@apollo/client';
import { FlatList, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY } from '../../graphql/queries';
import theme from '../../theme';
import RepositoryItem from '../RepositoryItem';
import RepositoryReview from '../RepositoryReview';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  listHeader: {
    margin: 8,
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

const RepositoryView = () => {
  const { id } = useParams();

  const variables = {
    id,
    first: 8,
  };

  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  if (loading)
    return (
      <View>
        <Text>Loading repository details...</Text>
      </View>
    );

  if (error)
    return (
      <View>
        <Text>Error loading repository details.</Text>
      </View>
    );

  const { repository } = data;

  const reviews = repository?.reviews;

  const handleFetchMore = () => {
    const canFetchMore = !loading && reviews?.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  const onEndReach = () => {
    handleFetchMore();
  };

  const reviewNodes = reviews?.edges
    ? reviews.edges.map((review) => review.node)
    : [];

  return (
    <FlatList
      style={styles.container}
      data={reviewNodes}
      ListHeaderComponent={
        <View>
          <RepositoryItem item={repository} showButton />
          <View
            style={{
              height: 8,
              backgroundColor: theme.colors.background.primary,
            }}
          />
          <Text
            fontWeight={'bold'}
            fontSize={'subheading'}
            style={styles.listHeader}
          >
            Reviews
          </Text>
        </View>
      }
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ id }) => id}
      ListEmptyComponent={
        <View style={{ paddingHorizontal: 8 }}>
          <Text>No reviews yet.</Text>
        </View>
      }
      renderItem={({ item }) => <RepositoryReview review={item} />}
      ListFooterComponent={<ListFooter />}
      onEndReached={onEndReach}
    />
  );
};

export default RepositoryView;
