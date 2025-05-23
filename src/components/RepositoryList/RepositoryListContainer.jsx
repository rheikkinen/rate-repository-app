import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useNavigate } from 'react-router-native';
import { useDebouncedCallback } from 'use-debounce';
import useRepositoryFilter from '../../hooks/useRepositoryFilter';
import { orderOptions } from '../../utils/RepositoryFilterProvider';
import RepositoryItem from '../RepositoryItem';
import theme from '../../theme';

const styles = StyleSheet.create({
  separator: {
    height: 8,
  },
  pickerContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    backgroundColor: theme.colors.background.secondary,
    marginHorizontal: 12,
    elevation: 1,
  },
  searchBarInput: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    backgroundColor: 'white',
    marginHorizontal: 12,
  },
  headerContainer: {
    gap: 12,
    marginVertical: 12,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = () => {
  const { state, setOrder, setSearch } = useRepositoryFilter();
  const [searchInputValue, setSearchInputValue] = useState(state.searchKeyword);

  const debouncedSetSearch = useDebouncedCallback((keyword) => {
    setSearch(keyword);
  }, 500);

  const handleSearch = (value) => {
    setSearchInputValue(value);
    debouncedSetSearch(value);
  };

  return (
    <View style={styles.headerContainer}>
      <Searchbar
        elevation={1}
        style={styles.searchBarInput}
        placeholder='Search'
        onChangeText={handleSearch}
        value={searchInputValue}
      />
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.orderPicker}
          selectedValue={state.order}
          onValueChange={setOrder}
        >
          {Object.entries(orderOptions).map(([key, { label }]) => (
            <Picker.Item key={key} label={label} value={key} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const RepositoryListContainer = ({ repositories, onEndReached }) => {
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
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigateTo(`/repositories/${item.id}`)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
    />
  );
};

export default RepositoryListContainer;
