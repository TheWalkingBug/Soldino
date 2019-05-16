import {
  startFetchData, startInteraction, stopFetchData, stopInteraction,
} from '../public/FetchDataActions';
import API from '../../util/API/SoldinoAPI';
import { userUpdated } from '../public/CartActions';

export const PAY_VAT = 'PAY_VAT';
export const GET_VAT_HISTORY = 'GET_VAT_HISTORY';

function setVatHistory(data) {
  return {
    type: GET_VAT_HISTORY,
    payload: data,
  };
}

export function getVATHistory(address = null) {
  return (dispatch) => {
    dispatch(startFetchData());
    API.vat.getBusinessOwnerVATHistory(address).then((history) => {
      console.log(history);
      dispatch(setVatHistory(history));
      dispatch(stopFetchData());
    });
  };
}

export function payVAT(item, address = null) {
  return (dispatch) => {
    dispatch(startInteraction('Paying VAT, please wait...'));
    if (item.status.status === 'ToPay') {
      API.vat.payVATToGovernment(item.year, item.quarter, item.status.amount).then(() => {
        dispatch(getVATHistory());
        API.users.login().then((result) => {
          dispatch(userUpdated(result));
        });
        dispatch(stopInteraction());
      }, () => {
        dispatch(stopInteraction());
      });
    } else if (item.status.status === 'ToReceive') {
      API.vat.payVATToBusinessOwner(item.year, item.quarter, address, item.status.amount)
        .then(() => {
          dispatch(getVATHistory());
          API.users.login().then((result) => {
            dispatch(userUpdated(result));
          });
          dispatch(stopInteraction());
        }, () => {
          dispatch(stopInteraction());
        });
    }
  };
}

export function refuseVAT(item) {
  return (dispatch) => {
    dispatch(startInteraction('Refusing VAT payment, please wait...'));
    if (item.status.status === 'ToPay') {
      API.vat.refuseVAT(item.year, item.quarter)
        .then(() => {
          dispatch(getVATHistory());
          API.users.login().then((result) => {
            dispatch(userUpdated(result));
          });
          dispatch(stopInteraction());
        }, () => {
          dispatch(stopInteraction());
        });
    }
  };
}
