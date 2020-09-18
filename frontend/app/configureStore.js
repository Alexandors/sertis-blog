import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import createReducer from './reducers';

// eslint-disable-next-line no-unused-vars
export default function configureStore(initialState = {}) {
  createMemoryHistory();
  const middlewares = [thunk];

  const enhancers = [applyMiddleware(...middlewares)];

  /* eslint-disable */
  const composeEnhancers =
    process.env.NODE_ENV !== "production" &&
    typeof window === "object" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          trace: true,
          traceLimit: 25
        })
      : compose;
  /* eslint-enable */

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers)
  );

  store.injectedReducers = {};

  /* istanbul ignore next */
  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
}
