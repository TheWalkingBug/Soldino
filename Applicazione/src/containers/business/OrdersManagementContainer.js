import { connect } from 'react-redux';
import OrdersManagement from '../../components/business/OrdersManagement';
import { getOrdersHistory } from '../../actions/public/OrdersHistoryActions';

function mapStateToProps(state) {
  return {
    isLoading: state.fetchData.isLoading,
    ordersHistoryDataPurchase: state.orders.purchase,
    ordersHistoryDataSell: state.orders.sell,
  };
}
const mapDispatchToProps = dispatch => ({
  getOrdersHistory: () => {
    dispatch(getOrdersHistory());
  },
});

const OrdersManagementContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrdersManagement);

export default OrdersManagementContainer;
