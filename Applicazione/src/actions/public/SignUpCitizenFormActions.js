import { loginUser } from './LoginButtonActions';
import API from '../../util/API/SoldinoAPI';
import { startInteraction, stopInteraction } from './FetchDataActions';

export function signUpUser(name, surname, fiscalCode, email) {
  return function (dispatch) {
    dispatch(startInteraction('Registering your account to Soldino, please wait...'));
    API.users.registerCitizen(name, surname, fiscalCode, email)
      .then(() => {
        dispatch(stopInteraction());
        dispatch(loginUser());
      }, () => {
        dispatch(stopInteraction());
      });
  };
}
