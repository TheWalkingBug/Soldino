import React from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import LoadingSpinner from '../public/LoadingSpinner';
import AlertMessage from '../public/AlertMessage';

class BusinessList extends React.Component {
  componentDidMount() {
    const { getBusinessInfo } = this.props;
    getBusinessInfo();
  }

  render() {
    const { businessInfo, isLoading, removeBusiness } = this.props;
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
              <Button type="button" variant="danger" onClick={() => removeBusiness(item.address)}>Remove</Button>
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
                  <th>Remove</th>
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
        <h2 className="ManageBusinessTitle">Remove businesses</h2>
        <br />
        {isLoading ? <LoadingSpinner /> : businessDataToPrint }
      </Container>
    );
  }
}

BusinessList.propTypes = {
  isLoading: PropTypes.bool,
  // eslint-disable-next-line
    businessInfo: PropTypes.array,
  // eslint-disable-next-line
    getBusinessInfo: PropTypes.func.isRequired,
  removeBusiness: PropTypes.func.isRequired,
};

BusinessList.defaultProps = {
  isLoading: false,
};

export default BusinessList;
