import { connect } from 'react-redux';
import LogoutButton from '../../components/public/LogoutButton';
import { logoutUser } from '../../actions/public/LogoutButtonActions';

const mapStateToProps = (/* state, ownProps */) => ({});

const mapDispatchToProps = dispatch => ({
  onLogoutUserClick: (event) => {
    event.preventDefault();

    dispatch(logoutUser());
  },
});

const LogoutButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogoutButton);

export default LogoutButtonContainer;
