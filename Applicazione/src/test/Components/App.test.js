import React from "react";
import { shallow } from 'enzyme';
import App from "../../components/App";
import NavbarCustom from "../../components/public/NavbarCustom";
import Footer from "../../components/public/Footer";

const chai = require('chai');
should = chai.should();

describe('<App />', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            children: "{jest.mock()}",
            interactionLoading: false,
            loadingMessage: ""
        };

        wrapper = shallow(<App {...props}/>);
    });

    it('renders a <NavbarCustom /> component', () => {
        wrapper.should.contain(NavbarCustom);
    });

    it('renders a <Footer /> component', () => {
        wrapper.should.contain(Footer);
    });
});