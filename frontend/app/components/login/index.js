import React, { useState, useEffect, Fragment } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import LoginService from 'services/login-service';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'shared/actions/login';
import useInjectReducer from 'hooks/useInjectReducer';
import { ActionType } from 'global-constants';
import {fromJS} from "immutable";
import _ from 'lodash';

import './style.scss';


const LoginComponent = () => {
  const dispatch = useDispatch();

  const reducerKey = 'loginComponent';
  useInjectReducer({
    key: reducerKey,
    reducer: (
      state = fromJS({
        token: null,
        isLoginFail: false,
      }),
      action
    ) => {
      switch (action.type) {
        case ActionType.LOGIN_REQUEST:
          return state.set('isLoginFail', false);
        case ActionType.LOGIN_SUCCESS:
          return state.set('token', _.get(action, ['payload', 'token']));
        case ActionType.LOGIN_FAILED:
          return state.set('token', '').set('isLoginFail', true);
        case ActionType.LOG_OUT:
          return state.set('token', '');
        default:
          return state;
      }
    },
  });
  const token = useSelector((state) => state.getIn([reducerKey, 'token']));
  const isLoginFail = useSelector((state) => state.getIn([reducerKey, 'isLoginFail']));
  const currentUser = useSelector((state) => state.getIn(['app', 'currentUser']));

  const [show, setShow] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (!_.isEmpty(token)) {
      setShow(false);
      window.location.reload(false);
    }
  }, [token]);

  useEffect(() => {
    if (!_.isNil(currentUser)) {
      setDisplayName(currentUser.username);
    }
  }, [currentUser]);

  const onLogin = () => {
    dispatch(actions.Login({
      username,
      password
    }))
  }

  const onKey = (e) => {
    if (e.key === "Enter") {
      onLogin();
    }
  }

  const logOut = () => {
    dispatch(actions.Logout());
  }

  return (
    <div className="login-component">
      <div className="login-inner">
        {
          LoginService.isLoggedIn() === false
          && <Button className="login-button" onClick={handleShow}>Login</Button>
        }
        {
          LoginService.isLoggedIn() === true
          && <Fragment>
            <div className="displayName">{displayName}</div>
            <Button variant="info" onClick={logOut}>Log out</Button>
          </Fragment>
        }
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Log in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onLogin}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                onKeyUp={onKey}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyUp={onKey}
              />
            </Form.Group>
            {isLoginFail && <span className="error-message">Login Fail</span>}
          </Form>
        </Modal.Body>
        <Modal.Footer>

          <Button onClick={onLogin}>Log in</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LoginComponent;
