import { connect } from 'react-redux';
import EconomyForm from '../../components/government/EconomyForm';
import {
  mintCubit,
  distributeCubit,
  getUsersList,
} from '../../actions/government/EconomyFormActions';

const mapStateToProps = state => ({
  data: state.user.data,
  users: state.government.users,
  isLoading: state.fetchData.isLoading,
});

const mapDispatchToProps = dispatch => ({
  onMintFormSubmit: (amountMint) => {
    // event.preventDefault();

    dispatch(mintCubit(amountMint));
  },
  onDistributeFormSubmit: (usersToDist, amountDist) => {
    // event.preventDefault();
    dispatch(distributeCubit(usersToDist, amountDist));
  },
  getUsersList: () => {
    // event.preventDefault();

    dispatch(getUsersList());
  },
});

const EconomyFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EconomyForm);

export default EconomyFormContainer;
