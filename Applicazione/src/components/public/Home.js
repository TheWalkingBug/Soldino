import React from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InfoCards from './InfoCards';
import logo from '../../img/logo.png';
import AlertMessage from './AlertMessage';

const Home = (props) => {
  const { metamask } = props;
  return (
    <div>
      <div className="metamask-not-found">
        {metamask === null ? (
          <AlertMessage
            variant="danger"
            message="MetaMask not installed. Please, install MetaMask to use Soldino!"
          />
        ) : null}
      </div>
      <Jumbotron fluid className="container-img">
        <Container>
          <img src={logo} alt="Soldino - logo" width="80%" height="auto" />
          <h5 style={{ marginTop: '4em' }}>
                        Soldino is a platform provided by the Government that allows
                        business owners to register their business and buy/sell
                        goods/services as well to receive and record taxes. Citizens can buy
                        things or services using money minted and distributed by the
                        Government.
          </h5>
        </Container>
      </Jumbotron>
      <Container>
        <InfoCards />
      </Container>
    </div>
  );
};

const mapStateToProps = state => ({
  metamask: state.web3.web3Instance,
});

Home.propTypes = {
  // eslint-disable-next-line
  metamask: PropTypes.object,
};

Home.defaultProps = {
  // eslint-disable-next-line
    metamask: null,
};

export default connect(mapStateToProps, null)(Home);
