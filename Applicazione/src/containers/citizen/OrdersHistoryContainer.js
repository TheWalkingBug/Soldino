import { connect } from 'react-redux';
import OrdersHistory from '../../components/citizen/OrdersHistory';
import { getOrdersHistory } from '../../actions/public/OrdersHistoryActions';

function mapStateToProps(state) {
  return {
    ordersHistoryData: state.orders.purchase,
    isLoading: state.fetchData.isLoading,
  };
}
const mapDispatchToProps = dispatch => ({
  getOrdersHistory: () => {
    dispatch(getOrdersHistory());
  },
});

const OrdersHistoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrdersHistory);

export default OrdersHistoryContainer;
