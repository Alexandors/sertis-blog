import { renderHook, act } from '@testing-library/react-hooks';
import useReducerThunk from './useReducerThunk';

const mockReducer = (state, action) => {
  switch (action.type) {
    case 'increase':
      return state + 1;
    case 'decrease':
      return state - 1;
    default:
      return state;
  }
};

test('dispatch action object', () => {
  const { result } = renderHook(() => useReducerThunk(mockReducer, 0));
  const [state, dispatchThunk] = result.current;
  expect(state).toBe(0);
  act(() => {
    dispatchThunk({
      type: 'increase',
    });
  });
  expect(result.current[0]).toBe(1);

  act(() => {
    dispatchThunk({
      type: 'decrease',
    });
  });

  expect(result.current[0]).toBe(0);
});

test('dispatch action function', () => {
  const { result } = renderHook(() => useReducerThunk(mockReducer, 1));
  const [state, dispatchThunk] = result.current;
  expect(state).toBe(1);

  act(() => {
    dispatchThunk((dispatch) => {
      dispatch({
        type: 'increase',
      });
    });
  });
  expect(result.current[0]).toBe(2);

  act(() => {
    dispatchThunk((dispatch) => {
      dispatch({
        type: 'decrease',
      });
    });
  });
  expect(result.current[0]).toBe(1);
});
