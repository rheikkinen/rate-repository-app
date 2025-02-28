import { useApolloClient, useQuery } from '@apollo/client';
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ME } from '../../graphql/queries';
import useAuthStorage from '../../hooks/useAuthStorage';
import AppBarItem from './AppBarItem';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
  },
});

const AppBar = () => {
  const { data, error, loading } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
  });
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (!loading) {
      setCurrentUser(data?.me);
    }
  }, [data, loading]);

  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const handleSignOut = async () => {
    setCurrentUser(null);
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={{ flexGrow: 1 }}>
        <AppBarItem path={'/'}>Repositories</AppBarItem>
        {!currentUser && !loading && (
          <AppBarItem path={'/signin'}>Sign in</AppBarItem>
        )}
        {currentUser && !loading && (
          <AppBarItem textStyle={{ color: 'red' }} onPress={handleSignOut}>
            Sign out
          </AppBarItem>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
