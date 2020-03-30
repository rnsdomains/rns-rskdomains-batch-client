import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import createRootReducer from './reducer';

const middleware = [];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(), // root reducer with router state
    preloadedState,
    compose(
      applyMiddleware(...middleware),
    ),
  );

  return store;
}
