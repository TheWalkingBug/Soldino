import { connect } from 'react-redux';
import ModifyProductForm from '../../components/business/ModifyProductForm';
import { modifyProduct } from '../../actions/business/ProductsManagementActions';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  modifyProduct: (productInfo) => {
    dispatch(modifyProduct(productInfo));
  },
});

const ModifyProductFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModifyProductForm);

export default ModifyProductFormContainer;
