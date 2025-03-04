import { useQuery } from '@apollo/client';
import { FlatList, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY } from '../../graphql/queries';
import RepositoryItem from '../RepositoryItem';
import Text from '../Text';
import RepositoryReview from './RepositoryReview';
import theme from '../../theme';

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
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  if (loading)
    return (
      <View>
        <Text>Loading repository details...</Text>
      </View>
    );

  const { repository } = data;
  const { edges: reviews } = repository.reviews;

  const reviewNodes = reviews ? reviews.map((review) => review.node) : [];

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
      renderItem={({ item }) => <RepositoryReview review={item} />}
      ListFooterComponent={<ListFooter />}
    />
  );
};

export default RepositoryView;
