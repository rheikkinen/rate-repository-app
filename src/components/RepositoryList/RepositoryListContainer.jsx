import { Picker } from '@react-native-picker/picker';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import RepositoryItem from '../RepositoryItem';
import useOrder from '../../hooks/useOrder';
import { orderOptions } from '../../utils/RepositoryOrderProvider';

const styles = StyleSheet.create({
  separator: {
    height: 8,
  },
  orderPicker: {
    paddingVertical: 8,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = () => {
  const { order, setOrder } = useOrder();
  return (
    <View>
      <Picker
        style={styles.orderPicker}
        selectedValue={order}
        onValueChange={setOrder}
      >
        {Object.entries(orderOptions).map(([key, { label }]) => (
          <Picker.Item key={key} label={label} value={key} />
        ))}
      </Picker>
    </View>
  );
};

const RepositoryListContainer = ({ repositories }) => {
  const navigateTo = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges?.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      testID='repositoryListContainer'
      data={repositoryNodes}
      ListHeaderComponent={RepositoryListHeader}
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
