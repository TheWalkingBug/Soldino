import { connect } from 'react-redux';
import CitizenHome from '../../components/citizen/CitizenHome';

const mapStateToProps = state => ({
  authData: state.user.data,
});

const mapDispatchToProps = dispatch => ({});

const CitizenHomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CitizenHome);

export default CitizenHomeContainer;
