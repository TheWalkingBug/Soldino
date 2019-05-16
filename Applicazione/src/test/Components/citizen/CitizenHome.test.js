import React from "react";
import {shallow} from 'enzyme';

const chai = require('chai');
should = chai.should();

import CitizenHome from '../../../components/citizen/CitizenHome';
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card";

describe('<CitizenHome />', () => {
  const wrapper = shallow(<CitizenHome authData={{
    name: "testCitizen",
    surname: "testSurname",
    fiscalCode: "MRTMTT25D09F205Z",
    balance: "100"
  }
  }/>);

  it('renders two <Card /> components', () => {
    wrapper.find(Card).should.have.lengthOf(2);
  });

  it('renders two <Button /> components', () => {
    wrapper.find(Button).should.have.lengthOf(1);
  });

});