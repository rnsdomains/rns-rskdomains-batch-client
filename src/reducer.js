import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

const reducer = (state = {}, action) => state;

export default (history) => combineReducers({
  router: connectRouter(history),
  app: reducer,
});
