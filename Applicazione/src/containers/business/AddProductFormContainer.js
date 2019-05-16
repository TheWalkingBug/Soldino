import { connect } from 'react-redux';
import AddProductForm from '../../components/business/AddProductForm';
import { addProduct } from '../../actions/business/ProductsManagementActions';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  addProduct: (productInfo) => {
    dispatch(addProduct(productInfo));
  },
});

const AddProductFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddProductForm);

export default AddProductFormContainer;
