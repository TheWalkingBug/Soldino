import { connect } from 'react-redux';
import GovernmentFinancial from '../../components/government/GovernmentFinancial';
import {
  getBusinessInfo,
} from '../../actions/government/BusinessRequestActions';

const mapStateToProps = state => ({
  businessInfo: state.government.businessInfo,
  isLoading: state.fetchData.isLoading,
});

const mapDispatchToProps = dispatch => ({
  getBusinessInfo: () => {
    dispatch(getBusinessInfo(true));
  },
});

const GovernmentFinancialContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GovernmentFinancial);

export default GovernmentFinancialContainer;
