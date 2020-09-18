import React, { useEffect } from 'react';
import Routes from 'routes';
import LoaderMask from 'components/loader-mask';
import LoginService from 'services/login-service';
import * as actions from './actions';

import styles from './index.module.scss';
import { useDispatch } from "react-redux";
import useInjectReducer from "../../hooks/useInjectReducer";
import {fromJS} from "immutable";
import {ActionType} from "../../global-constants";

const App = () => {
  const dispatch = useDispatch();

  const reducerKey = 'app';

  useInjectReducer({
    key: reducerKey,
    reducer: (
      state = fromJS({
        currentUser: null,
      }),
      action
    ) => {
      switch (action.type) {
        case ActionType.FETCH_CURRENT_USER_SUCCESS:
          return state.set('currentUser', action.payload);
        case ActionType.LOG_OUT:
          return state.set('currentUser', null);
        default:
          return state;
      }
    },
  });

  const isLoggedIn = LoginService.isLoggedIn();

  useEffect(() => {
    fetchUser();
  }, [isLoggedIn]);

  const fetchUser = () => {
    if (isLoggedIn === true) {
      dispatch(actions.fetchCurrentUser());
    }
  }

  return (
  <React.Fragment>
    <LoaderMask/>
    <div className={styles.appBody}>
      <Routes/>
    </div>
  </React.Fragment>
);
}

export default App;
