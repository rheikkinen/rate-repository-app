import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (options) => {
  const { order, searchKeyword } = options;

  const { data, loading } = useQuery(GET_REPOSITORIES, {
    variables: {
      orderBy: order?.orderBy,
      orderDirection: order?.orderDirection,
      searchKeyword,
    },
  });

  if (loading) {
    return { repositories: [], loading };
  }

  const { repositories } = data;

  return { repositories, loading };
};

export default useRepositories;
