import React from 'react';
import {shallow} from 'enzyme';

const chai = require('chai');
should = chai.should();

import OrdersHistory from '../../../components/citizen/OrdersHistory';
import AlertMessage from '../../../components/public/AlertMessage';
import Table from "react-bootstrap/Table";

describe('<OrdersHistory />', () => {
  const wrapper = shallow(<OrdersHistory getOrdersHistory={() => {
    return true;
  }}
                                            ordersHistoryData={[{
                                              id: 1,
                                              date: "01/01/1995",
                                              total: 1,
                                              products: "testProduct",
                                              quantities: 1,
                                              seller: "testBusiness",
                                            }]}/>);

  it('renders a <Table > component if there are orders', () => {
    if (wrapper.props().ordersHistoryData === null)
      wrapper.find(Table).should.have.lengthOf(0);
    else
      wrapper.find(Table).should.have.lengthOf(1);
  });

  it('renders an <AlertMessage /> component if there are no orders', () => {
    if (wrapper.props().ordersHistoryData === null)
      wrapper.should.contain(AlertMessage);
  });
});