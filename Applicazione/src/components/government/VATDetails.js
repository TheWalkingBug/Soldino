import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Table, Container,
} from 'react-bootstrap';
import { Link } from 'react-router';
import moment from 'moment';
import AlertMessage from '../public/AlertMessage';
import LoadingSpinner from '../public/LoadingSpinner';

class VATDetails extends React.Component {
  componentDidMount() {
    const { getVATHistory, location } = this.props;
    getVATHistory(location.state);
  }

  render() {
    const {
      VATHistory, payVAT, isLoading, location,
    } = this.props;

    if (location.state === undefined) {
      return (
        <AlertMessage
          variant="warning"
          message={"You can't access this page directly from the url. You need"
                  + ' to get access from the business VAT status page.'}
        />
      );
    }

    let businessData = null;
    if (VATHistory !== null && VATHistory !== undefined && VATHistory.length !== 0) {
      businessData = (
        VATHistory
          .filter(item => !(item.quarter === moment().get('quarter')
                  && item.year === moment().get('year')))
          .map((quarter) => {
            let amount = '';
            let date = '';
            switch (quarter.status.status) {
              case 'ToReceive':
              case 'ToPay': amount = `${quarter.status.amount.toString()} Cubit`;
                date = 'Not yet payed';
                break;
              case 'Refused':
              case 'Payed':
              case 'Received': amount = `${quarter.status.transaction.amount.toString()} Cubit`;
                date = moment.unix(quarter.status.transaction.date).toDate().toDateString();
                break;
              case 'NotNecessary': amount = '0.00 Cubit';
                date = 'NA';
                break;
              default: break;
            }

            const vatTaxPayable = quarter.status.status === 'ToReceive';
            return (
              <tr key={`${quarter.year} ${quarter.quarter}`}>
                <td>{quarter.year}</td>
                <td>{quarter.quarter}</td>
                <td>{quarter.status.status}</td>
                <td>{amount}</td>
                <td>{date}</td>
                <td><Button onClick={() => payVAT(quarter, location.state)} disabled={!vatTaxPayable} variant="danger">Pay VAT tax credit</Button></td>
              </tr>
            );
          })
      );
    }

    let businessDataToPrint = null;

    if (businessData !== null) {
      businessDataToPrint = (
        <Container>
          <Table striped bordered hover>
            <thead>
              <tr key="0">
                <th>Year</th>
                <th>Quarter</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Payment date</th>
                <th>Pay VAT credit</th>
              </tr>
            </thead>
            <tbody>
              { businessData }
            </tbody>
          </Table>
        </Container>
      );
    } else {
      businessDataToPrint = <AlertMessage variant="info" message="No VAT History." />;
    }

    return (
      <Container>
        <Link to="/profile">
          <Button variant="dark" size="lg">
                        Back to all actions
          </Button>
        </Link>
        <h2 className="ManageBusinessTitle">Business VAT details</h2>
        <br />
        {isLoading ? <LoadingSpinner /> : businessDataToPrint}
      </Container>
    );
  }
}

VATDetails.propTypes = {
  isLoading: PropTypes.bool,
  // eslint-disable-next-line
  VATHistory: PropTypes.array,
  getVATHistory: PropTypes.func.isRequired,
  payVAT: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
};

VATDetails.defaultProps = {
  isLoading: false,
};

export default VATDetails;
