import React from 'react';
import { Link } from 'react-router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { VisibleOnlyCitizen } from '../../util/wrappers';

const CitizenHome = (props) => {
  const { authData } = props;
  const CitizenData = VisibleOnlyCitizen(() => (
    <ListGroup variant="flush">
      <ListGroup.Item variant="dark">
          Name:
        {' '}
        {authData.name}
      </ListGroup.Item>
      <ListGroup.Item variant="dark">
          Surname:
        {' '}
        {authData.surname}
      </ListGroup.Item>
      <ListGroup.Item variant="dark">
          Fiscal code:
        {' '}
        {authData.fiscalCode}
      </ListGroup.Item>
      <ListGroup.Item variant="dark">
          Balance:
        {' '}
        {authData.balance}
      </ListGroup.Item>
    </ListGroup>
  ));
  return (
    <Container>
      <Row>
        <h1>Citizen Profile</h1>
      </Row>
      <Row>
        <Col>
          <Card bg="dark" text="white">
            <Card.Header as="h3">Information</Card.Header>
            <CitizenData />
          </Card>
        </Col>

        <Col>
          <Card bg="dark" text="white">
            <Card.Header as="h3">Actions</Card.Header>
            <Link to="/profile/ordersHistory">
              <Button variant="info" size="lg" block>
                        Orders
              </Button>
            </Link>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

CitizenHome.propTypes = {
  // eslint-disable-next-line
    authData: PropTypes.object.isRequired,
};

export default CitizenHome;
