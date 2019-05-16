import { browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import promise from 'redux-promise-middleware';
import reducer from './reducers/reducer';


// Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const routingMiddleware = routerMiddleware(browserHistory);

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunkMiddleware, routingMiddleware, promise)),
);

export default store;
