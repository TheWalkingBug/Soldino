const initialState = {
  purchase: null,
  sell: null,
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ORDERS_HISTORY':
      return {
        purchase: action.payload.purchase,
        sell: action.payload.sell,
      };

    default:
      return {
        ...state,
        purchase: state ? state.purchase : null,
        sell: state ? state.sell : null,
      };
  }
};

export default ordersReducer;
