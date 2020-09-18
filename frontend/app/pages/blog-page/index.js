import React, {useEffect, useState} from 'react';
import useInjectReducer from 'hooks/useInjectReducer';
import { useDispatch, useSelector } from 'react-redux';
import { fromJS } from 'immutable';
import { Row, Container, Button } from 'react-bootstrap';
import { ActionType } from 'global-constants';
import _ from 'lodash';
import * as actions from './actions';
import BlogCard from './components/blog-card';
import BlogFormModal from './components/blog-form-modal';

import './style.scss';

const BlogPage = () => {
  const dispatch = useDispatch();

  const reducerKey = 'blogMain';
  useInjectReducer({
    key: reducerKey,
    reducer: (
      state = fromJS({
        articleList: [],
      }),
      action
    ) => {
      switch (action.type) {
        case ActionType.FETCH_ARTICLES_SUCCESS:
          const articles = [...state.get('articleList'), ...action.payload];
          return state.set('articleList', articles);
        case ActionType.CLEAR_ARTICLE_LIST:
          return state.set('articleList', []);
        default:
          return state;
      }
    },
  });

  const fetchArticles = (params) => dispatch(actions.fetchArticles(params));

  const articleList = useSelector((state) => state.getIn([reducerKey, 'articleList']));
  const currentUser = useSelector((state) => state.getIn(['app', 'currentUser']));

  const [showFromDialog, setShowFormDialog] = useState(false);
  const [editId, setEditId] = useState();

  const handleCloseFormDialog = () => setShowFormDialog(false);
  const handleShowFormDialog = () => setShowFormDialog(true);


  // componentDidMount
  useEffect(() => {
    onFetchArticles(0);
  }, []);

  // Function & Event Handler
  const onFetchArticles = (page) => {
    fetchArticles({
      page,
      size: 20,
    });
  };

  const onEditArticle = (id) => {
    setEditId(id);
    handleShowFormDialog();
  };

  const onFormDialogClose = (isNeedUpdate) => {
    handleCloseFormDialog();
    setEditId(null);
    if (isNeedUpdate === true) {
      dispatch(actions.clearArticleList());
      fetchArticles(0);
    }
  };

  return (
    <Container fluid className="blog-page">
      <Row className="header">
        <h1>Blog</h1>
        <div className="button-group">
          { currentUser
          && <Button className="add-button" onClick={handleShowFormDialog}>+ Add</Button>}
        </div>

      </Row>
      <Row>
        { _.isArray(articleList) && _.map(articleList, (item) => (
          item && <BlogCard
            key={item._id}
            id={item._id}
            name={item.name}
            content={item.content}
            author={item.author}
            status={item.status}
            category={item.category}
            lastModified={item.lastModified}
            onEdit={(id) => onEditArticle(id)}
          />
        ))
        }
      </Row>
      <BlogFormModal
        show={showFromDialog}
        onHide={onFormDialogClose}
        id={editId}
      />
    </Container>
  );
};

export default BlogPage;
