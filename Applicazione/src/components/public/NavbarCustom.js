import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router';
import {
  CitizenLinks,
  GovernmentLinks,
  GuestLinks,
  BusinessOwnerLinks,
} from '../../routes/NavbarLinks';

import logo from '../../img/logo_min.png';

const NavbarCustom = () => (
  <Navbar className="sticky-top" bg="dark" variant="dark">
    <Navbar.Brand>
      <Nav.Link as={Link} to="/">
        <img src={logo} alt="logo-Soldino" width="200" />
      </Nav.Link>
    </Navbar.Brand>
    <Navbar.Collapse />
    <CitizenLinks />
    <GovernmentLinks />
    <BusinessOwnerLinks />
    <GuestLinks />
  </Navbar>
);

export default NavbarCustom;
