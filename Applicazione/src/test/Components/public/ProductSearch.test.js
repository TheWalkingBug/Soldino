import React from "react";
import {shallow} from 'enzyme';

const chai = require('chai');
should = chai.should();

import ProductSearch from "../../../components/public/ProductSearch";
import ProductCard from "../../../components/public/ProductCard";
import AlertMessage from "../../../components/public/AlertMessage";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

describe('<ProductSearch />', () => {
  const wrapper = shallow(<ProductSearch
    items={[]}
    result={[{
      VAT: "22",
      availability: "1",
      deleted: false,
      description: "testDescription",
      id: "0",
      imagePreview: "testProductImage",
      name: "testProduct",
      owner: "0x19e070BCb62E3CD1bC981886E7c151cEeCd88e64",
      price: 100
    }]}
    searchProducts={() => {
      return true;
    }}
    clearSearch={() => {
      return true;
    }}/>);

  it('renders a <Form.Control> component to search products', () => {
    wrapper.find(Form.Control).should.have.lengthOf(1);
  });

  it('renders two <Button /> components', () => {
    wrapper.find(Button).should.have.lengthOf(2);
  });

});