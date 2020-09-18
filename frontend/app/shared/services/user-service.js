import axios from 'axios';

class UserService {
  static instance = null;

  api = '/users';

  getCurrentUser = () => {
    return axios.get(`${this.api}/me`);
  }
}


if (!UserService.instance) {
  UserService.instance = new UserService();
}

export default UserService.instance;
