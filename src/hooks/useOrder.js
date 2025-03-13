import { useContext } from 'react';
import RepositoryOrderContext from '../contexts/RepositoryOrderContext';

const useOrder = () => {
  const { order, dispatch } = useContext(RepositoryOrderContext);

  const setOrder = (option) => {
    dispatch({ type: 'SET_ORDER', payload: option });
  };

  return { order, setOrder };
};

export default useOrder;
