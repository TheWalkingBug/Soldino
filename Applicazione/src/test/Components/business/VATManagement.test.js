import React from 'react';
import { shallow } from 'enzyme';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import VATManagement from '../../../components/business/VATManagement';

const chai = require('chai');

should = chai.should();

describe('<VATManagement />', () => {
  const wrapper = shallow(<VATManagement
    isLoading={false}
    getVATHistory={() => true}
    VATHistory={[{
      quarter: 1,
      year: 2019,
      status: {
        status: 'Payed',
        transaction: {
          addressee: '0x0409d8EA8Fb40d2C4765246F25256719143b6EF7',
          addresser: '0x19e070BCb62E3CD1bC981886E7c151cEeCd88e64',
          amount: 13.2,
          date: '1556978727',
          id: '1',
          refused: false,
        },
      },
    }]}
    getOrdersHistory={() => true}
    OrdersHistory={{
      purchase: null,
      sell: null,
    }}
    payVAT={() => true}
    refuseVAT={() => true}
  />);
  it('renders the correct number of <Button /> components', () => {
    if (wrapper.instance().props.VATHistory === null) wrapper.find(Button).should.have.lengthOf(3);
    else {
      wrapper.instance().props.VATHistory.filter((quarter) => {
        const instance = quarter.status.status;
        let entryNumber = 0;
        if (instance === 'ToReceive' || instance === 'ToPay') ++entryNumber;
        wrapper.find(Button).should.have.lengthOf(3 + (entryNumber * 2));
      });
    }
  });

  it('renders two <Table /> components', () => {
    if (wrapper.instance().props.VATHistory === null) wrapper.find(Table).should.have.lengthOf(1);
    else {
      wrapper.instance().props.VATHistory.filter((quarter) => {
        const instance = quarter.status.status;
        if (instance === 'ToReceive' || instance === 'ToPay') wrapper.find(Table).should.have.lengthOf(2);
        if (instance === 'Payed' || instance === 'Received' || instance === 'Refused') wrapper.find(Table).should.have.lengthOf(1);
      });
    }
  });
});
