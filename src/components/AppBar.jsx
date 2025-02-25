import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.background.primary,
    display: 'flex',
    flexDirection: 'row',
  },
  item: {
    flexGrow: 1,
    padding: 12,
  },
});

const AppBarItem = ({ children, onPress }) => {
  return (
    <Pressable style={styles.item} onPress={onPress}>
      <Text fontSize={'heading'}>{children}</Text>
    </Pressable>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarItem onPress={() => {}}>Repositories</AppBarItem>
    </View>
  );
};

export default AppBar;
