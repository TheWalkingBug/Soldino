import { connect } from 'react-redux';
import ProductsManagement from '../../components/business/ProductsManagement';
import { getProductsList, removeProduct } from '../../actions/business/ProductsManagementActions';

function mapStateToProps(state) {
  return {
    productsList: state.business.productsList,
    isLoading: state.fetchData.isLoading,
  };
}
const mapDispatchToProps = dispatch => ({
  getProductsList: () => {
    dispatch(getProductsList());
  },
  removeProduct: (id) => {
    dispatch(removeProduct(id));
  },
});

const ProductsManagementContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductsManagement);

export default ProductsManagementContainer;
