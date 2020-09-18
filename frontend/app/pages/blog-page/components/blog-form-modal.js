import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import _ from 'lodash';
import { BlogStatus } from "../constants";
import {useDispatch, useSelector} from "react-redux";
import * as actions from '../actions';
import useInjectReducer from "../../../hooks/useInjectReducer";
import {fromJS} from "immutable";
import {ActionType} from "../../../global-constants";

const BlogFormModal = ({show, onHide, id}) => {
  const dispatch = useDispatch();

  const reducerKey = 'blogForm';

  useInjectReducer({
    key: reducerKey,
    reducer: (
      state = fromJS({
        categories: [],
      }),
      action
    ) => {
      switch (action.type) {
        case ActionType.FETCH_CATEGORY_SUCCESS:
          return state.set('categories', action.payload);
        default:
          return state;
      }
    },
  });

  const categories = useSelector((state) => state.getIn([reducerKey, 'categories']));

  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState(BlogStatus.Draft);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');

  useEffect(()=> {
    dispatch(actions.fetchCategories());
  }, []);

  useEffect(() => {
    setCategory(_.get(categories, '0'));
  }, [categories])

  useEffect(()=> {
    if (!_.isNil(id)) {

    }
  }, [id]);

  const onSaveArticle = () => {
    const data = {
      name,
      content,
      status,
    };

    dispatch(actions.saveArticle(data));
    setLoading(true);
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          { _.isNil(id) ? 'Create' : 'Edit'} Blog
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
              onChange={e => setCategory(e.target.value)}
            >
              { _.map(categories, category => (<option value={category}>{category}</option>))}
            </Form.Control>
          </Form.Group>
          <Form.Group >
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
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
              onChange={e => setContent(e.target.value)}
              disabled={loading}
            />
          </Form.Group>
          <Form.Group >
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              disabled={loading}
              value={status}
              onChange={e => setStatus(e.target.value)}
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
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BlogFormModal;
