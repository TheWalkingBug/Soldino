import { browserHistory } from 'react-router';

export const RESET_STATE = 'RESET_STATE';
function resetState() {
  return {
    type: RESET_STATE,
  };
}

export function logoutUser() {
  return (dispatch) => {
    // Logout user.
    dispatch(resetState());

    // Redirect home.
    return browserHistory.push('/');
  };
}
