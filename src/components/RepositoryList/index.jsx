import useRepositoryFilter from '../../hooks/useRepositoryFilter';
import useRepositories from '../../hooks/useRepositories';
import RepositoryListContainer from './RepositoryListContainer';

const RepositoryList = () => {
  const { state } = useRepositoryFilter();
  const { repositories } = useRepositories(state);

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
