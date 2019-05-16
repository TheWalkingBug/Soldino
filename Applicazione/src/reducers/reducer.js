import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userReducer from './userReducer';
import web3Reducer from './web3Reducer';
import contractsReducer from './contractsReducer';
import cartReducer from './public/cartReducer';
import searchReducer from './public/searchReducer';
import businessReducer from './business/businessReducer';
import governmentReducer from './government/governmentReducer';
import fetchDataReducer from './public/fetchDataReducer';
import ordersReducer from './public/ordersReducer';

const combinedReducers = combineReducers({
  routing: routerReducer,
  user: userReducer,
  web3: web3Reducer,
  contracts: contractsReducer,
  cart: cartReducer,
  search: searchReducer,
  business: businessReducer,
  government: governmentReducer,
  fetchData: fetchDataReducer,
  orders: ordersReducer,
});

const reducer = (state, action) => {
  if (action.type === 'RESET_STATE') {
    const {
      web3,
      contracts,
      routing,
    } = state;
    return combinedReducers({
      web3,
      contracts,
      routing,
      user: null,
      cart: null,
      search: null,
      business: null,
      government: null,
      fetchData: null,
      orders: null,
    }, action);
  }
  return combinedReducers(state, action);
};

export default reducer;
