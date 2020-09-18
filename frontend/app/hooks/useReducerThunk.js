import { useReducer } from 'react';

export default (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const dispatchThunk = (action) => {
    if (typeof action === 'function') {
      action(dispatch);
    } else {
      dispatch(action);
    }
  };

  return [state, dispatchThunk];
};
