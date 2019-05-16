import { loginUser } from './LoginButtonActions';
import API from '../../util/API/SoldinoAPI';
import { startInteraction, stopInteraction } from './FetchDataActions';

export function signUpUser(businessName, location, VATNumber, CE) {
  return function (dispatch) {
    dispatch(startInteraction('Registering your account to Soldino, please wait...'));
    API.users.registerBusinessOwner(businessName, location, VATNumber, CE)
      .then(() => {
        dispatch(stopInteraction());
        dispatch(loginUser());
      }, () => {
        dispatch(stopInteraction());
      });
  };
}
