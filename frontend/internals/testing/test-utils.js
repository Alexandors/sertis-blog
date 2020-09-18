import React from 'react';
import { render, queries } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'configureStore';
import { LocaleProvider } from 'providers/locale-provider';
import { translationMessages as messages } from 'i18n';
import * as customQueries from './queries';

let history;
let store;

// eslint-disable-next-line
const AllTheProviders = ({ children }) => (
  <Provider store={store}>
    <LocaleProvider messages={messages}>
      <Router history={history}>{children}</Router>
    </LocaleProvider>
  </Provider>
);

const customRender = (ui, { route = '/', initialEntries = [route], state, ...options } = {}) => {
  history = createMemoryHistory({ initialEntries, initialIndex: 0 });
  store = configureStore(state, history);
  return {
    ...render(ui, {
      wrapper: AllTheProviders,
      ...options,
      queries: { ...queries, ...customQueries },
    }),
    history,
    store,
  };
};

export * from '@testing-library/react';

export { customRender as render };
