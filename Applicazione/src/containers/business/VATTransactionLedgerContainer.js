import { connect } from 'react-redux';
import VATTransactionLedger from '../../components/business/VATTransactionLedger';
import { getVATHistory } from '../../actions/business/VATManagementActions';
import { getOrdersHistory } from '../../actions/public/OrdersHistoryActions';

function mapStateToProps(state) {
  return {
    VATHistory: state.business.VATHistory,
    OrdersHistory: state.orders,
  };
}
const mapDispatchToProps = dispatch => ({

  getVATHistory: () => {
    dispatch(getVATHistory());
  },
  getOrdersHistory: () => {
    dispatch(getOrdersHistory());
  },
});

const VATTransactionLedgerContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(VATTransactionLedger);

export default VATTransactionLedgerContainer;
