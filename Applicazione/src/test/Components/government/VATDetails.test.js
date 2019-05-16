import React from "react";
import {shallow} from 'enzyme';

const chai = require('chai');
should = chai.should();

import VATDetails from '../../../components/government/VATDetails';
import Button from "react-bootstrap/Button"
import Table from "react-bootstrap/Table";
import AlertMessage from '../../../components/public/AlertMessage';

describe('<VATDetails />', () => {
  const wrapper = shallow(<VATDetails
    getVATHistory={() => {
      return true;
    }}
    payVAT={() => {
      return true;
    }}
    VATHistory={[{
      quarter: 2,
      status: {
        status: "NotNecessary"
      }
    }]}
    location={{state: "0x19e070BCb62E3CD1bC981886E7c151cEeCd88e64"}}
  />);

  it('renders a <Button /> component plus one for every VAT transaction of the business', () => {
    const transactionsNumber = wrapper.instance().props.VATHistory.length;
    wrapper.find(Button).should.have.lengthOf(1 + transactionsNumber);
  });

  it('renders a <Table /> component if there are VAT transaction of the business', () => {
    if (wrapper.instance().props.VATHistory.length !== 0)
      wrapper.find(Table).should.have.lengthOf(1);
  });

  it('renders an <AlertMessage /> component if there are no VAT transaction of the business', () => {
    if (wrapper.instance().props.VATHistory.length === 0)
      wrapper.find(AlertMessage).should.have.lengthOf(1);
  });

  it('renders an <AlertMessage /> component if the page is accessed directly from the URL', () => {
    if (wrapper.instance().props.location.state === undefined)
      wrapper.find(AlertMessage).should.have.lengthOf(1);
  });

});