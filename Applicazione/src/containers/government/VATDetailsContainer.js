import { connect } from 'react-redux';
import {
  getVATHistory,
  payVAT,
} from '../../actions/business/VATManagementActions';
import VATDetails from '../../components/government/VATDetails';

function mapStateToProps(state) {
  return {
    VATHistory: state.business.VATHistory,
  };
}
const mapDispatchToProps = dispatch => ({
  getVATHistory: (address) => {
    dispatch(getVATHistory(address));
  },
  payVAT: (item, address) => {
    dispatch(payVAT(item, address));
  },
});

const VATDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(VATDetails);

export default VATDetailsContainer;
