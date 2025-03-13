import { ApolloProvider } from '@apollo/client';
import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';
import Main from './src/components/Main';
import AuthStorageContext from './src/contexts/AuthStorageContext';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import { RepositoryFilterProvider } from './src/utils/RepositoryFilterProvider';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

export default function App() {
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage}>
            <RepositoryFilterProvider>
              <Main />
            </RepositoryFilterProvider>
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style='auto' />
    </>
  );
}
