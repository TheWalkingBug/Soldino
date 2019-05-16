import { browserHistory } from 'react-router';
import API from '../../util/API/SoldinoAPI';

export const USER_LOGGED_IN = 'USER_LOGGED_IN';
function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user,
  };
}

export function loginUser() {
  return (dispatch) => {
    API.users.login().then((result) => {
      console.log(result);
      dispatch(userLoggedIn(result));

      const currentLocation = browserHistory.getCurrentLocation();

      if ('redirect' in currentLocation.query) {
        return browserHistory.push(
          decodeURIComponent(currentLocation.query.redirect),
        );
      }
      return browserHistory.push('/profile');
    }, (err) => { console.log(err); });
  };
}
