const initialState = {
  orders: null,
};

const citizenReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ORDERS_HISTORY_CITIZEN':
      return {
        orders: action.payload,
      };
    default:
      return state;
  }
};

export default citizenReducer;
