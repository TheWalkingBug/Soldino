import { connect } from 'react-redux';
import SignUpCitizenForm from '../../components/public/SignUpCitizenForm';
import { signUpUser } from '../../actions/public/SignUpCitizenFormActions';

const mapStateToProps = (/* state, ownProps */) => ({});

const mapDispatchToProps = dispatch => ({
  onSignUpCitizenFormSubmit: (name, surname, fiscalCode, email) => {
    dispatch(signUpUser(name, surname, fiscalCode, email));
  },
});

const SignUpCitizenFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpCitizenForm);

export default SignUpCitizenFormContainer;
