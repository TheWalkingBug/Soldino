import API from '../../util/API/SoldinoAPI';
import {startFetchData, stopFetchData} from "./FetchDataActions";

export const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS';
export const CLEAR_SEARCH = 'CLEAR_SEARCH';

function searchResult(result) {
  return {
    type: SEARCH_PRODUCTS,
    payload: result,
  };
}

function search(item, query) {
  const name = item.name.toLowerCase();
  const desc = item.description.toLowerCase();
  return (name.indexOf(query.toLowerCase()) !== -1) || (desc.indexOf(query.toLowerCase()) !== -1);
}

export function searchProducts(query) {
  return function (dispatch) {
    dispatch(startFetchData());
    if (query === '') {
      dispatch(searchResult([]));
      dispatch(stopFetchData());
    } else {
      API.products.getAllProductsData().then((items) => {
        const result = items.filter(item => search(item, query) && item.deleted === false);
        dispatch(searchResult(result));
        dispatch(stopFetchData());
      });
    }
  };
}

export function clearSearch() {
  const result = null;
  return {
    type: CLEAR_SEARCH,
    payload: result,
  };
}
