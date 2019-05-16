import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import moment from 'moment';
import LoadingSpinner from '../public/LoadingSpinner';
import AlertMessage from '../public/AlertMessage';

class VATManagement extends React.Component {
  componentDidMount() {
    const { getVATHistory, getOrdersHistory } = this.props;
    getVATHistory();
    this.setState({ loadingOrders: true });
    if (getOrdersHistory !== undefined) {
      getOrdersHistory().then(() => {
        this.setState({
          loadingOrders: false,
        });
      });
    }
  }

  getPendingQuarters() {
    const { VATHistory } = this.props;
    if (VATHistory !== null) {
      return VATHistory.filter(quarter => (
        (quarter.status.status === 'ToReceive'
        || quarter.status.status === 'ToPay')
        && !(quarter.year === moment().get('year')
        && quarter.quarter === moment().get('quarter'))
      ));
    }
    return null;
  }

  totalVatCompensations() {
    const { OrdersHistory } = this.props;
    let total = 0;
    if (OrdersHistory.purchase !== null && OrdersHistory.purchase !== undefined) {
      OrdersHistory.purchase.forEach((purchase) => {
        if (moment(purchase.date).get('year') === moment().get('year')
          && moment(purchase.date).get('quarter') === moment().get('quarter')) {
          total = parseFloat((total + purchase.totalVat).toFixed(2));
        }
      });
    }
    return total;
  }

  totalVatDeductions() {
    const { OrdersHistory } = this.props;
    let total = 0;
    if (OrdersHistory.sell !== null && OrdersHistory.sell !== undefined) {
      OrdersHistory.sell.forEach((sell) => {
        if (moment(sell.date).get('year') === moment().get('year')
          && moment(sell.date).get('quarter') === moment().get('quarter')) {
          total = parseFloat((total + sell.totalVat).toFixed(2));
        }
      });
    }
    return total;
  }

  totalVat() {
    const total = this.totalVatCompensations() - this.totalVatDeductions();
    return parseFloat(total.toFixed(2));
  }

  render() {
    const {
      payVAT, refuseVAT, isLoading, OrdersHistory,
    } = this.props;

    const { state } = this;
    const loadingOrders = state === null ? true : state.loadingOrders;
    let pendingQuartersView = null;

    const pendingQuarters = this.getPendingQuarters();
    if (pendingQuarters !== undefined && pendingQuarters !== null && pendingQuarters.length !== 0) {
      pendingQuartersView = pendingQuarters.map(item => (
        <tr key={`${item.year} ${item.quarter}`} style={{ width: '100%' }}>
          <td>
            {item.quarter}
            {' quarter '}
            {item.year}
            {':'}
          </td>
          <td>Total: {item.status.amount}</td>
          <td><Button type="button" variant="success" disabled={!(item.status.status === 'ToPay')} onClick={() => payVAT(item)}>{ item.status.status === 'ToPay' ? 'Pay now' : 'Not to be payed' }</Button></td>
          <td><Button type="button" variant="danger" onClick={() => refuseVAT(item)}>Refuse</Button></td>
        </tr>
      ));
    }

    let pendingQuartersToPrint = null;
    if (pendingQuartersView !== null) {
      pendingQuartersToPrint = (
        <Table striped bordered hover>
          <tbody>
            {pendingQuartersView}
          </tbody>
        </Table>
      );
    } else {
      pendingQuartersToPrint = <AlertMessage variant="info" message="No pending quarters to pay." />;
    }

    const tvatd = this.totalVatDeductions();
    const tvatc = this.totalVatCompensations();
    const tvat = this.totalVat();

    const data = (
      <Row>
        <Col>
          <Table striped bordered hover>
            <tbody>
              <tr key="0">
                <td>VAT Deductions:</td>
                <td><h3 style={{ color: 'red' }}>{loadingOrders ? <LoadingSpinner /> : `${tvatd} CUB`}</h3></td>
              </tr>
              <tr key="1">
                <td>VAT Compensations:</td>
                <td><h3 style={{ color: 'green' }}>{loadingOrders ? <LoadingSpinner /> : `${tvatc} CUB`}</h3></td>
              </tr>
              <tr key="2">
                <td><b>VAT Total:</b></td>
                <td><h3>{loadingOrders ? <LoadingSpinner /> : `${tvat} CUB`}</h3></td>
              </tr>
            </tbody>
          </Table>
          <Link to={{
            pathname: '/profile/VATLedger',
            state: {
              sell: OrdersHistory.sell === null
                  || OrdersHistory.sell === undefined
                  || OrdersHistory.sell.length === 0 ? []
                : OrdersHistory.sell.filter((transaction) => {
                  const date = moment(transaction.date);
                  return date.isAfter(moment(0)
                    .set({ year: moment().year(), quarter: moment().quarter() }))
                  && date.isBefore(moment(0)
                    .set({ year: moment().year(), quarter: moment().quarter() }).add(1, 'Q'));
                }),
              purchase: OrdersHistory.purchase === null
                  || OrdersHistory.purchase === undefined
                  || OrdersHistory.purchase.length === 0 ? []
                : OrdersHistory.purchase.filter((transaction) => {
                  const date = moment(transaction.date);
                  return date.isAfter(moment(0)
                    .set({ year: moment().year(), quarter: moment().quarter() }))
                  && date.isBefore(moment(0)
                    .set({ year: moment().year(), quarter: moment().quarter() }).add(1, 'Q'));
                }),
            },
          }}
          >
            <Button variant="info" type="button" disabled={loadingOrders}>
              SEE LEDGER
            </Button>
          </Link>
        </Col>
        <Col>
          <div style={{ height: '200px', overflow: 'auto', marginBottom: '1rem' }}>
            {pendingQuartersToPrint}
          </div>
          <Link to="/profile/VATTransactionLedger">
            <Button variant="info" type="submit">
              SEE VAT PAYMENTS HISTORY
            </Button>
          </Link>
        </Col>
      </Row>
    );
    return (
      <Container>
        <Link to="/profile">
          <Button variant="dark" size="lg">
            Back to all actions
          </Button>
        </Link>
        <Row>
          <Col>
            <h2>Current quarter</h2>
          </Col>
          <Col>
            <h2>Pending quarters</h2>
          </Col>
        </Row>
        {isLoading ? <LoadingSpinner /> : data}
      </Container>
    );
  }
}

VATManagement.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  getVATHistory: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types,react/require-default-props
  VATHistory: PropTypes.array,
  getOrdersHistory: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types,react/require-default-props
  OrdersHistory: PropTypes.object,
  payVAT: PropTypes.func.isRequired,
  refuseVAT: PropTypes.func.isRequired,
};

export default VATManagement;
