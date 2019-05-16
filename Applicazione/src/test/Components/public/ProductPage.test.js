import React from 'react';
import { shallow } from 'enzyme';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ProductPage from '../../../components/public/ProductPage';

const chai = require('chai');

should = chai.should();

describe('<ProductPage />', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      addToCart: () => true,
      location: {
        action: 'PUSH',
        hash: '',
        key: '6sjy84',
        pathname: '/product/0',
        query: {},
        search: '',
        state: {
          VAT: '22',
          availability: '1',
          deleted: false,
          description: 'testDescription',
          id: '0',
          imagePreview: 'testProductImage',
          name: 'testProduct',
          owner: '0x19e070BCb62E3CD1bC981886E7c151cEeCd88e64',
          price: 100,
        },
      },
    };

    wrapper = shallow(<ProductPage {...props} />);
  });

  it('renders three <Button /> components', () => {
    wrapper.find(Button).should.have.lengthOf(4);
  });

  it('renders a <Card /> component', () => {
    wrapper.find(Card).should.have.lengthOf(1);
  });
});
