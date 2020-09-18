import React from 'react';
import { Modal } from 'react-bootstrap';
import { fromJS } from 'immutable';
import { useSelector } from 'react-redux';
import { ActionType } from 'global-constants';
import useInjectReducer from 'hooks/useInjectReducer';
import './style.scss';

const LoaderMask = () => {
  const reducerKey = 'loadingMask';

  useInjectReducer({
    key: reducerKey,
    reducer: (
      state = fromJS({
        isShow: false,
      }),
      action
    ) => {
      switch (action.type) {
        case ActionType.SHOW_LOADING_MASK: {
          return state.set('isShow', action.payload === true);
        }
        default: {
          return state;
        }
      }
    },
  });

  const isShow = useSelector((state) => state.getIn([reducerKey, 'isShow']));

  return (
    <Modal
      show={isShow}
      dialogClassName="loader-mask-dialog"
      backdropClassName="loader-mark-backdrop"
      animation={false}
      onHide={() => {}}
    >
      <div className="text-center mask-loader">
        Loading...
      </div>
    </Modal>
  );
};

export default LoaderMask;
