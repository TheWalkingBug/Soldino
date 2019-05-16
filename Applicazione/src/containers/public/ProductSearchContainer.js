import { connect } from 'react-redux';
import ProductSearch from '../../components/public/ProductSearch';
import { searchProducts, clearSearch } from '../../actions/public/SearchActions';

const mapStateToProps = state => ({
  items: state.cart.items,
  result: state.search.result,
  isLoading: state.fetchData.isLoading,
});

const mapDispatchToProps = dispatch => ({
  searchProducts: (query) => {
    dispatch(searchProducts(query));
  },
  clearSearch: () => {
    dispatch(clearSearch());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductSearch);
