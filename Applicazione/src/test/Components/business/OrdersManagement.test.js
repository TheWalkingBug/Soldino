import React from 'react';
import {shallow} from 'enzyme';

const chai = require('chai');
should = chai.should();

import OrdersManagement from '../../../components/business/OrdersManagement';
import AlertMessage from '../../../components/public/AlertMessage';
import {
  Table, Button, Tabs, Tab,
} from 'react-bootstrap';

describe('<OrdersManagement />', () => {
  const wrapper = shallow(<OrdersManagement getOrdersHistory={() => {
    return true;
  }}
                                            ordersHistoryDataPurchase={[{
                                              orderType: '0',
                                              id: 1,
                                              date: "01/01/1995",
                                              total: 1,
                                              products: "testProduct",
                                              quantities: 1,
                                              seller: "testBusiness",
                                            }]}
                                            ordersHistoryDataSell={[{
                                              orderType: '0',
                                              id: 1,
                                              date: "01/01/1995",
                                              total: 1,
                                              products: "testProduct",
                                              quantities: 1,
                                              seller: "testBusiness",
                                            }]}/>);

  it('renders a <Button /> component', () => {
    wrapper.find(Button).first().should.have.lengthOf(1);
  });

  it('renders a <Tabs /> component', () => {
    wrapper.find(Tabs).should.have.lengthOf(1);
  });

  it('renders two <Tab /> components', () => {
    wrapper.find(Tab).should.have.lengthOf(2);
  });

  it('renders a <Table > component for purchases and/or sells', () => {
    if (wrapper.instance().props.ordersHistoryDataPurchase === null) {
      if (wrapper.instance().props.ordersHistoryDataSell === null)
        wrapper.find(Table).should.have.lengthOf(0);
      else
        wrapper.find(Table).should.have.lengthOf(1);
    }
    else {
      if (wrapper.instance().props.ordersHistoryDataSell === null)
        wrapper.find(Table).should.have.lengthOf(1);
      else
        wrapper.find(Table).should.have.lengthOf(2);
    }
  });

  it('renders an <AlertMessage /> component if there are no purchase orders and/or sell orders', () => {
    if (wrapper.props().ordersHistoryDataPurchase === null || wrapper.props().ordersHistoryDataSell === null)
      wrapper.should.contain(AlertMessage);
  });
});