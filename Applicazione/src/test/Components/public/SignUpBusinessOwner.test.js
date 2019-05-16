import React from "react";
import { shallow } from 'enzyme';

const chai = require('chai');
should = chai.should();

import SignUpBusinessOwnerForm from '../../../components/public/SignUpBusinessOwnerForm';
import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form';

describe('<SignUpBusinessOwnerForm />', () => {
  const wrapper = shallow(<SignUpBusinessOwnerForm onSignUpBusinessOwnerFormSubmit={() => {return true;}}/>);
  it('renders a card', () => {
    wrapper.find(Card).should.have.lengthOf(1);
  });

  it('renders four forms to compile', () => {
    wrapper.find(Form.Control).should.have.lengthOf(4);
  });
});