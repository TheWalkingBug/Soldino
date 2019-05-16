import React from "react";
import {shallow} from 'enzyme';

const chai = require('chai');
should = chai.should();

import GovernmentFinancial from '../../../components/government/GovernmentFinancial';
import Button from "react-bootstrap/Button"
import Table from "react-bootstrap/Table";
import AlertMessage from '../../../components/public/AlertMessage';

describe('<GovernmentFinancial />', () => {
  const wrapper = shallow(<GovernmentFinancial
    getBusinessInfo={() => {
      return true;
    }}
    removeBusiness={() => {
      return true;
    }}
    businessInfo={[{
      CE: "testEMail@gmail.com",
      VATNumber: "12345678901",
      address: "0x19e070BCb62E3CD1bC981886E7c151cEeCd88e64",
      balance: "0.00",
      businessName: "testBusinessName",
      confirmed: "1557220910",
      location: "testLocation",
      userType: 2
    }]}
  />);

  it('renders a <Button /> component plus one for every business registered to the platform', () => {
    const businessesNumber = wrapper.instance().props.businessInfo.length;
    wrapper.find(Button).should.have.lengthOf(1 + businessesNumber);
  });

  it('renders a <Table /> component if there are businesses registered to the platform', () => {
    if (wrapper.instance().props.businessInfo.length !== 0)
      wrapper.find(Table).should.have.lengthOf(1);
  });

  it('renders an <AlertMessage /> component if there are no businesses registered to the platform', () => {
    if (wrapper.instance().props.businessInfo.length === 0)
      wrapper.find(AlertMessage).should.have.lengthOf(1);
  });

});