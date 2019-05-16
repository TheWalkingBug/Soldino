import React from "react";
import { shallow } from 'enzyme';

const chai = require('chai');
should = chai.should();

import SignUpCitizenForm from '../../../components/public/SignUpCitizenForm';
import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form';

describe('<SignUpCitizenForm />', () => {
  const wrapper = shallow(<SignUpCitizenForm onSignUpCitizenFormSubmit={() => {return true;}}/>);
  it('renders a card', () => {
    wrapper.find(Card).should.have.lengthOf(1);
  });

  it('renders four forms to compile', () => {
    wrapper.find(Form.Control).should.have.lengthOf(4);
  });
});