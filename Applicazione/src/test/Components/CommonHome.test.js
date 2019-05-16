import React from "react";
import {shallow} from 'enzyme';

const chai = require('chai');
should = chai.should();

import CommonHome from '../../components/CommonHome';
import AlertMessage from '../../components/public/AlertMessage';
import CitizenHomeContainer from '../../containers/citizen/CitizenHomeContainer';
import BusinessHomeContainer from '../../containers/business/BusinessHomeContainer';
import GovernmentHomeContainer from '../../containers/government/GovernmentHomeContainer';

describe('<CommonHome />', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = null;
    wrapper = null;
  });

  it('renders an <AlertMessage /> if the user is not registered', () => {
    props = {
      authData: {
        type: 0,
        data: {
          balance: "0.00",
          userType: 0
        }
      }
    };

    wrapper = shallow(<CommonHome {...props}/>);

    if (props.authData.data.userType === 0)
      wrapper.find(AlertMessage).should.have.lengthOf(1);
  });

  it('renders a <CitizenHomeContainer /> if the user is a Citizen', () => {
    props = {
      authData: {
        type: 1,
        data: {
          balance: "0.00",
          userType: 1
        }
      }
    };

    wrapper = shallow(<CommonHome {...props}/>);

    if (props.authData.data.userType === 1)
      wrapper.find(CitizenHomeContainer).dive().should.have.lengthOf(1);
  });

  it('renders a <BusinessHomeContainer /> if the user is a Business Owner', () => {
    props = {
      authData: {
        type: 2,
        data: {
          balance: "0.00",
          userType: 2
        }
      }
    };

    wrapper = shallow(<CommonHome {...props}/>);

    if (props.authData.data.userType === 2)
      wrapper.find(BusinessHomeContainer).dive().should.have.lengthOf(1);
  });

  it('renders a <GovernmentHomeContainer /> if the user is a Government', () => {
    props = {
      authData: {
        type: 3,
        data: {
          balance: "0.00",
          userType: 3
        }
      }
    };

    wrapper = shallow(<CommonHome {...props}/>);

    if (props.authData.data.userType === 3)
      wrapper.find(GovernmentHomeContainer).dive().should.have.lengthOf(1);
  });

});