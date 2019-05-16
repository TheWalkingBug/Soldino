import React from 'react';
import {
  Card, Button, Container,
} from 'react-bootstrap';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

class ProductPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 0,
    };

    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
  }

  componentDidMount() {
    const { location } = this.props;
    const av = location.state.availability;
    this.setState({ quantity: av < 1 ? 0 : 1 });
  }


  increaseQuantity() {
    const { quantity } = this.state;
    const { location } = this.props;

    if (quantity < location.state.availability) {
      this.setState({ quantity: quantity + 1 });
    }
  }

  decreaseQuantity() {
    const { quantity } = this.state;
    if (quantity > 1) {
      this.setState({ quantity: quantity - 1 });
    }
  }


  render() {
    const {
      props, state,
    } = this;

    return (
      <Container>
        <Link to="/products">
          <Button variant="dark" size="lg">
                Back to Search
          </Button>
        </Link>
        <Card bg="dark" text="light" style={{ width: '100%', marginTop: '2%' }}>
          <div>
            <div className="productImage">
              <Card.Img style={{ objectFit: 'scale-down' }} src={props.location.state.imagePreview} />
            </div>
            <Card.Body style={{ marginLeft: '30%' }}>
              <h2>{props.location.state.name}</h2>
              <h3>
                        Price:
                {' '}
                {props.location.state.price}
                {' '}
                        CUB
              </h3>
              <Card.Text>
                {props.location.state.description}
              </Card.Text>

              <div style={{ float: 'right' }}>
                <Button
                  type="button"
                  variant="info"
                  style={{ marginRight: '1em' }}
                  onClick={this.decreaseQuantity}
                >
                -
                </Button>
                <b style={{ marginRight: '0.5em' }}>
                            Quantity:
                  {' '}
                  {state.quantity}
                </b>
                <Button
                  type="button"
                  variant="info"
                  style={{ marginRight: '0.5em' }}
                  onClick={this.increaseQuantity}
                >
                +
                </Button>
                <Link to="/cart">
                  <Button
                    type="button"
                    variant="warning"
                    onClick={() => {
                      props.addToCart({
                        ...props.location.state,
                        quantity: state.quantity,
                      });
                    }}
                    disabled={props.location.state.availability < 1}
                  >
                    {props.location.state.availability < 1 ? 'Out of stock' : 'Add to cart'}
                  </Button>
                </Link>
                <p style={{ marginTop: '5%' }}>
                  <b>Availability: </b>
                  {' '}
                  {`${props.location.state.availability} units`}
                </p>
              </div>
            </Card.Body>
          </div>
        </Card>
      </Container>
    );
  }
}


ProductPage.propTypes = {
  // eslint-disable-next-line
    location: PropTypes.object.isRequired,
  // eslint-disable-next-line
  addToCart: PropTypes.func.isRequired,
};

export default ProductPage;
