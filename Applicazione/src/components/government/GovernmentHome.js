import React from 'react';
import { Link } from 'react-router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const GovernmentHome = (props) => {
  const { authData } = props;
  return (
    <Container>
      <Row>
        <h1>Government Profile</h1>
      </Row>
      <Row>
        <Col>
          <Card bg="dark" text="white">
            <Card.Header as="h3">Information</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item variant="dark">
                  Balance:
                {' '}
                {authData.balance}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col>
          <Card bg="dark" text="white">
            <Card.Header as="h3">Actions</Card.Header>
            <Link to="/profile/governmentEconomy">
              <Button variant="info" size="lg" block>
                  Mint & Distribute Cubit
              </Button>
            </Link>

            <Link to="/profile/governmentFinancial">
              <Button variant="info" size="lg" block>
                  Check businesses VAT Status
              </Button>
            </Link>

            <Link to="/profile/manageBusiness">
              <Button variant="info" size="lg" block>
                  Manage businesses requests
              </Button>
            </Link>

            <Link to="/profile/businessList">
              <Button variant="info" size="lg" block>
                  Manage businesses
              </Button>
            </Link>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

GovernmentHome.propTypes = {
  // eslint-disable-next-line
  authData: PropTypes.object.isRequired,
};

export default GovernmentHome;
