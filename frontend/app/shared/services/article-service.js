import axios from 'axios';

class ArticleService {
    static instance = null;

    api = '/articles';

    getList = (params = { page: 0, size: 20 }) => {
      return axios.get(this.api, { params });
    }

    save = (data) => {
      return axios.post(this.api, data);
    }

    getCategories = () => {
      return axios.get(this.api + '/categories');
    }

    getOne = (id) => {
      return axios.get(this.api + '/' + id);
    }
}


if (!ArticleService.instance) {
  ArticleService.instance = new ArticleService();
}

export default ArticleService.instance;
