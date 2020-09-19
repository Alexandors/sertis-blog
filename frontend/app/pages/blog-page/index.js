import React, {useEffect, useState} from 'react';
import useInjectReducer from 'hooks/useInjectReducer';
import { useDispatch, useSelector } from 'react-redux';
import { fromJS } from 'immutable';
import { Row, Container, Button, Modal } from 'react-bootstrap';
import { ActionType } from 'global-constants';
import _ from 'lodash';
import * as actions from './actions';
import BlogCard from './components/blog-card';
import BlogFormModal from './components/blog-form-modal';
import BlogDeleteModal from './components/blog-delete-modal';

import './style.scss';

const BlogPage = () => {
  const dispatch = useDispatch();

  const reducerKey = 'blogMain';
  useInjectReducer({
    key: reducerKey,
    reducer: (
      state = fromJS({
        articleList: [],
        hasMoreArticle: true,
        isLoading: false,
        totalArticle: 0,
      }),
      action
    ) => {
      switch (action.type) {
        case ActionType.FETCH_ARTICLES_REQUEST:
          return state.set('isLoading', true);
        case ActionType.FETCH_ARTICLES_SUCCESS:
          const articles = [...state.get('articleList'), ...action.payload];
          return state.set('articleList', articles)
            .set('hasMoreArticle', _.size(action.payload) > 0)
            .set('isLoading', false)
            .set('totalArticle', action.totalCount);
        case ActionType.CLEAR_ARTICLE_LIST:
          return state.set('articleList', [])
            .set('hasMoreArticle', true)
            .set('isLoading', false)
            .set('totalArticle', 0);
        default:
          return state;
      }
    },
  });

  const fetchArticles = (params) => dispatch(actions.fetchArticles(params));

  const currentUser = useSelector((state) => state.getIn(['app', 'currentUser']));
  const articleList = useSelector((state) => state.getIn([reducerKey, 'articleList']));
  const hasMoreArticle = useSelector((state) => state.getIn([reducerKey, 'hasMoreArticle']));
  const isLoading = useSelector((state) => state.getIn([reducerKey, 'isLoading']));
  const totalArticle = useSelector((state) => state.getIn([reducerKey, 'totalArticle']));

  const [showFromDialog, setShowFormDialog] = useState(false);
  const [showDeleteDialog, setDeleteFormDialog] = useState(false);
  const [editId, setEditId] = useState();
  const [deleteId, setDeleteId] = useState();
  const [loadMore, setLoadMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleCloseFormDialog = () => setShowFormDialog(false);
  const handleShowFormDialog = () => setShowFormDialog(true);

  const handleCloseDeleteDialog = () => setDeleteFormDialog(false);
  const handleShowDeleteDialog = () => setDeleteFormDialog(true);

  // componentDidMount
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    dispatch(actions.clearArticleList());
    onFetchArticles(0);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (loadMore === true && hasMoreArticle === false) {
      setLoadMore(false);
    }
  }, [hasMoreArticle]);

  useEffect(() => {
    if (_.isBoolean(isLoading)) {
      setLoading(isLoading);
    }
  }, [isLoading]);

  useEffect(() => {
    handleScroll();
  }, [articleList]);

  // Function & Event Handler
  const onFetchArticles = (page) => {
    fetchArticles({
      page,
      size: 8,
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
      forceUpdate();
    }
  };

  const onLoadMore = () => {
    onFetchArticles(currentPage + 1);
    setCurrentPage(currentPage + 1);
  }

  const hasLoadMore = totalArticle && parseInt(totalArticle, 10) > _.size(articleList);

  const handleScroll = () => {
    const windowInnerHeight = _.get(window, 'innerHeight', 0);
    const scrollTop = _.get(document, ['documentElement', 'scrollTop'], 0);
    const scrollHeight = _.get(document, ['documentElement', 'scrollHeight'], 0)
    if (windowInnerHeight + scrollTop + 10 > scrollHeight) {
      // console.log('scroll', hasLoadMore, loading, window.innerHeight + document.documentElement.scrollTop, document.scrollingElement.scrollHeight);
      if (hasLoadMore === true && loading === false) {
        onLoadMore();w
        console.log('Load More');
      }
    }
  }
  const onDeleteArticle = (id) => {
    setDeleteId(id);
    handleShowDeleteDialog();
  }

  const onDeleteDialogClose = (isNeedUpdate) => {
    setDeleteId(null);
    handleCloseDeleteDialog();

    if (isNeedUpdate === true) {
      forceUpdate();
    }
  }

  const forceUpdate = () => {
    dispatch(actions.clearArticleList());
    setCurrentPage(0);
    onFetchArticles(0);
  }

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
            onDelete={(id) => onDeleteArticle(id)}
          />
        ))
        }
      </Row>
      <Row className="load-more-panel">
        {
          hasLoadMore === true
          && <Button onClick={onLoadMore} className="load-more-button" data-testid="load-more-button">Load More</Button>
        }
      </Row>
      <BlogFormModal
        show={showFromDialog}
        onHide={onFormDialogClose}
        id={editId}
      />

      <BlogDeleteModal
        show={showDeleteDialog}
        onHide={onDeleteDialogClose}
        id={deleteId}
        articleList={articleList}
      />
    </Container>
  );
};

export default BlogPage;
