import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import RepositoryItem from '../RepositoryItem';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 8,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListContainer = ({ repositories }) => {
  const navigateTo = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges?.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      testID='repositoryListContainer'
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigateTo(`/repositories/${item.id}`)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
    />
  );
};

export default RepositoryListContainer;
