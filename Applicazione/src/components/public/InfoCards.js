import React from 'react';
import {
  Card, Button, CardDeck, Table,
} from 'react-bootstrap';
import { Link } from 'react-router';

import picture from '../../img/metamask_logo.png';

const InfoCards = () => (
  <CardDeck>
    <Card bg="dark" text="light">
      <Card.Header as="h3">Getting started</Card.Header>
      <a href="https://metamask.io/">
        <Card.Img src={picture} />
      </a>
      <Card.Body>
        <Card.Text>
            Access the official MetaMask site from the link above and install
            MetaMask on your browser to begin using Soldino!
          {' '}
          <strong>
              For a full guide on how to install MetaMask and create a wallet
              click the link below!
          </strong>
        </Card.Text>
        <Link to="/help">
          <Button variant="info" block>
              Guide to MetaMask
          </Button>
        </Link>
      </Card.Body>
    </Card>
    <Card bg="dark" text="light">
      <Card.Header as="h3">Main costs inside the app</Card.Header>
      <Card.Body>
        <Table bordered variant="dark" size="sm">
          <thead>
            <tr>
              <th>Operation name</th>
              <th>Average cost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Login</td>
              <td>FREE</td>
            </tr>
            <tr>
              <td>Registration</td>
              <td>0.000929 ETH</td>
            </tr>
            <tr>
              <td>Buying a product</td>
              <td>0.003 ETH</td>
            </tr>
          </tbody>
        </Table>
        <p>
            Every operation that reads data from the blockchain is
          {' '}
          <strong>FREE!</strong>
          {' '}
Instead, every operation that writes data
            onto the blockchain has a cost that depends on the weight of the
            information.
        </p>
        <Link to="/costs">
          <Button variant="info" block>
              See all costs
          </Button>
        </Link>
      </Card.Body>
    </Card>
  </CardDeck>
);

export default InfoCards;
