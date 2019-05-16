import React from 'react';
import {
  Card, Button, Container,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import AlertMessage from './AlertMessage';

const Cart = (props) => {
  const {
    items,
    total,
    addQuantity,
    subtractQuantity,
    buy,
    removeItem,
    userType,
    userData,
  } = props;

  console.log(props);

  const addedItems = items.length
    ? (
      items.map(item => (
        <Card key={item.id} bg="dark" text="light" style={{ width: '100%' }}>
          <div>
            <div className="productImage">
              <Link to={{
                pathname: `/product/${item.id}`,
                state: item,
              }}
              >
                <Card.Img style={{ objectFit: 'scale-down' }} src={item.imagePreview} />
              </Link>
            </div>
            <Card.Body style={{ marginLeft: '30%' }}>
              <Link to={{
                pathname: `/product/${item.id}`,
                state: item,
              }}
              >
                <h2>{item.name}</h2>
              </Link>
              <h3>
                <b>Price: </b>
                {item.price}
                {' '}
                                CUB
              </h3>
              <Card.Text>{item.description}</Card.Text>
              <div style={{ float: 'right' }}>
                <h3>
                                    Quantity:
                  {' '}
                  {item.quantity}
                </h3>
                <Button
                  style={{ marginRight: '0.5em' }}
                  variant="info"
                  onClick={() => {
                    subtractQuantity(item.id);
                  }}
                >
                  -
                </Button>
                <Button
                  style={{ marginRight: '0.5em' }}
                  variant="info"
                  onClick={() => {
                    if (item.quantity < item.availability) {
                      addQuantity(item.id);
                    }
                  }}
                >
                                    +
                </Button>
                <Button
                  style={{ marginRight: '0.5em' }}
                  variant="danger"
                  onClick={() => {
                    removeItem(item.id);
                  }}
                >
                                    Remove
                </Button>
                <p style={{ marginTop: '5%' }}>
                  <b>Availability: </b>
                  {' '}
                  {`${item.availability} units`}
                </p>
              </div>
            </Card.Body>
          </div>
        </Card>
      ))
    ) : (<AlertMessage variant="info" message="The cart is empty." />);

  let printTotal;

  if (parseFloat(total.toFixed(2)) !== 0.00) {
    printTotal = (
      <div>
        <h4>
                    Total:
          {' '}
          {total.toFixed(2)}
          {' '}
                    CUB
        </h4>
        <Button
          type="submit"
          variant="warning"
          size="lg"
          disabled={userType === 0
        || userData.balance < total}
          onClick={() => buy(items)}
        >
Checkout
        </Button>
      </div>
    );
  }

  return (
    <Container>
      <div>
        {userType === 0 ? (
          <AlertMessage
            variant="warning"
            message="You must login in order to place an order."
          />
        ) : null}
        {userType !== 0 && userData.balance < total ? (
          <AlertMessage
            variant="danger"
            message="You haven't enough Cubit to place this order."
          />
        ) : null}
        <h1 style={{ textAlign: 'center', margin: '1em' }}>Cart</h1>
        {addedItems}
      </div>
      {printTotal}
    </Container>
  );
};


Cart.propTypes = {
  // eslint-disable-next-line
    addQuantity: PropTypes.func.isRequired,
  subtractQuantity: PropTypes.func.isRequired,
  buy: PropTypes.func.isRequired,
  // eslint-disable-next-line
    items: PropTypes.array.isRequired,
  removeItem: PropTypes.func.isRequired,
  // eslint-disable-next-line
    total: PropTypes.number.isRequired,
  userType: PropTypes.number.isRequired,
  // eslint-disable-next-line
  userData: PropTypes.object,

};

Cart.defaultProps = {
  // eslint-disable-next-line
    items: [],
  // eslint-disable-next-line
    total: 0,
};

export default Cart;
