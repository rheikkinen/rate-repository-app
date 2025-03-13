import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (options) => {
  const { data, loading } = useQuery(GET_REPOSITORIES, {
    variables: {
      orderBy: options?.orderBy,
      orderDirection: options?.orderDirection,
    },
  });

  if (loading) {
    return { repositories: [], loading };
  }

  const { repositories } = data;

  return { repositories, loading };
};

export default useRepositories;
