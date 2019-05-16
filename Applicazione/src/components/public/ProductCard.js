import React from 'react';
import {
  Card, Button,
} from 'react-bootstrap';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

const ProductCard = (props) => {
  const { prodInfo } = props;

  return (
    <Card style={{ width: '18rem', marginRight: '8%' }}>
      <Link to={{
        pathname: `/product/${prodInfo.id}`,
        state: prodInfo,
      }}
      >
        <Card.Img variant="top" src={prodInfo.imagePreview} />
      </Link>
      <Card.Body>
        <Card.Title>
          <Link to={{
            pathname: `/product/${prodInfo.id}`,
            state: prodInfo,
          }}
          >
            <span>{prodInfo.name}</span>
          </Link>
        </Card.Title>
        <Card.Text>
          {prodInfo.description}
        </Card.Text>
        <Card.Text>
          <b>Availability: </b>
          {`${prodInfo.availability} `}
        </Card.Text>
        <Card.Text>
          <b>Price: </b>
          {` ${prodInfo.price} CUB`}
        </Card.Text>
        <Link to="/cart">
          <Button
            style={{ float: 'right' }}
            variant="warning"
            onClick={() => {
              props.addToCart({
                ...prodInfo,
                quantity: 1,
              });
            }}
            disabled={prodInfo.availability < 1}
          >
            {prodInfo.availability < 1 ? 'Out of stock' : 'Add to cart'}
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

ProductCard.propTypes = {
  // eslint-disable-next-line
    prodInfo: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default ProductCard;
