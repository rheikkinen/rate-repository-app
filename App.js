import { NativeRouter } from 'react-router-native';
import Main from './src/components/Main';
import { StatusBar } from 'expo-status-bar';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './src/utils/apolloClient';

export default function App() {
  const apolloClient = createApolloClient();

  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <Main />
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style='auto' />
    </>
  );
}
