const initialState = {
  isLoading: false,
  interactionLoading: false,
  loadingMessage: '',
};

const fetchDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'START_FETCH_DATA':
      return {
        ...state,
        isLoading: true,
      };
    case 'STOP_FETCH_DATA':
      return {
        ...state,
        isLoading: false,
      };
    case 'START_INTERACTION':
      return {
        ...state,
        interactionLoading: true,
        loadingMessage: action.payload,
      };
    case 'STOP_INTERACTION':
      return {
        ...state,
        interactionLoading: false,
        loadingMessage: '',
      };
    default:
      return {
        ...state,
        isLoading: state ? state.isLoading : false,
      };
  }
};

export default fetchDataReducer;
