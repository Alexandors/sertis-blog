import React, { Fragment, useEffect } from 'react';
import useInjectReducer from 'hooks/useInjectReducer';
import { useDispatch, useSelector } from 'react-redux';
import { fromJS } from 'immutable';
import { Row, Container, Button } from 'react-bootstrap';
import { ActionType } from 'global-constants';
import _ from 'lodash';
import * as actions from './actions';
import BlogCard from './components/blog-card';

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
        default:
          return state;
      }
    },
  });

  const fetchArticles = (params) => dispatch(actions.fetchArticles(params));

  const articleList = useSelector((state) => state.getIn([reducerKey, 'articleList']));

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

  return (
    <Container fluid className="blog-page">
      <Row>
        <h1>Blog</h1>
      </Row>
      <Row>
        { _.map(articleList, (item) => (
          item && <BlogCard
            key={item._id}
            name={item.name}
            content={item.content}
            author={item.authorId}
          />
        )) }
      </Row>
    </Container>
  );
};

export default BlogPage;
