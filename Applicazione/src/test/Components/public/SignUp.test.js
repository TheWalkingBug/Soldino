import React from "react";
import { shallow } from 'enzyme';

const chai = require('chai');
should = chai.should();

import SignUp from '../../../components/public/SignUp';
import Card from "react-bootstrap/Card";

describe('<SignUp />', () => {
    it('renders two cards with buttons to sign up as citizen or business owner', () => {
        shallow(<SignUp />).find(Card).should.have.lengthOf(2);
    });
});