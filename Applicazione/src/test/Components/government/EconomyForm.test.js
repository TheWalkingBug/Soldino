import React from "react";
import {shallow} from 'enzyme';

const chai = require('chai');
should = chai.should();

import EconomyForm from '../../../components/government/EconomyForm';
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form";

describe('<EconomyForm />', () => {
  const wrapper = shallow(<EconomyForm
    isLoading={false}
    getUsersList={() => {
      return true;
    }} onDistributeFormSubmit={() => {
    return true;
  }} onMintFormSubmit={() => {
    return true;
  }}
    users={{
      citizens: [],
      businessOwners: [{
        CE: "testEMail@gmail.com",
        VATNumber: "12345678901",
        address: "0x19e070BCb62E3CD1bC981886E7c151cEeCd88e64",
        balance: "0.00",
        businessName: "testBusinessName",
        confirmed: "1557220910",
        location: "testLocation",
        userType: 2
      }]
    }}/>);

  it('renders two <Button /> components', () => {
    wrapper.find(Button).should.have.lengthOf(3);
  });

  it('renders two <Form.Control /> components', () => {
    wrapper.find(Form.Control).should.have.lengthOf(2);
  });

  it('renders a number of <Form.Check /> components equal to the number of registered users', () => {
    const usersNumber = wrapper.instance().props.users.citizens.length +
      wrapper.instance().props.users.businessOwners.length;
    wrapper.find(Form.Check).should.have.lengthOf(usersNumber + 1);
  });

});
