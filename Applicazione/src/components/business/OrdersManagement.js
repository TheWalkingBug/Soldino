import React from 'react';
import {
  Table, Container, Button, Tabs, Tab,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import AlertMessage from '../public/AlertMessage';
import LoadingSpinner from '../public/LoadingSpinner';

class OrdersManagement extends React.Component {
  componentDidMount() {
    const {
      getOrdersHistory,
    } = this.props;
    getOrdersHistory();
  }

  render() {
    let allOrdersPurchase = null;
    let allOrdersSell = null;
    let allOrdersPurchasePrint = null;
    let allOrdersSellPrint = null;

    const {
      ordersHistoryDataPurchase,
      ordersHistoryDataSell,
      isLoading,
    } = this.props;

    if (ordersHistoryDataPurchase !== null && ordersHistoryDataPurchase.length !== 0) {
      allOrdersPurchase = ordersHistoryDataPurchase.map(item => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.date}</td>
          <td>{`${item.total} CUB`}</td>
          <td>
            <Link to={{
              pathname: `/ordersManagement/orderDetails/${item.id}`,
              state: {
                orderType: '0',
                id: item.id,
                date: item.date,
                total: item.total,
                products: item.products,
                quantities: item.productQuantities,
                seller: item.seller,
              },
            }}
            >
              <Button type="button">Details</Button>
            </Link>
          </td>
        </tr>
      ));
    }

    if (ordersHistoryDataSell !== null && ordersHistoryDataSell.length !== 0) {
      allOrdersSell = ordersHistoryDataSell.map(item => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.date}</td>
          <td>{`${item.total} CUB`}</td>
          <td>
            <Link to={{
              pathname: `/ordersManagement/orderDetails/${item.id}`,
              state: {
                orderType: '1',
                id: item.id,
                date: item.date,
                total: item.total,
                products: item.products,
                quantities: item.productQuantities,
                buyer: item.buyer,
              },
            }}
            >
              <Button type="button">Details</Button>
            </Link>
          </td>
        </tr>
      ));
    }


    if (allOrdersPurchase !== null) {
      allOrdersPurchasePrint = (
        <Container>
          <h2>Purchases Orders</h2>
          <br />
          <Table striped bordered hover>
            <thead>
              <tr key="0">
                <th>Order Id</th>
                <th>Date</th>
                <th>Total</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {allOrdersPurchase}
            </tbody>
          </Table>
        </Container>
      );
    } else {
      allOrdersPurchasePrint = <AlertMessage variant="info" message="No purchases." />;
    }

    if (allOrdersSell !== null) {
      allOrdersSellPrint = (
        <Container>
          <h2>Sells Orders</h2>
          <br />
          <Table striped bordered hover>
            <thead>
              <tr key="0">
                <th>Id</th>
                <th>Date</th>
                <th>Total</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {allOrdersSell}
            </tbody>
          </Table>
        </Container>
      );
    } else {
      allOrdersSellPrint = <AlertMessage variant="info" message="No sells." />;
    }

    return (
      <Container>
        <Link to="/profile">
          <Button variant="dark" size="lg" style={{ marginBottom: '2%' }}>
            Back to all actions
          </Button>
        </Link>
        <Tabs defaultActiveKey="purchases" id="uncontrolled-tab-example" style={{ marginBottom: '2%' }}>
          <Tab eventKey="purchases" title="Purchases">
            {isLoading ? <LoadingSpinner /> : allOrdersPurchasePrint}
          </Tab>
          <Tab eventKey="sales" title="Sales">
            {isLoading ? <LoadingSpinner /> : allOrdersSellPrint}
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

OrdersManagement.propTypes = {
  isLoading: PropTypes.bool,
  // eslint-disable-next-line
  ordersHistoryDataPurchase: PropTypes.array,
  // eslint-disable-next-line
  ordersHistoryDataSell: PropTypes.array,
  getOrdersHistory: PropTypes.func.isRequired,
};

OrdersManagement.defaultProps = {
  isLoading: false,
};

export default OrdersManagement;
