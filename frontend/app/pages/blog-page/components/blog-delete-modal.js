import { Button, Modal } from 'react-bootstrap';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import useInjectReducer from "../../../hooks/useInjectReducer";
import {fromJS} from "immutable";
import {ActionType} from "../../../global-constants";
import {useDispatch, useSelector} from "react-redux";
import * as actions from '../actions';

const BlogDeleteModal = ({show, onHide, articleList, id}) => {
  const dispatch = useDispatch();

  const reducerKey = 'blogDeletion';

  useInjectReducer({
    key: reducerKey,
    reducer: (
      state = fromJS({
        isDeleted: false,
      }),
      action
    ) => {
      switch (action.type) {
        case ActionType.DELETE_ARTICLE_SUCCESS:
          return state.set('isDeleted', true);
        case ActionType.CLEAR_DELETE_ARTICLE:
          return state.set('isDeleted', false);
        default:
          return state;
      }
    },
  });

  const isDeleted = useSelector((state) => state.getIn([reducerKey, 'isDeleted']));

  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (isDeleted === true) {
      dispatch(actions.clearDeleteArticle());
      setIsDisabled(false);
      onHide(true);
    }
  }, [isDeleted]);

  const onDelete = () => {
    setIsDisabled(true);
    dispatch(actions.deleteArticle(id));
  }

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

        <Button variant="primary" onClick={onDelete} disabled={isDisabled}>
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
