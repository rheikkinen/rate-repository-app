import useRepositoryFilter from '../../hooks/useRepositoryFilter';
import useRepositories from '../../hooks/useRepositories';
import RepositoryListContainer from './RepositoryListContainer';
import { useEffect } from 'react';

const RepositoryList = () => {
  const {
    state: { order, searchKeyword },
  } = useRepositoryFilter();

  const { repositories, fetchMore, refetch } = useRepositories({
    first: 10,
    orderBy: order?.orderBy,
    orderDirection: order?.orderDirection,
    searchKeyword,
  });

  const handleEndReached = () => {
    fetchMore();
  };

  useEffect(() => {
    refetch();
  }, [order, searchKeyword]);

  return (
    <RepositoryListContainer
      repositories={repositories}
      onEndReached={handleEndReached}
    />
  );
};

export default RepositoryList;
