import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table, Container } from 'react-bootstrap';
import { Link } from 'react-router';
import LoadingSpinner from '../public/LoadingSpinner';
import AlertMessage from '../public/AlertMessage';

class ManageBusiness extends React.Component {
  componentDidMount() {
    const { getBusinessInfo } = this.props;
    getBusinessInfo();
  }

  render() {
    const { businessInfo, isLoading, acceptBusiness, rejectBusiness } = this.props;
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
              <Button type="button" variant="success" onClick={() => acceptBusiness(item.address)}>Accept</Button>
            </td>
            <td>
              <Button type="button" variant="danger" onClick={() => rejectBusiness(item.address)}>Reject</Button>
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
                  <th>Accept</th>
                  <th>Reject</th>
                </tr>
              </thead>
              <tbody>
                {allBusinessesInfo}
              </tbody>
            </Table>
          </Container>
        );
      } else {
        businessDataToPrint = <AlertMessage variant="info" message="No business requests for use Soldino." />;
      }
    }

    return (
      <Container>
        <Link to="/profile">
          <Button variant="dark" size="lg">
              Back to all actions
          </Button>
        </Link>
        <h2 className="ManageBusinessTitle">Businesses requests</h2>
        <br />
        {isLoading ? <LoadingSpinner /> : businessDataToPrint }
      </Container>
    );
  }
}

ManageBusiness.propTypes = {
  isLoading: PropTypes.bool,
  // eslint-disable-next-line
    businessInfo: PropTypes.array,
  // eslint-disable-next-line
    getBusinessInfo: PropTypes.func.isRequired,
  acceptBusiness: PropTypes.func.isRequired,
  rejectBusiness: PropTypes.func.isRequired,
};

ManageBusiness.defaultProps = {
  isLoading: false,
};

export default ManageBusiness;
