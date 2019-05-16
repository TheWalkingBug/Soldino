import { connect } from 'react-redux';
import VATManagement from '../../components/business/VATManagement';
import { payVAT, getVATHistory, refuseVAT } from '../../actions/business/VATManagementActions';
import { getOrdersHistory } from '../../actions/public/OrdersHistoryActions';

function mapStateToProps(state) {
  return {
    VATHistory: state.business.VATHistory,
    OrdersHistory: state.orders,
    isLoading: state.fetchData.isLoading,
  };
}
const mapDispatchToProps = dispatch => ({

  getVATHistory: () => {
    dispatch(getVATHistory());
  },
  getOrdersHistory: () => dispatch(getOrdersHistory()),
  payVAT: (item) => {
    dispatch(payVAT(item));
  },
  refuseVAT: (item) => {
    dispatch(refuseVAT(item));
  },
});

const VATManagementContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(VATManagement);

export default VATManagementContainer;
