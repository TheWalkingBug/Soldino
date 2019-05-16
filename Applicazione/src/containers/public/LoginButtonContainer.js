import { connect } from 'react-redux';
import LoginButton from '../../components/public/LoginButton';
import { loginUser } from '../../actions/public/LoginButtonActions';

const mapStateToProps = (/* state, ownProps */) => ({});

const mapDispatchToProps = dispatch => ({
  onLoginUserClick: () => {
    dispatch(loginUser());
  },
});

const LoginButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginButton);

export default LoginButtonContainer;
