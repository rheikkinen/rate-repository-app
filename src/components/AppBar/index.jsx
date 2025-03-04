import Constants from 'expo-constants';
import { ScrollView, StyleSheet, View } from 'react-native';
import useSession from '../../hooks/useSession';
import AppBarItem from './AppBarItem';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    elevation: 5,
  },
});

const AppBar = () => {
  const { currentUser, loading, signOut } = useSession();

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={{ flexGrow: 1 }}>
        <AppBarItem path={'/'}>Repositories</AppBarItem>
        {!currentUser && !loading && (
          <AppBarItem path={'/signin'}>Sign in</AppBarItem>
        )}
        {currentUser && !loading && (
          <AppBarItem
            textStyle={{ color: theme.colors.textError }}
            onPress={signOut}
          >
            Sign out
          </AppBarItem>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
