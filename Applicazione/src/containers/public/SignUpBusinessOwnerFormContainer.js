import { connect } from 'react-redux';
import SignUpBusinessOwnerForm from '../../components/public/SignUpBusinessOwnerForm';
import { signUpUser } from '../../actions/public/SignUpBusinessOwnerFormActions';

const mapStateToProps = (/* state, ownProps */) => ({});

const mapDispatchToProps = dispatch => ({
  onSignUpBusinessOwnerFormSubmit: (businessName, location, VATNumber, CE) => {
    dispatch(signUpUser(businessName, location, VATNumber, CE));
  },
});

const SignUpBusinessOwnerFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpBusinessOwnerForm);

export default SignUpBusinessOwnerFormContainer;
