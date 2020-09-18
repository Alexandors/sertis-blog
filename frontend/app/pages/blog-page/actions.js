import { ActionType } from 'global-constants';
import ArticleService from 'services/article-service';
import {
  showServerError,
  showSuccessMessage,
} from 'shared/actions/notification';

export const fetchArticles = ({ page, size }) => (dispatch) => {
  dispatch({ type: ActionType.FETCH_ARTICLES_REQUEST });

  ArticleService.getList({ page, size })
    .then((res) => {
      dispatch({
        type: ActionType.FETCH_ARTICLES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: ActionType.SERVER_ERROR });
      dispatch(showServerError(err));
    });
};

export const saveArticle = ({name, content, status}) => (dispatch) => {
  ArticleService.save({name, content, status}).then( res=> {
    dispatch({
      type: ActionType.SAVE_ARTICLE_SUCCESS,
      payload: res.data
    })
  });
}


export const fetchCategories = () => (dispatch) => {
  ArticleService.getCategories().then(res => {
    dispatch({
      type: ActionType.FETCH_CATEGORY_SUCCESS,
      payload: res.data
    })
  });
}
