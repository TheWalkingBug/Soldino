import React from 'react';
import {shallow} from 'enzyme';

const chai = require('chai');
should = chai.should();

import AddProductsForm from '../../../components/business/AddProductForm';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";


describe('<AddProductsForm />', () => {
  const wrapper = shallow(<AddProductsForm addProduct={() => { return true; }} />);

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