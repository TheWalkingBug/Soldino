import configureStore from 'redux-mock-store';

// Actions to be tested
import * as SearchActions from "../../../actions/public/SearchActions";

const mockStore = configureStore();
const store = mockStore();

const chai = require('chai');
should = chai.should();

describe('SearchActions', () => {

  beforeEach(() => {
    store.clearActions();
  });

  test('Dispatches the clearSearch action with the correct payload', () => {
    const expectedActions = [
      {
        'payload': null,
        'type': 'CLEAR_SEARCH',
      },
    ];

    store.dispatch(SearchActions.clearSearch());
    expect(store.getActions()).toEqual(expectedActions);
  });

});