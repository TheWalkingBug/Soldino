import configureStore from 'redux-mock-store';

// Actions to be tested
import * as FetchDataActions from "../../../actions/public/FetchDataActions";

const mockStore = configureStore();
const store = mockStore();

const chai = require('chai');
should = chai.should();

describe('FetchDataActions', () => {

  beforeEach(() => {
    store.clearActions();
  });

  test('Dispatches the startFetchData action', () => {
    const expectedActions = [
      {
        'type': 'START_FETCH_DATA',
      },
    ];

    store.dispatch(FetchDataActions.startFetchData());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('Dispatches the stopFetchData action', () => {
    const expectedActions = [
      {
        'type': 'STOP_FETCH_DATA',
      },
    ];

    store.dispatch(FetchDataActions.stopFetchData());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('Dispatches the startInteraction action with the correct payload', () => {
    const expectedActions = [
      {
        'payload': "testMessage",
        'type': 'START_INTERACTION',
      },
    ];

    store.dispatch(FetchDataActions.startInteraction("testMessage"));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('Dispatches the stopInteraction action', () => {
    const expectedActions = [
      {
        'type': 'STOP_INTERACTION',
      },
    ];

    store.dispatch(FetchDataActions.stopInteraction());
    expect(store.getActions()).toEqual(expectedActions);
  });

});