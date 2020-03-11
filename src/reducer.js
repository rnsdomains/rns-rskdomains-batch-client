import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { LABELS_AVAILABLE, CONFIRM_PRICE } from './types';

const initialState = {
  labels: null,
  confirmedPrice: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LABELS_AVAILABLE:
      return {
        ...state,
        labels: action.labels
      };
    case CONFIRM_PRICE:
      return {
        ...state,
        confirmedPrice: true,
      }
    default: return state;
  }
};

export default (history) => combineReducers({
  router: connectRouter(history),
  app: reducer,
});
