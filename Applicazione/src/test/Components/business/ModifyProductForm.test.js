import React from 'react';
import {shallow} from 'enzyme';

const chai = require('chai');
should = chai.should();

import ModifyProductForm from '../../../components/business/ModifyProductForm';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";


describe('<ModifyProductForm />', () => {
  const wrapper = shallow(<ModifyProductForm modifyProduct={() => { return true; }} location={{
    state: {
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
  }} />);

  it('renders two <Button > components', () => {
    wrapper.find(Button).should.have.lengthOf(2);
  });

  it('renders a <Card /> component', () => {
    wrapper.find(Card).should.have.lengthOf(1);
  });

  it('renders five <Form.Control /> components', () => {
    wrapper.find(Form.Control).should.have.lengthOf(6);
  });

});
