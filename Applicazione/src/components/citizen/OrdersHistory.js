import React from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import AlertMessage from '../public/AlertMessage';
import LoadingSpinner from '../public/LoadingSpinner';

class OrdersHistory extends React.Component {
  componentDidMount() {
    const { getOrdersHistory } = this.props;
    getOrdersHistory();
  }

  render() {
    let allOrders = null;
    const { ordersHistoryData, isLoading } = this.props;
    if (ordersHistoryData !== null) {
      if (ordersHistoryData.length !== 0) {
        allOrders = ordersHistoryData.map(item => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.date}</td>
            <td>{`${item.total} CUB`}</td>
            <td>
              <Link
                to={{
                  pathname: `/ordersHistory/orderDetails/${item.id}`,
                  state: {
                    id: item.id,
                    date: item.date,
                    total: item.total,
                    products: item.products,
                    quantities: item.productQuantities,
                    seller: item.seller,
                  },
                }}
              >
                <Button type="button" variant="info">Details</Button>
              </Link>
            </td>
          </tr>
        ));
      }
    }

    let allOrdersToPrint = null;

    if (allOrders !== null) {
      allOrdersToPrint = (
        <Table striped bordered hover>
          <thead>
            <tr key="0">
              <th>Order Id</th>
              <th>Date</th>
              <th>Total</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>{allOrders}</tbody>
        </Table>
      );
    } else {
      allOrdersToPrint = <AlertMessage variant="info" message="No orders." />;
    }

    return (
      <Container>
        <h2>Orders History</h2>
        <br />
        {isLoading ? <LoadingSpinner /> : allOrdersToPrint}
      </Container>
    );
  }
}

OrdersHistory.propTypes = {
  isLoading: PropTypes.bool,
  // eslint-disable-next-line
  ordersHistoryData: PropTypes.array,
  getOrdersHistory: PropTypes.func.isRequired,
};

OrdersHistory.defaultProps = {
  isLoading: false,
};

export default OrdersHistory;
