import React from "react";
import {shallow} from 'enzyme';

const chai = require('chai');
should = chai.should();

import ProductCard from '../../../components/public/ProductCard';
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card";

describe('<ProductCard />', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      addToCart: () => {
        return true;
      },
      prodInfo: {
        VAT: "22",
        availability: "1",
        deleted: false,
        description: "testDescription",
        id: "0",
        imagePreview: "testProductImage",
        name: "testProduct",
        owner: "0x19e070BCb62E3CD1bC981886E7c151cEeCd88e64",
        price: 100
      }
    };

    wrapper = shallow(<ProductCard {...props}/>);
  });

  it('renders a <Button /> component', () => {
    wrapper.find(Button).should.have.lengthOf(1);
  });

  it('renders a <Card /> component', () => {
    wrapper.find(Card).should.have.lengthOf(1);
  });

});