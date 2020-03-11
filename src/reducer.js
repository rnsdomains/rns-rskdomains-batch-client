import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
export const LABELS_AVAILABLE = 'LABELS_AVAILABLE';

const initialState = {
  labels: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LABELS_AVAILABLE:
      return {
        ...state,
        labels: action.labels
      };
    default: return state;
  }
};

export default (history) => combineReducers({
  router: connectRouter(history),
  app: reducer,
});
