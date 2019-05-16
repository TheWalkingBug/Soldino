import React from 'react';
import {shallow} from 'enzyme';

const chai = require('chai');
should = chai.should();

import VATLedger from '../../../components/business/VATLedger';
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

describe('<VATLedger />', () => {
  const wrapper = shallow(<VATLedger location={{
    action: "PUSH",
    hash: "",
    key: "okkdnr",
    pathname: "/profile/VATLedger",
    query: null,
    search: "",
    state: {
      purchase: [],
      sell: []
    }
  }} getOrdersHistory={() => {
    return true;
  }} OrdersHistory={{
    purchase: null,
    sell: null
  }}/>);

  it('renders two <Button /> components', () => {
    wrapper.find(Button).should.have.lengthOf(2);
  });

  it('renders two <Table /> components if there are VAT transactions', () => {
    wrapper.find(Table).should.have.lengthOf(2);
  });

});