import { connect } from 'react-redux';
import {
  acceptBusiness,
  getBusinessInfo, rejectBusiness,
} from '../../actions/government/BusinessRequestActions';
import ManageBusiness from '../../components/government/ManageBusiness';

const mapStateToProps = state => ({
  businessInfo: state.government.businessInfo,
  isLoading: state.fetchData.isLoading,
});

const mapDispatchToProps = dispatch => ({
  getBusinessInfo: () => {
    dispatch(getBusinessInfo(false));
  },
  acceptBusiness: (address) => {
    dispatch(acceptBusiness(address));
  },
  rejectBusiness: (address) => {
    dispatch(rejectBusiness(address));
  },
});

const ManageBusinessContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageBusiness);

export default ManageBusinessContainer;
