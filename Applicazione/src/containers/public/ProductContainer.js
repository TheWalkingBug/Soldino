import { connect } from 'react-redux';
import { addQuantity, addToCart, subtractQuantity } from '../../actions/public/CartActions';
import ProductCard from '../../components/public/ProductCard';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  addToCart: (id, qty) => {
    dispatch(addToCart(id, qty));
  },
  addQuantity: (id) => {
    dispatch(addQuantity(id));
  },
  subtractQuantity: (id) => {
    dispatch(subtractQuantity(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
