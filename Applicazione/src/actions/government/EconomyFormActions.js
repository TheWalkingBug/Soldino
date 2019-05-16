import API from '../../util/API/SoldinoAPI';
import {
  startFetchData, startInteraction, stopFetchData, stopInteraction,
} from '../public/FetchDataActions';

export const USER_UPDATED = 'USER_UPDATED';
export const GET_USERS_LIST = 'GET_USERS_LIST';

function userUpdated(user) {
  return {
    type: USER_UPDATED,
    payload: user,
  };
}

function fetchUsersList(usersData) {
  return {
    type: GET_USERS_LIST,
    payload: usersData,
  };
}

export function getUsersList() {
  return (dispatch) => {
    dispatch(startFetchData());
    return API.users.getAllCitizenData()
      .then(citizens => API.users.getAllConfirmedBusinessOwnersData()
        .then((businessOwners) => {
          dispatch(fetchUsersList({
            citizens,
            businessOwners,
          }));
          const retData = [];
          retData.push(citizens.map(citizen => citizen.address));
          retData.push(businessOwners.map(citizen => citizen.address));
          dispatch(stopFetchData());
          return retData;
        }));
  };
}

export function mintCubit(amount) {
  return function (dispatch) {
    dispatch(startInteraction('Minting Cubit, please wait...'));
    API.cubit.mint(amount)
      .then(() => {
        API.init.getCurrentAccount()
          .then(currAccount => API.users.getUserBalance(currAccount)
            .then((balance) => {
              dispatch(stopInteraction());
              dispatch(
                userUpdated({ userType: 3, balance }),
              );
            }));
      }, () => {
        dispatch(stopInteraction());
      });
  };
}

export function distributeCubit(addresses, amount) {
  return function (dispatch) {
    dispatch(startInteraction('Distributing Cubit, please wait...'));
    API.cubit.distributeToUsers(addresses, amount)
      .then(() => {
        API.init.getCurrentAccount()
          .then(currAccount => API.users.getUserBalance(currAccount)
            .then((balance) => {
              dispatch(stopInteraction());
              dispatch(
                userUpdated({ userType: 3, balance }),
              );
            }));
      }, () => {
        dispatch(stopInteraction());
      });
  };
}
