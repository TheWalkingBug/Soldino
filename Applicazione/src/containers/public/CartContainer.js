import { connect } from 'react-redux';
import {
  addQuantity, removeItem, subtractQuantity, buyCart,
} from '../../actions/public/CartActions';
import Cart from '../../components/public/Cart';

const mapStateToProps = state => ({
  items: state.cart.addedItems,
  total: state.cart.total,
  userType: state.user.type,
  userData: state.user.data,
});

const mapDispatchToProps = dispatch => ({
  removeItem: (id) => {
    dispatch(removeItem(id));
  },
  addQuantity: (id) => {
    dispatch(addQuantity(id));
  },
  subtractQuantity: (id) => {
    dispatch(subtractQuantity(id));
  },
  buy: (items) => {
    dispatch(buyCart(items));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
