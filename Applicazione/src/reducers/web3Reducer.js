const initialState = {
  web3Instance: null,
  account: null,
};

const web3Reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'WEB3_INITIALIZED':
      return {
        ...state,
        web3Instance: action.payload.web3Instance,
        account: action.payload.account,
      };
    case 'WEB3_ACCOUNT_CHANGED':
      return {
        ...state,
        account: action.payload,
      };
    default: return state;
  }
};

export default web3Reducer;
