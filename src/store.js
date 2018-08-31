import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';
const middlewares = [thunk];

if (__DEV__) {
  middlewares.push(logger);
}
const middleware = applyMiddleware(...middlewares);
const store = createStore(rootReducer, middleware);
export default store;
