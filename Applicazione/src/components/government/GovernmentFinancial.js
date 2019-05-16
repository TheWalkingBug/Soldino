import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table, Container } from 'react-bootstrap';
import { Link } from 'react-router';
import AlertMessage from '../public/AlertMessage';
import LoadingSpinner from '../public/LoadingSpinner';

class GovernmentFinancial extends React.Component {
  componentDidMount() {
    const { getBusinessInfo } = this.props;
    getBusinessInfo();
  }

  render() {
    const { businessInfo, isLoading } = this.props;
    let allBusinessesInfo = null;
    let businessDataToPrint = null;

    if (businessInfo) {
      if (businessInfo.length !== 0) {
        allBusinessesInfo = businessInfo.map((item, id) => (
          <tr key={id}>
            <td>{item.businessName}</td>
            <td>{item.location}</td>
            <td>{item.CE}</td>
            <td>{item.VATNumber}</td>
            <td>
              <Link to={{
                pathname: `/governmentFinancial/VATDetails/${item.address}`,
                state: item.address,
              }}
              >
                <Button type="button" variant="info">VAT details</Button>
              </Link>
            </td>
          </tr>
        ));
      }

      if (allBusinessesInfo !== null) {
        businessDataToPrint = (
          <Container>
            <Table striped bordered hover>
              <thead>
                <tr key="0">
                  <th>Business name</th>
                  <th>Location</th>
                  <th>PEC</th>
                  <th>VAT number</th>
                  <th>VAT details</th>
                </tr>
              </thead>
              <tbody>
                {allBusinessesInfo}
              </tbody>
            </Table>
          </Container>
        );
      } else {
        businessDataToPrint = <AlertMessage variant="info" message="No business." />;
      }
    }

    return (
      <Container>
        <Link to="/profile">
          <Button variant="dark" size="lg">
              Back to all actions
          </Button>
        </Link>
        <h2 className="ManageBusinessTitle">Check business VAT status</h2>
        <br />
        {isLoading ? <LoadingSpinner /> : businessDataToPrint }
      </Container>
    );
  }
}

GovernmentFinancial.propTypes = {
  isLoading: PropTypes.bool,
  // eslint-disable-next-line
  businessInfo: PropTypes.array,
  // eslint-disable-next-line
  getBusinessInfo: PropTypes.func.isRequired,
};

GovernmentFinancial.defaultProps = {
  isLoading: false,
};

export default GovernmentFinancial;
