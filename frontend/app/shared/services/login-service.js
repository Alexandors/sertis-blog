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
    const token = this.getToken();
    return !_.isEmpty(token);
  }

  setToken = (token) => {
    let toBeStoredToken = token;
    if (_.isNil(token)) {
      toBeStoredToken = '';
    }
    axios.defaults.headers
    localStorage.setItem(this.storageKey.token, toBeStoredToken);
  }

  getToken = () => {
    return localStorage.getItem(this.storageKey.token);
  }
}


if (!LoginService.instance) {
  LoginService.instance = new LoginService();
}

export default LoginService.instance;
