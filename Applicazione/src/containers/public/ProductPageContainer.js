import { connect } from 'react-redux';
import { addToCart } from '../../actions/public/CartActions';
import ProductPage from '../../components/public/ProductPage';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  addToCart: (id, qty) => {
    dispatch(addToCart(id, qty));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
