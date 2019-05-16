import configureStore from 'redux-mock-store';

// Actions to be tested
import * as CartActions from "../../../actions/public/CartActions";

const mockStore = configureStore();
const store = mockStore();

const chai = require('chai');
should = chai.should();

describe('CartActions', () => {

  beforeEach(() => {
    store.clearActions();
  });

  test('Dispatches the addToCart action with correct payload', () => {
    const expectedActions = [
      {
        'payload': {
          name: "testProduct",
          availability: "1",
          VAT: "22",
          description: "testDescription",
          price: 100,
          imagePreview: "testProductImage"
        },
        'type': 'ADD_TO_CART',
      },
    ];

    store.dispatch(CartActions.addToCart(
      {
        name: "testProduct",
        availability: "1",
        VAT: "22",
        description: "testDescription",
        price: 100,
        imagePreview: "testProductImage"
      }
    ));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('Dispatches the userUpdated action with correct payload', () => {
    const expectedActions = [
      {
        'payload': {
          CE: "testEMail@gmail.com",
          VATNumber: "12345678901",
          address: "0x19e070BCb62E3CD1bC981886E7c151cEeCd88e64",
          balance: "0.00",
          businessName: "testBusinessName",
          confirmed: "1557220910",
          location: "testLocation",
          userType: 2
        },
        'type': 'USER_UPDATED',
      },
    ];

    store.dispatch(CartActions.userUpdated(
      {
        CE: "testEMail@gmail.com",
        VATNumber: "12345678901",
        address: "0x19e070BCb62E3CD1bC981886E7c151cEeCd88e64",
        balance: "0.00",
        businessName: "testBusinessName",
        confirmed: "1557220910",
        location: "testLocation",
        userType: 2
      }
    ));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('Dispatches the removeItem action with correct payload', () => {
    const expectedActions = [
      {
        'payload': {
          id: 0
        },
        'type': 'REMOVE_ITEM',
      },
    ];

    store.dispatch(CartActions.removeItem({
      id: 0
    }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('Dispatches the subtractQuantity action with correct payload', () => {
    const expectedActions = [
      {
        'payload': {
          id: 0
        },
        'type': 'SUB_QUANTITY',
      },
    ];

    store.dispatch(CartActions.subtractQuantity({
      id: 0
    }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('Dispatches the addQuantity action with correct payload', () => {
    const expectedActions = [
      {
        'payload': {
          id: 0
        },
        'type': 'ADD_QUANTITY',
      },
    ];

    store.dispatch(CartActions.addQuantity({
      id: 0
    }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('Dispatches the clearCart action with correct payload', () => {
    const expectedActions = [
      {
        'type': 'CLEAR_CART',
      },
    ];

    store.dispatch(CartActions.clearCart());
    expect(store.getActions()).toEqual(expectedActions);
  });

})
;