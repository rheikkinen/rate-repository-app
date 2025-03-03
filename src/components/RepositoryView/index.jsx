import { useQuery } from '@apollo/client';
import { View } from 'react-native';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY } from '../../graphql/queries';
import RepositoryItem from '../RepositoryItem';
import Text from '../Text';

const RepositoryView = () => {
  const { id } = useParams();
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  if (loading)
    return (
      <View>
        <Text>Loading repository details...</Text>
      </View>
    );

  const { repository } = data;

  return (
    <View>
      <RepositoryItem item={repository} showButton />
    </View>
  );
};

export default RepositoryView;
