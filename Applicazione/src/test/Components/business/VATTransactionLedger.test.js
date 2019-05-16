import React from 'react';
import {shallow} from 'enzyme';

const chai = require('chai');
should = chai.should();

import VATTransactionLedger from '../../../components/business/VATTransactionLedger';
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

describe('<VATTransactionLedger />', () => {
  const wrapper = shallow(<VATTransactionLedger getOrdersHistory={() => {
    return true;
  }} getVATHistory={() => {
    return true;
  }} VATHistory={[{
    quarter: 1,
    year: 2019,
    status: {
      status: "Payed",
      transaction: {
        addressee: "0x0409d8EA8Fb40d2C4765246F25256719143b6EF7",
        addresser: "0x19e070BCb62E3CD1bC981886E7c151cEeCd88e64",
        amount: 13.2,
        date: "1556978727",
        id: "1",
        refused: false
      }
    }
  }]}/>);

  it('renders one <Button /> component', () => {
    wrapper.find(Button).should.have.lengthOf(1);
  });

  it('renders a <Table /> component', () => {
    wrapper.find(Table).should.have.lengthOf(1);
  });

});