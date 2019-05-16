const initialState = {
  orders: null,
  businessVATStatus: null,
  businessInfo: null,
  users: null,
};

const governmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ORDERS_HISTORY_GOVERNMENT':
      return {
        ...state,
        orders: action.payload,
      };

    case 'GET_BUSINESS_VAT_STATUS':
      return {
        ...state,
        businessVATStatus: action.payload,
      };
    case 'GET_USERS_LIST':
      return {
        ...state,
        users: action.payload,
      };
    case 'NOTIFY_LATE_PAYMENT':
      return {
        ...state,
      };

    case 'PAY_VAT_TAX_CREDIT':
      return {
        ...state,
      };
    case 'GET_BUSINESS_INFO':
      return {
        ...state,
        businessInfo: action.payload,
      };
    case 'ACCEPT_BUSINESS':
      return {
        ...state,
      };
    case 'REJECT_BUSINESS':
      return {
        ...state,
      };
    case 'REMOVE_BUSINESS':
      return {
        ...state,
      };
    default:
      return {
        ...state,
        orders: state ? state.orders : null,
        businessVATStatus: state ? state.businessVATStatus : null,
        businessInfo: state ? state.businessInfo : null,
      };
  }
};

export default governmentReducer;
