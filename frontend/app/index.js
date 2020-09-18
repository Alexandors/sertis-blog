import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { Router } from 'react-router-dom';

import '!file-loader?name=[name].[ext]!./favicon.ico';
import App from 'containers/app';
import axios from 'axios';

import configureStore from './configureStore';
import history from './history';

// Import i18n messages
import { translationMessages } from './i18n';

import 'sanitize.css/sanitize.css';
import './styles/scss/index.scss';
import LoginService from 'services/login-service';


const initialState = {};
const store = configureStore(initialState, history);

const startApp = () => {
  axios.defaults.baseURL = 'http://localhost:3001';

  axios.interceptors.request.use(function (config) {
    config.headers.Authorization =  `Bearer ${LoginService.getToken()}`;
    return config;
  });

  const render = () => {
    ReactDOM.render(
      <Provider store={store}>
        <Router history={history}>
          <App/>
        </Router>
      </Provider>,
      document.getElementById('app')
    );
  };

  // Hot reloadable translation json files
  if (module.hot) {
    // modules.hot.accept does not accept dynamic dependencies,
    // have to be constants at compile-time
    module.hot.accept('./i18n', () => {
      render(translationMessages);
    });
  }

  // Chunked polyfill for browsers without Intl support
  if (!window.Intl) {
    import(/* webpackChunkName: 'intl' */ 'intl')
      .then(() => import(
          /* webpackChunkName: 'intl/locale-data/jsonp/en.js' */ 'intl/locale-data/jsonp/en.js'
        ))
      .then(() => render(translationMessages))
      .catch(() => render(translationMessages));
  } else {
    render(translationMessages);
  }
};

startApp();
