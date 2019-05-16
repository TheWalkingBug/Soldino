import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router';

class VATTransactionLedger extends React.Component {
  componentDidMount() {
    const { getVATHistory, getOrdersHistory } = this.props;
    getVATHistory();
    getOrdersHistory();
  }

  render() {
    const { VATHistory, OrdersHistory } = this.props;

    let allTransactions = null;

    if (VATHistory !== null && VATHistory !== undefined && VATHistory.length !== 0
    && OrdersHistory !== null && OrdersHistory !== undefined) {
      allTransactions = VATHistory
        .filter(item => ((
          item.status.status === 'Payed'
          || item.status.status === 'Received'
          || item.status.status === 'Refused')
          && !(item.year === moment().get('year')
          && item.quarter === moment().get('quarter'))
        ))
        .map(item => (
          <tr key={item.status.transaction.id}>
            <td>{item.status.transaction.id}</td>
            <td>{item.status.status}</td>
            <td>{moment.unix(item.status.transaction.date).toDate().toDateString()}</td>
            <td>{item.quarter}</td>
            <td>{item.year}</td>
            <td>{item.status.transaction.amount}</td>
            <td>
              <Link to={{
                pathname: `/VATTransactionLedger/VATLedger/${item.status.transaction.id}`,
                state: {
                  sell: OrdersHistory.sell === null
                  || OrdersHistory.sell === undefined
                  || OrdersHistory.sell.length === 0 ? []
                    : OrdersHistory.sell.filter((transaction) => {
                      const date = moment(transaction.date);
                      return date.isAfter(moment(0).set({ year: item.year, quarter: item.quarter }))
                      && date.isBefore(moment(0).set({ year: item.year, quarter: item.quarter }).add(1, 'Q'));
                    }),
                  purchase: OrdersHistory.purchase === null
                  || OrdersHistory.purchase === undefined
                  || OrdersHistory.purchase.length === 0 ? []
                    : OrdersHistory.purchase.filter((transaction) => {
                      const date = moment(transaction.date);
                      return date.isAfter(moment(0).set({ year: item.year, quarter: item.quarter }))
                      && date.isBefore(moment(0).set({ year: item.year, quarter: item.quarter }).add(1, 'Q'));
                    }),
                  quarter: item.quarter,
                  year: item.year,
                },
              }}
              >
                <Button variant="info" type="button">
                  DETAILS
                </Button>
              </Link>
            </td>
          </tr>
        ));
    }
    return (
      <Container>
        <Link to="/profile/VATManagement">
          <Button variant="dark" size="lg">
                  Back to VAT Management
          </Button>
        </Link>
        <Row>
          <Col>
            <h2> VAT Transactions history </h2>
            <Table>
              <thead>
                <tr key="0">
                  <th>Id</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Quarter</th>
                  <th>Year</th>
                  <th>Amount</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {allTransactions}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}

VATTransactionLedger.propTypes = {
  // eslint-disable-next-line
  VATHistory: PropTypes.array,
  getVATHistory: PropTypes.func.isRequired,
  // eslint-disable-next-line
  OrdersHistory: PropTypes.object,
  getOrdersHistory: PropTypes.func.isRequired,
};

export default VATTransactionLedger;
