import { connect } from 'react-redux';
import BusinessHome from '../../components/business/BusinessHome';

const mapStateToProps = state => ({
  authData: state.user.data,
});

const mapDispatchToProps = dispatch => ({});

const BusinessHomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BusinessHome);

export default BusinessHomeContainer;
