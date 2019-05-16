import API from '../../util/API/SoldinoAPI';
import { startFetchData, stopFetchData } from './FetchDataActions';

export const GET_ORDERS_HISTORY = 'GET_ORDERS_HISTORY';

function setOrderHistory(bought, sold) {
  return {
    type: GET_ORDERS_HISTORY,
    payload: {
      purchase: bought,
      sell: sold,
    },
  };
}

export function getOrdersHistory() {
  return (dispatch) => {
    dispatch(startFetchData());
    return API.orders.getAllBuyerTransactions()
      .then(bought => API.orders.getAllSellerTransactions()
        .then((sold) => {
          console.log(bought);
          console.log(sold);
          dispatch(setOrderHistory(bought, sold));
          dispatch(stopFetchData());
          return true;
        }));
  };
}
