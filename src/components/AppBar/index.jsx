import Constants from 'expo-constants';
import { ScrollView, StyleSheet, View } from 'react-native';
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
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={{ flexGrow: 1 }}>
        <AppBarItem path={'/'}>Repositories</AppBarItem>
        <AppBarItem path={'/signin'}>Sign in</AppBarItem>
      </ScrollView>
    </View>
  );
};

export default AppBar;
