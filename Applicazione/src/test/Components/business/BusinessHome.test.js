import React from "react";
import {shallow} from 'enzyme';

const chai = require('chai');
should = chai.should();

import BusinessHome from '../../../components/business/BusinessHome';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

describe('<BusinessHome />', () => {
  const wrapper = shallow(<BusinessHome authData={{
    businessName: "testBusiness",
    location: "testLocation",
    VATNumber: "IT000000000",
    CE: "testCE@gmail.com",
    balance: "100",
    confirmed: 1
  }
  }/>);

  it('renders two <Card /> components', () => {
    wrapper.find(Card).should.have.lengthOf(2);
  });

  it('renders two <Button /> components', () => {
    wrapper.find(Button).should.have.lengthOf(3);
  });

});