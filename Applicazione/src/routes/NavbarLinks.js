import React from 'react';
import { Nav, NavItem, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import {
  HiddenOnlyAuth,
  VisibleOnlyGovernment,
  VisibleOnlyBusinessOwner,
  VisibleOnlyCitizen,
} from '../util/wrappers.js';

// UI Components
import LoginButtonContainer from '../containers/public/LoginButtonContainer';
import LogoutButtonContainer from '../containers/public/LogoutButtonContainer';

export const GovernmentLinks = VisibleOnlyGovernment(() => (
  <Nav className="mr-auto">
    <NavItem eventkey={1}>
      <Nav.Link as={Link} to="/costs">
        <Button variant="dark">
                    Costs
        </Button>
      </Nav.Link>
    </NavItem>
    <NavItem eventkey={1}>
      <Nav.Link as={Link} to="/profile">
        <Button variant="dark">
                    Profile
        </Button>
      </Nav.Link>
    </NavItem>
    <NavItem eventkey={1}>
      <Nav.Link as={Link} to="/">
        <LogoutButtonContainer />
      </Nav.Link>
    </NavItem>
  </Nav>
));

export const CitizenLinks = VisibleOnlyCitizen(() => (
  <Nav className="mr-auto">
    <NavItem eventkey={1}>
      <Nav.Link as={Link} to="products">
        <Button variant="dark">
                    Search Products
        </Button>
      </Nav.Link>
    </NavItem>
    <NavItem eventkey={1}>
      <Nav.Link as={Link} to="/costs">
        <Button variant="dark">
                    Costs
        </Button>
      </Nav.Link>
    </NavItem>
    <NavItem eventkey={1}>
      <Nav.Link as={Link} to="/profile">
        <Button variant="dark">
                    Profile
        </Button>
      </Nav.Link>
    </NavItem>
    <NavItem eventkey={1}>
      <Nav.Link as={Link} to="/cart">
        <Button variant="dark">
                    Cart
        </Button>
      </Nav.Link>
    </NavItem>
    <NavItem eventkey={1}>
      <Nav.Link as={Link} to="/">
        <LogoutButtonContainer />
      </Nav.Link>
    </NavItem>
  </Nav>
));

export const BusinessOwnerLinks = VisibleOnlyBusinessOwner(() => (
  <Nav className="mr-auto">
    <NavItem eventkey={1}>
      <Nav.Link as={Link} to="products">
        <Button variant="dark">
                    Search Products
        </Button>
      </Nav.Link>
    </NavItem>
    <NavItem eventkey={1}>
      <Nav.Link as={Link} to="/costs">
        <Button variant="dark">
                    Costs
        </Button>
      </Nav.Link>
    </NavItem>
    <NavItem eventkey={1}>
      <Nav.Link as={Link} to="/profile">
        <Button variant="dark">
                    Profile
        </Button>
      </Nav.Link>
    </NavItem>
    <NavItem eventkey={1}>
      <Nav.Link as={Link} to="/cart">
        <Button variant="dark">
                    Cart
        </Button>
      </Nav.Link>
    </NavItem>
    <NavItem eventkey={1}>
      <Nav.Link as={Link} to="/">
        <LogoutButtonContainer />
      </Nav.Link>
    </NavItem>
  </Nav>
));

export const GuestLinks = HiddenOnlyAuth(() => (
  <Nav className="mr-auto">
    <NavItem eventkey={1}>
      <Nav.Link as={Link} to="products">
        <Button variant="dark">
                    Search Products
        </Button>
      </Nav.Link>
    </NavItem>
    <NavItem eventkey={1}>
      <Nav.Link as={Link} to="/costs">
        <Button variant="dark">
                    Costs
        </Button>
      </Nav.Link>
    </NavItem>
    <NavItem eventkey={1}>
      <Nav.Link as={Link} to="/cart">
        <Button variant="dark">
                    Cart
        </Button>
      </Nav.Link>
    </NavItem>
    <NavItem eventkey={1}>
      <Nav.Link as={Link} to="/signup">
        <Button variant="dark">
                    Sign up
        </Button>
      </Nav.Link>
    </NavItem>
    <NavItem>
      <Nav.Link>
        <LoginButtonContainer />
      </Nav.Link>
    </NavItem>
  </Nav>
));
