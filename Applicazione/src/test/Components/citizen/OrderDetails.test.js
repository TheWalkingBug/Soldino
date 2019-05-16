import React from 'react';
import {shallow} from 'enzyme';

const chai = require('chai');
should = chai.should();

import OrderDetails from '../../../components/citizen/OrderDetails';
import AlertMessage from '../../../components/public/AlertMessage';
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

describe('<OrderDetails />', () => {
  const wrapper = shallow(<OrderDetails location={{
    action: "PUSH",
    hash: "",
    key: "nxbiq2",
    pathname: "/testOrderDetailsPage",
    query: {},
    search: "",
    state: {
      buyer: "testUser",
      date: "Mon May 06 2019",
      id: "0",
      orderType: "1",
      products: [{
        VAT: "22",
        availability: "1",
        deleted: false,
        description: "testDescription",
        id: "0",
        imagePreview: "testProductImage",
        name: "testProduct",
        owner: "0x19e070BCb62E3CD1bC981886E7c151cEeCd88e64",
        price: 100
      }],
      quantities: ["1"],
      total: 100
    }
  }}/>);

  it('renders a <Table > component with order details', () => {
    wrapper.find(Table).should.have.lengthOf(1);
  });

  it('renders two <Button /> components', () => {
    wrapper.find(Button).should.have.lengthOf(2);
  });

  it('renders an <AlertMessage /> component if the page is accessed directly from the URL', () => {
    if (wrapper.instance().props.location.state === undefined)
      wrapper.should.contain(AlertMessage);
  });

});