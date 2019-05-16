const initialState = {
  ordersPurchase: null,
  ordersSell: null,
  productsList: null,
  currentQuarterAssessment: null,
  VATHistory: null,
};

const businessReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ORDERS_HISTORY_BUSINESS':
      return {
        ...state,
        ordersPurchase: action.payload.purchase,
        ordersSell: action.payload.sell,
      };
    case 'GET_PRODUCTS_LIST':
      return {
        ...state,
        productsList: action.payload,
      };
    case 'GET_CURRENT_QUARTER_ASSESSMENT':
      return {
        ...state,
        currentQuarterAssessment: action.payload,
      };
    case 'GET_VAT_HISTORY':
      return {
        ...state,
        VATHistory: action.payload,
      };
    case 'PAY_VAT':
      return {
        ...state,
      };
    case 'ADD_PRODUCT':
      return {
        ...state,
      };
    case 'MODIFY_PRODUCT':
      return {
        ...state,
      };
    case 'REMOVE_PRODUCT':
      return {
        ...state,
      };
    default:
      return {
        ...state,
        ordersPurchase: state ? state.ordersPurchase : null,
        ordersSell: state ? state.ordersSell : null,
        productsList: state ? state.productsList : null,
        currentQuarterAssessment: state ? state.currentQuarterAssessment : null,
        VATHistory: state ? state.VATHistory : null,
      };
  }
};

export default businessReducer;
