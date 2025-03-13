import { useContext } from 'react';
import RepositoryFilterContext from '../contexts/RepositoryOrderContext';

const useRepositoryFilter = () => {
  const { state, dispatch } = useContext(RepositoryFilterContext);

  const setOrder = (option) => {
    dispatch({ type: 'SET_ORDER', payload: option });
  };

  const setSearch = (keyword) => {
    dispatch({ type: 'SET_SEARCH', payload: keyword });
  };

  return { state, setOrder, setSearch };
};

export default useRepositoryFilter;
