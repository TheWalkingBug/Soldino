import React from "react";
import { shallow } from 'enzyme';

const chai = require('chai');
should = chai.should();

import AlertMessage from '../../../components/public/AlertMessage';
import { Alert } from 'react-bootstrap';

describe('<AlertMessage />', () => {
  const props = {
    variant: "info",
    message: "testMessage"
  };

  const wrapper = shallow(<AlertMessage {...props}/>);

  it('renders an <Alert > component', () => {
    wrapper.find(Alert).should.have.lengthOf(1);
  });

});