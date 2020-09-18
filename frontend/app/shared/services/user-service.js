import axios from 'axios';

class UserService {
  static instance = null;

  api = '/users';

  getCurrentUser = () => {
    return axios.get(`${this.api}/me`);
  }

  getUserById = (id) => {
    return axios.get(`${this.api}/${id}`);
  }
}


if (!UserService.instance) {
  UserService.instance = new UserService();
}

export default UserService.instance;
