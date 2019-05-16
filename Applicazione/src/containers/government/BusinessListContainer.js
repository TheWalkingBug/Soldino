import { connect } from 'react-redux';
import {
  getBusinessInfo, removeBusiness,
} from '../../actions/government/BusinessRequestActions';
import BusinessList from '../../components/government/BusinessList';

const mapStateToProps = state => ({
  businessInfo: state.government.businessInfo,
  isLoading: state.fetchData.isLoading,
});

const mapDispatchToProps = dispatch => ({
  getBusinessInfo: () => {
    dispatch(getBusinessInfo(true));
  },
  removeBusiness: (address) => {
    dispatch(removeBusiness(address));
  },
});

const BusinessListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BusinessList);

export default BusinessListContainer;
