const initialState = {
  result: null,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_PRODUCTS':
      return {
        result: action.payload,
      };
    case 'CLEAR_SEARCH':
      return {
        result: action.payload,
      };
    default:
      return {
        ...state,
        result: state ? state.result : null,
      };
  }
};

export default searchReducer;
