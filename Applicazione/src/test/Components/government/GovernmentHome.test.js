import React from "react";
import {shallow} from 'enzyme';

const chai = require('chai');
should = chai.should();

import GovernmentHome from '../../../components/government/GovernmentHome';
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card";

describe('<GovernmentHome />', () => {
  const wrapper = shallow(<GovernmentHome authData={{
    balance: "100"
  }
  }/>);

  it('renders two <Card /> components', () => {
    wrapper.find(Card).should.have.lengthOf(2);
  });

  it('renders two <Button /> components', () => {
    wrapper.find(Button).should.have.lengthOf(4);
  });

});