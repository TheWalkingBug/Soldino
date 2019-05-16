import React from 'react';
import { Container, Image } from 'react-bootstrap';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import metamaskLogo from '../../img/metamask_big.png';
import metamaskStart1 from '../../img/metamask_guide_start.gif';
import metamaskStart2 from '../../img/metamask_guide_start2.gif';

const Help = () => (
  <Container>
    <Jumbotron>
      <h1>
Getting started with
        <a href="https://metamask.io/"><img src={metamaskLogo} alt="MetaMask logo" width="250" /></a>
      </h1>
      <p>
To use the application Soldino
        <strong> YOU WILL NEED TO HAVE AN ETHEREUM WALLET</strong>
: this can be done by
        <a href="https://metamask.io/"> installing MetaMask</a>
.
      </p>
      <p>
                MetaMask is a free and secure browser
                extension that allows web applications to read
                and interact with the Ethereum blockchain.
      </p>
    </Jumbotron>
    <h2>Two steps to install MetaMask</h2>
    <br />
    <Row>
      <Col xl>
        <h3>Step 1. Install MetaMask on your browser</h3>
        <p>
                        To
          {' '}
          <strong> create a new wallet with MetaMask</strong>
          {' '}
you need to
          {' '}
          <strong> install the extension first</strong>
.
                        You can install MetaMask for Chrome or Firefox, this guide will use Chrome as an example.
        </p>
        <ol>
          <li>
Open
            <a href="https://metamask.io"> https://metamask.io</a>
            {' '}
or search for “MetaMask extension” using
                            your favorite search engine;
          </li>
          <li>Click "Chrome" to install MetaMask as a Google Chrome extension;</li>
          <li>Click "Add to Chrome";</li>
          <li>Click "Add Extension".</li>
        </ol>
        <p>
          <strong>And now you have successfully installed the MetaMask extension!</strong>
        </p>
      </Col>
      <Col xl>
        <Image src={metamaskStart1} fluid />
      </Col>
    </Row>
    <br />
    <br />
    <br />
    <Row>
      <Col xl>
        <Image src={metamaskStart2} fluid />
      </Col>
      <Col xl>
        <h3>Step 2. Create an account</h3>
        <p>
                        Now it is time to create an account:
        </p>
        <ol>
          <li>
Click on the MetaMask icon in the upper right corner to
            <strong> open the extension</strong>
;
          </li>
          <li>To install the latest version of MetaMask, click Try it now;</li>
          <li>Click Continue;</li>
          <li>
You will be asked to create a new password.
            <strong> Create a strong password and click Create</strong>
;
          </li>
          <li>Proceed by clicking Next, then accept Terms of Use;</li>
          <li>Click Reveal secret words;</li>
          <li>
You will see a
            <strong> 12 words seed phrase</strong>
. Save seed words as a file or
            <strong> copy them to a safe place </strong>
                            and click Next;
          </li>
          <li>
            <strong> Verify your secret phrase</strong>
            {' '}
by selecting the previously generated phrase. When done, click Confirm.
          </li>
        </ol>
        <p>
                        Congratulations!
          {' '}
          <strong>
You have successfully created your MetaMask account. A new Ethereum wallet address
                        was automatically generated for you!
          </strong>
        </p>
          <p>
              <strong>And now you are good to go</strong>
              , you can register to the platform and start searching for products or selling
              them!
          </p>
      </Col>
    </Row>
  </Container>
);

export default Help;
