import SoldinoAPI from '../../util/API/SoldinoAPI';
import {
  startFetchData, startInteraction, stopFetchData, stopInteraction,
} from '../public/FetchDataActions';

export const GET_BUSINESS_INFO = 'GET_BUSINESS_INFO';
export const ACCEPT_BUSINESS = 'ACCEPT_BUSINESS';
export const REJECT_BUSINESS = 'REJECT_BUSINESS';
export const REMOVE_BUSINESS = 'REMOVE_BUSINESS';

function setBusinessInfo(info) {
  return {
    type: GET_BUSINESS_INFO,
    payload: info,
  };
}

function acceptedBusiness() {
  return {
    type: ACCEPT_BUSINESS,
  };
}

function removedBusiness() {
  return {
    type: REMOVE_BUSINESS,
  };
}

export const getBusinessInfo = confirmed => function (dispatch) {
  dispatch(startFetchData());
  SoldinoAPI.users.getAllBusinessData()
    .then((result) => {
      dispatch(setBusinessInfo(result
        .filter(business => (confirmed ? business.confirmed !== '0' : business.confirmed === '0'))));
      dispatch(stopFetchData());
    });
};

export function acceptBusiness(address) {
  return function (dispatch) {
    dispatch(startInteraction('Accepting business, please wait...'));
    SoldinoAPI.users.confirmBusinessOwner(address).then(() => {
      dispatch(acceptedBusiness());
      dispatch(stopInteraction());
      dispatch(getBusinessInfo(false));
    }, () => {
      dispatch(stopInteraction());
    });
  };
}

export function removeBusiness(address) {
  return function (dispatch) {
    dispatch(startInteraction('Removing business, please wait...'));
    SoldinoAPI.users.removeBusinessOwner(address).then(() => {
      dispatch(removedBusiness());
      dispatch(stopInteraction());
      dispatch(getBusinessInfo(true));
    }, () => {
      dispatch(stopInteraction());
    });
  };
}

export function rejectBusiness(address) {
  return function (dispatch) {
    dispatch(startInteraction('Rejecting business, please wait...'));
    SoldinoAPI.users.removeBusinessOwner(address).then(() => {
      dispatch(removedBusiness());
      dispatch(stopInteraction());
      dispatch(getBusinessInfo(false));
    }, () => {
      dispatch(stopInteraction());
    });
  };
}
