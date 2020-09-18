import { Button, Modal } from 'react-bootstrap';
import _ from 'lodash';
import React from 'react';
import useInjectReducer from "../../../hooks/useInjectReducer";
import {fromJS} from "immutable";
import {ActionType} from "../../../global-constants";

const BlogDeleteModal = ({show, onHide, articleList, id}) => {

  const reducerKey = 'blogDeletion';

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
        default:
          return state;
      }
    },
  });

  return  (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Article</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure to delete
        <span className="delete-article-name">
        { _.get(_.find(articleList, { _id: id }), 'name') }
      </span>
        ?
      </Modal.Body>
      <Modal.Footer>

        <Button variant="primary" onClick={onHide}>
          Delete
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BlogDeleteModal;
