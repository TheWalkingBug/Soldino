import React from 'react';
import { shallow } from 'enzyme';

import Home from '../../../components/public/Home';
import InfoCards from '../../../components/public/InfoCards';

const chai = require('chai');

should = chai.should();

describe('<Home />', () => {
  it('renders an <Infocard /> component', () => {
    shallow(<Home />).should.contain(InfoCards);
  });
});
