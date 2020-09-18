import _ from 'lodash';
import axios from 'axios';

class LoginService {
  static instance = null;

  storageKey = {
    token: 'token',
  };

  login = ({username, password}) => {
    return axios.post('users/login', {username, password});
  }

  isLoggedIn = () => {
    const token = localStorage.getItem(this.storageKey.token);
    return !_.isEmpty(token);
  }

  setToken = (token) => {
    let toBeStoredToken = token;
    if (_.isNil(token)) {
      toBeStoredToken = '';
    }
    localStorage.setItem(this.storageKey.token, toBeStoredToken);
  }
}


if (!LoginService.instance) {
  LoginService.instance = new LoginService();
}

export default LoginService.instance;
