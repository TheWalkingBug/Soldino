import React from 'react';
import { Link } from 'react-router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { VisibleOnlyBusinessOwner } from '../../util/wrappers';
import AlertMessage from '../public/AlertMessage';

const BusinessHome = (props) => {
  const { authData } = props;

  const BusinessData = VisibleOnlyBusinessOwner(() => (
    <ListGroup variant="flush">
      <ListGroup.Item variant="dark">
                Business name:
        {' '}
        {authData.businessName}
      </ListGroup.Item>
      <ListGroup.Item variant="dark">
                Business location:
        {' '}
        {authData.location}
      </ListGroup.Item>
      <ListGroup.Item variant="dark">
                VAT number:
        {' '}
        {authData.VATNumber}
      </ListGroup.Item>
      <ListGroup.Item variant="dark">
                Certified e-mail:
        {' '}
        {authData.CE}
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
        <h1>Business Owner Profile</h1>
        <br />
        {authData.confirmed === '0' ? (
          <AlertMessage
            variant="warning"
            message={'In order to use Soldino you '
          + 'need to be accepted by the government. Your actions are disabled until the confirm.'}
          />
        ) : null}
      </Row>
      <Row>
        <Col>
          <Card bg="dark" text="white">
            <Card.Header as="h3">Information</Card.Header>
            <BusinessData />
          </Card>
        </Col>
        <Col>
          <Card bg="dark" text="white">
            <Card.Header as="h3">Actions</Card.Header>
            <Link
              to="/profile/productsManagement"
              style={authData.confirmed === '0' ? { pointerEvents: 'none' } : null}
            >
              <Button variant="info" size="lg" block disabled={authData.confirmed === '0'}>
                        Products Management
              </Button>
            </Link>
            <Link
              to="/profile/ordersManagement"
              style={authData.confirmed === '0' ? { pointerEvents: 'none' } : null}
            >
              <Button variant="info" size="lg" block disabled={authData.confirmed === '0'}>
                      Orders History
              </Button>
            </Link>
            <Link
              to="/profile/vatManagement"
              style={authData.confirmed === '0' ? { pointerEvents: 'none' } : null}
            >
              <Button variant="info" size="lg" block disabled={authData.confirmed === '0'}>
                        VAT Management
              </Button>
            </Link>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

BusinessHome.propTypes = {
  // eslint-disable-next-line
    authData: PropTypes.object.isRequired,
};


export default BusinessHome;
