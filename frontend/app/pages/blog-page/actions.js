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
        totalCount: res.headers['x-total-count'],
      });
    })
    .catch((err) => {
      dispatch({ type: ActionType.SERVER_ERROR });
      dispatch(showServerError(err));
    });
};

export const saveArticle = ({name, content, status, category}) => (dispatch) => {
  ArticleService.save({name, content, status, category}).then( res=> {
    dispatch({
      type: ActionType.SAVE_ARTICLE_SUCCESS,
      payload: res.data
    })
  }).catch((err) => {
    dispatch({ type: ActionType.SERVER_ERROR });
    dispatch(showServerError(err));
  });
}

export const updateArticle = ({_id, name, content, status, category}) => (dispatch) => {
  ArticleService.update({_id, name, content, status, category}).then( res=> {
    dispatch({
      type: ActionType.SAVE_ARTICLE_SUCCESS,
      payload: res.data
    })
  }).catch((err) => {
    dispatch({ type: ActionType.SERVER_ERROR });
    dispatch(showServerError(err));
  });
}


export const fetchCategories = () => (dispatch) => {
  ArticleService.getCategories().then(res => {
    dispatch({
      type: ActionType.FETCH_CATEGORY_SUCCESS,
      payload: res.data
    })
  }).catch((err) => {
    dispatch({ type: ActionType.SERVER_ERROR });
    dispatch(showServerError(err));
  });
}


export const getArticleById = (id) => (dispatch) => {
  ArticleService.getOne(id).then(res => {
    dispatch({
      type: ActionType.GET_ARTICLE_BY_ID_SUCCESS,
      payload: res.data
    })
  }).catch((err) => {
    dispatch({ type: ActionType.SERVER_ERROR });
    dispatch(showServerError(err));
  });
}

export const clearEditArticle = () => (dispatch) => {
  dispatch({
    type: ActionType.CLEAR_ARTICLE_EDIT,
  });
}

export const clearArticleList = () => (dispatch) => {
  dispatch({
    type: ActionType.CLEAR_ARTICLE_LIST,
  });
}

export const deleteArticle = (id) => (dispatch) => {
  ArticleService.delete(id).then(() => {
    dispatch({
      type: ActionType.DELETE_ARTICLE_SUCCESS,
    });
  }).catch((err) => {
    dispatch({ type: ActionType.SERVER_ERROR });
    dispatch(showServerError(err));
  });
}

export const clearDeleteArticle = () => (dispatch) => {
  dispatch({
    type: ActionType.CLEAR_DELETE_ARTICLE,
  });
}
