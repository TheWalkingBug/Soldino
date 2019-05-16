import API from '../../util/API/SoldinoAPI';
import {
  startFetchData, startInteraction, stopFetchData, stopInteraction,
} from '../public/FetchDataActions';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const MODIFY_PRODUCT = 'MODIFY_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const GET_PRODUCTS_LIST = 'GET_PRODUCTS_LIST';


function returnProductList(products) {
  return {
    type: GET_PRODUCTS_LIST,
    payload: products,
  };
}

export function getProductsList() {
  return function (dispatch) {
    dispatch(startFetchData());
    API.products.getAllOwnersProductsData().then((products) => {
      dispatch(returnProductList(products.filter(item => item !== null && item.deleted === false)));
      dispatch(stopFetchData());
    });
  };
}

function removedProduct() {
  return {
    type: REMOVE_PRODUCT,
  };
}

export function removeProduct(id) {
  return function (dispatch) {
    dispatch(startInteraction('Removing the product, please wait...'));
    API.products.deleteProduct(id).then(() => {
      dispatch(removedProduct());
      dispatch(stopInteraction());
      dispatch(getProductsList());
    }, () => {
      dispatch(stopInteraction());
    });
  };
}

function productAdded(productInfo) {
  return {
    type: ADD_PRODUCT,
    payload: productInfo,
  };
}

function productModified(productInfo) {
  return {
    type: MODIFY_PRODUCT,
    payload: productInfo,
  };
}

export function addProduct(productInfo) {
  return function (dispatch) {
    dispatch(startInteraction('Adding the product, please wait...'));
    API.products.addProduct(productInfo).then(() => {
      dispatch(productAdded(productInfo));
      dispatch(stopInteraction());
    }, () => {
      dispatch(stopInteraction());
    });
  };
}

export function modifyProduct(productInfo) {
  return function (dispatch) {
    dispatch(startInteraction('Modifying the product, please wait...'));
    API.products.editProduct(productInfo).then(() => {
      dispatch(productModified(productInfo));
      dispatch(stopInteraction());
    }, () => {
      dispatch(stopInteraction());
    });
  };
}
