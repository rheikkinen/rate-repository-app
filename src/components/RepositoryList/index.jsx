import useOrder from '../../hooks/useOrder';
import useRepositories from '../../hooks/useRepositories';
import RepositoryListContainer from './RepositoryListContainer';

const RepositoryList = () => {
  const { order } = useOrder();
  const { repositories } = useRepositories(order);

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
