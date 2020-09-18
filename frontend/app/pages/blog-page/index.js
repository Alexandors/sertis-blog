import React, {useEffect} from 'react';
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
  const currentUser = useSelector((state) => state.getIn(['app', 'currentUser']));

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
      <Row className="header">
        <h1>Blog</h1>
        <div className="button-group">
          { currentUser
          && <Button className="add-button">+ Add</Button>}
        </div>

      </Row>
      <Row>
        { _.map(articleList, (item) => (
          item && <BlogCard
            key={item._id}
            id={item._id}
            name={item.name}
            content={item.content}
            author={item.author}
            status={item.status}
            lastModified={item.lastModified}
            onEdit={(id) => {console.log(id)}}
          />
        ))
        }
      </Row>
    </Container>
  );
};

export default BlogPage;
