import { connect } from 'react-redux';
import VATLedger from '../../components/business/VATLedger';
import { getOrdersHistory } from '../../actions/public/OrdersHistoryActions';

function mapStateToProps(state) {
  return {
    OrdersHistory: state.orders,
  };
}
const mapDispatchToProps = dispatch => ({

  getOrdersHistory: () => {
    dispatch(getOrdersHistory());
  },
});

const VATLedgerContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(VATLedger);

export default VATLedgerContainer;
