import React from "react";
import { shallow } from 'enzyme';

const chai = require('chai');
should = chai.should();

import InfoCards from "../../../components/public/InfoCards";
import Card from "react-bootstrap/Card";

describe('<Infocards />', () => {
  it('renders two cards with previews of the MetaMask guide and the operations costs inside the app', () => {
    shallow(<InfoCards />).find(Card).should.have.lengthOf(2);
  });
});