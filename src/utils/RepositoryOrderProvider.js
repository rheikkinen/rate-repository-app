import { useReducer } from 'react';
import RepositoryOrderContext from '../contexts/RepositoryOrderContext';

export const orderOptions = {
  latest: {
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
    label: 'Latest repositories',
  },
  highestRated: {
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'DESC',
    label: 'Highest rated first',
  },
  lowestRated: {
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'ASC',
    label: 'Lowest rated first',
  },
};

export const orderReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ORDER':
      return orderOptions[action.payload];
    default:
      return state;
  }
};

export const RepositoryOrderProvider = ({ children }) => {
  const [order, dispatch] = useReducer(orderReducer, orderOptions.latest);

  return (
    <RepositoryOrderContext.Provider value={{ order, dispatch }}>
      {children}
    </RepositoryOrderContext.Provider>
  );
};
