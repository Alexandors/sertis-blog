import { combineReducers } from 'redux-immutable';
import * as reducers from 'entities/reducers';
import * as sharedReducers from 'shared/reducers';
import { reducer as formReducer } from 'redux-form/immutable';

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    form: formReducer,
    ...reducers,
    ...sharedReducers,
    ...injectedReducers,
  });
  return rootReducer;
}
