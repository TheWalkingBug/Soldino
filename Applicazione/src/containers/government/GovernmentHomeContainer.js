import { connect } from 'react-redux';
import GovernmentHome from '../../components/government/GovernmentHome';

const mapStateToProps = state => ({
  authData: state.user.data,
});

const mapDispatchToProps = dispatch => ({});

const GovernmentHomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GovernmentHome);

export default GovernmentHomeContainer;
