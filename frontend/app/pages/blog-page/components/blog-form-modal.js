import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { fromJS } from 'immutable';
import { BlogStatus } from '../constants';
import * as actions from '../actions';
import useInjectReducer from '../../../hooks/useInjectReducer';
import { ActionType } from '../../../global-constants';

const BlogFormModal = ({ show, onHide, id }) => {
  const dispatch = useDispatch();

  const reducerKey = 'blogForm';

  useInjectReducer({
    key: reducerKey,
    reducer: (
      state = fromJS({
        categories: [],
        article: null,
        isSaveSuccess: false,
      }),
      action
    ) => {
      switch (action.type) {
        case ActionType.FETCH_CATEGORY_SUCCESS:
          return state.set('categories', action.payload);
        case ActionType.GET_ARTICLE_BY_ID_SUCCESS:
          return state.set('article', action.payload);
        case ActionType.CLEAR_ARTICLE_EDIT:
          return state.set('article', null).set('isSaveSuccess', false);
        case ActionType.SAVE_ARTICLE_SUCCESS:
          return state.set('isSaveSuccess', true);
        default:
          return state;
      }
    },
  });

  const categories = useSelector((state) => state.getIn([reducerKey, 'categories']));
  const article = useSelector((state) => state.getIn([reducerKey, 'article']));
  const isSaveSuccess = useSelector((state) => state.getIn([reducerKey, 'isSaveSuccess']));

  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState(BlogStatus.Draft);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');

  useEffect(() => {
    dispatch(actions.fetchCategories());
  }, []);

  useEffect(() => {
    setName(_.get(article, 'name', ''));
    setContent(_.get(article, 'content', ''));

    const catValue = _.get(article, 'category', _.get(categories, '0'));
    const isCatMatch = _.includes(categories, catValue);
    if (isCatMatch === true) {
      setCategory(catValue);
    }

    const statusValue = _.get(article, 'status', BlogStatus.Draft);
    if (!_.isNil(BlogStatus[statusValue])) {
      setStatus(statusValue);
    }
    setLoading(false);
  }, [article]);

  useEffect(() => {
    setCategory(_.get(categories, '0'));
  }, [categories]);

  useEffect(() => {
    if (!_.isNil(id)) {
      setLoading(true);
      dispatch(actions.getArticleById(id));
    }
  }, [id]);

  useEffect(() => {
    if (isSaveSuccess === true) {
      handleHide(true);
    }
  }, [isSaveSuccess]);
  const onSaveArticle = () => {
    const data = {
      name,
      content,
      status,
      category,
    };
    if (!_.isNil(id)) {
      dispatch(actions.updateArticle({ ...data, _id: id }));
    } else {
      dispatch(actions.saveArticle(data));
    }

    setLoading(true);
  };

  const handleHide = (isNeedToRefresh) => {
    dispatch(actions.clearEditArticle());
    onHide(isNeedToRefresh);
  };

  return (
    <Modal show={show} onHide={handleHide} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>
          { _.isNil(id) ? 'Create' : 'Edit'}
          {' '}
          Blog
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group >
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              disabled={loading}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              { _.map(categories, (item) => (<option value={item}>{item}</option>))}
            </Form.Control>
          </Form.Group>
          <Form.Group >
            <Form.Label>Name (required)</Form.Label>
            <Form.Control
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxlength={250}
              disabled={loading}
            />
          </Form.Group>
          <Form.Group >
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={content}
              maxlength={1000}
              onChange={(e) => setContent(e.target.value)}
              disabled={loading}
            />
          </Form.Group>
          <Form.Group >
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              disabled={loading}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value={BlogStatus.Draft}>{BlogStatus.Draft}</option>
              <option value={BlogStatus.Published}>{BlogStatus.Published}</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onSaveArticle} disabled={loading || _.isEmpty(name)}>
          { _.isNil(id) ? 'Create' : 'Save'}
        </Button>
        <Button variant="secondary" onClick={handleHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BlogFormModal;
