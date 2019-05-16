import React from 'react';
import {shallow} from 'enzyme';

const chai = require('chai');
should = chai.should();

import ProductsManagement from '../../../components/business/ProductsManagement';
import Button from "react-bootstrap/Button";

describe('<ProductsManagement />', () => {
  const wrapper = shallow(<ProductsManagement productsList={[{
    VAT: "22",
    availability: "1",
    deleted: false,
    description: "testDescription",
    id: "0",
    imagePreview: "testImagePreview",
    name: "testProduct",
    owner: "0x19e070BCb62E3CD1bC981886E7c151cEeCd88e64",
    price: 100
  }]} removeProduct={() => {
    return true;
  }} getProductsList={() => {
    return true;
  }}/>);

  it('renders two <Button /> components and two more for each Product listed', () => {
    wrapper.find(Button).should.have.lengthOf(2 + (wrapper.instance().props.productsList.length) * 2);
  });

});