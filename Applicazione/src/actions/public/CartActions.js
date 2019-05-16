import API from '../../util/API/SoldinoAPI';
import { clearSearch } from './SearchActions';
import { startInteraction, stopInteraction } from './FetchDataActions';

export const ADD_TO_CART = 'ADD_TO_CART';
export const USER_UPDATED = 'USER_UPDATED';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const SUB_QUANTITY = 'SUB_QUANTITY';
export const ADD_QUANTITY = 'ADD_QUANTITY';
export const BUY = 'BUY';
export const CLEAR_CART = 'CLEAR_CART';

export const addToCart = item => ({
  type: ADD_TO_CART,
  payload: item,
});

export const userUpdated = user => ({
  type: USER_UPDATED,
  payload: user,
});

export const removeItem = id => ({
  type: REMOVE_ITEM,
  payload: id,
});

export const subtractQuantity = id => ({
  type: SUB_QUANTITY,
  payload: id,
});

export const addQuantity = id => ({
  type: ADD_QUANTITY,
  payload: id,
});

function productBought(result) {
  return {
    type: BUY,
    payload: result,
  };
}

export const clearCart = () => ({
  type: CLEAR_CART,
});

export function buyCart(cart) {
  return (dispatch) => {
    dispatch(startInteraction('Processing your order, please wait...'));
    API.products.buyProducts(cart).then(() => {
      dispatch(productBought(0));
      dispatch(clearCart());
      dispatch(clearSearch());
      API.users.login().then((result) => {
        dispatch(userUpdated(result));
        dispatch(stopInteraction());
      });
    }, (err) => {
      dispatch(productBought(err));
      dispatch(stopInteraction());
    });
  };
}
