import React from 'react';
import { shallow } from 'enzyme';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Cart from '../../../components/public/Cart';
import AlertMessage from '../../../components/public/AlertMessage';

const chai = require('chai');

should = chai.should();

describe('<Cart />', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      addQuantity: () => true,
      subtractQuantity: () => true,
      buy: () => true,
      removeItem: () => true,
      userType: 1,
      userData: {
        CE: 'testEMail@gmail.com',
        VATNumber: '12345678901',
        address: '0x19e070BCb62E3CD1bC981886E7c151cEeCd88e64',
        balance: '0.00',
        businessName: 'testBusinessName',
        confirmed: '1557220910',
        location: 'testLocation',
        userType: 2,
      },
      items: [{
        VAT: '22',
        availability: '1',
        deleted: false,
        description: 'testDescription',
        id: '0',
        imagePreview: 'testProductImage',
        name: 'testProduct',
        owner: '0x19e070BCb62E3CD1bC981886E7c151cEeCd88e64',
        price: 100,
        quantity: 1,
      }],
      total: 100,
    };

    wrapper = shallow(<Cart {...props} />);
  });

  it('renders a <Button /> component plus three for every item in the cart, or no <Button /> component'
    + 'if there are no items', () => {
    const itemsNumber = props.items.length;
    if (itemsNumber !== 0) wrapper.find(Button).should.have.lengthOf(1 + (itemsNumber * 3));
    else wrapper.find(Button).should.have.lengthOf(0);
  });

  it('renders a <Card /> component for each item in the cart', () => {
    const itemsNumber = props.items.length;
    if (itemsNumber !== 0) wrapper.find(Card).should.have.lengthOf(itemsNumber);
    else wrapper.find(Card).should.have.lengthOf(0);
  });

  it('renders an <AlertMessage /> component if the user does not have enough Cubit to place the order'
    + 'or if there are no items in the cart', () => {
    if (props.userData.balance < props.total
      || wrapper.instance().props.items.length === 0) wrapper.find(AlertMessage).should.have.lengthOf(1);
  });

  it('renders an <AlertMessage /> component if the user is not logged in, two if there also are no items'
    + 'in the cart', () => {
    if (props.userType === 0) {
      if (props.items.length === 0) wrapper.find(AlertMessage).should.have.lengthOf(2);
      else wrapper.find(AlertMessage).should.have.lengthOf(1);
    }
  });
});
