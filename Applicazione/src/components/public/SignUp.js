import React from 'react';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import CardDeck from 'react-bootstrap/CardDeck';
import { Link } from 'react-router';
import company from '../../img/company.png';
import citizen from '../../img/man.png';

const SignUp = () => (
  <Container>
    <Row>
      <h1>Sign up</h1>
    </Row>
    <Row>
      <h2>Are you a citizen or a business owner?</h2>
    </Row>
    <Row className="justify-content-md-center">
      <CardDeck>
        <Card bg="dark" text="white" style={{ width: '25rem' }}>
          <Card.Body className="text-centered">
            <Card.Title as="h3">
                  I am a
              <br />
                  CITIZEN
            </Card.Title>
            <Card.Img variant="bottom" src={citizen} />
            <Card.Footer>
              <Link to="/signupcitizen">
                <Button variant="info" size="lg" block>
                      To sign up as a
                  {' '}
                  <strong>CITIZEN</strong>
                  {' '}
click here
                </Button>
              </Link>
            </Card.Footer>
          </Card.Body>
        </Card>
        <Card bg="dark" text="white" style={{ width: '25rem' }}>
          <Card.Body className="text-centered">
            <Card.Title as="h3">
                  I am a
              <br />
                  BUSINESS OWNER
            </Card.Title>
            <Card.Img variant="bottom" src={company} />
            <Card.Footer>
              <Link to="/signupbusinessowner">
                <Button variant="info" size="lg" block>
                      To sign up as a
                  {' '}
                  <strong>BUSINESS OWNER</strong>
                  {' '}
click here
                </Button>
              </Link>
            </Card.Footer>
          </Card.Body>
        </Card>
      </CardDeck>
    </Row>
  </Container>
);


export default SignUp;
