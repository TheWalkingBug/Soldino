const initialState = {
  data: null,
  type: 0,
};

const userReducer = (state = initialState, action) => {
  if (action.type === 'USER_LOGGED_IN' || action.type === 'USER_UPDATED') {
    return Object.assign({}, state, {
      data: action.payload,
      type: action.payload.userType,
    });
  }

  if (action.type === 'USER_LOGGED_OUT') {
    return Object.assign({}, state, {
      data: null,
      type: 0,
    });
  }

  return {
    ...state,
    data: state ? state.data : null,
    type: state ? state.type : 0,
  };
};

export default userReducer;
