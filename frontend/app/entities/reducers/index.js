import { fromJS } from 'immutable';
const initialState = fromJS({
  isLoading: false,
});

export default (state = initialState) => state;
