import { combineReducers } from 'redux';
import doa from './doa';
const rootReducer = combineReducers({
  doa,
  // for now is just one reducer.
});
export default rootReducer;
