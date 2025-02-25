import Constants from 'expo-constants';
import { Pressable, StyleSheet, View } from 'react-native';
import { useLocation, useNavigate } from 'react-router-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.background.primary,
    display: 'flex',
    flexDirection: 'row',
  },
  item: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 12,
  },
});

const AppBarItem = ({ children, onPress, path }) => {
  const navigateTo = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Pressable
      onPress={() => navigateTo(path)}
      style={[
        {
          backgroundColor:
            currentPath === path ? theme.colors.secondary : 'transparent',
        },
        styles.item,
      ]}
    >
      <Text fontSize={'heading'}>{children}</Text>
    </Pressable>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarItem path={'/'}>Repositories</AppBarItem>
      <AppBarItem path={'/signin'}>Sign in</AppBarItem>
    </View>
  );
};

export default AppBar;
