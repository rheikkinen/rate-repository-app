import { useReducer } from 'react';
import RepositoryFilterContext from '../contexts/RepositoryOrderContext';

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

const initialState = {
  order: orderOptions.latest,
  searchKeyword: '',
};

export const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ORDER':
      return { ...state, order: orderOptions[action.payload] };
    case 'SET_SEARCH':
      return { ...state, searchKeyword: action.payload };
    default:
      return state;
  }
};

export const RepositoryFilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  return (
    <RepositoryFilterContext.Provider value={{ state, dispatch }}>
      {children}
    </RepositoryFilterContext.Provider>
  );
};
