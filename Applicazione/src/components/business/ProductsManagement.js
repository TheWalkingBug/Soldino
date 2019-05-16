import React from 'react';
import {
  Button,
  Container,
  Table,
  Row,
} from 'react-bootstrap';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import AlertMessage from '../public/AlertMessage';
import LoadingSpinner from '../public/LoadingSpinner';

class ProductsManagement extends React.Component {
  componentDidMount() {
    const { getProductsList } = this.props;
    getProductsList();
  }

  render() {
    const { productsList, removeProduct, isLoading } = this.props;
    let allProducts = null;

    if (productsList !== null) {
      if (productsList.length !== 0) {
        allProducts = productsList.map(item => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.availability}</td>
            <td>{item.VAT}</td>
            <td>{item.price}</td>
            <td>
              <Link to={{
                pathname: `/productsManagement/ModifyProduct/${item.id}`,
                state: item,
              }}
              >
                <Button type="button" variant="warning">Modify</Button>
              </Link>
            </td>
            <td>
              <Button type="button" variant="danger" onClick={() => removeProduct(item.id)}>Remove</Button>
            </td>
          </tr>
        ));
      }
    }

    let allProductsToPrint = null;

    if (allProducts !== null) {
      allProductsToPrint = (
        <Table striped bordered hover>
          <thead>
            <tr key={-1}>
              <th>Id</th>
              <th>Name</th>
              <th>Description</th>
              <th>Availability</th>
              <th>VAT</th>
              <th>Price</th>
              <th>Modify</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            { allProducts }
          </tbody>
        </Table>
      );
    } else {
      allProductsToPrint = <AlertMessage variant="info" message="No products." />;
    }

    return (
      <Container>
        <Link to="/profile">
          <Button variant="dark" size="lg">
                  Back to all actions
          </Button>
        </Link>
        <h2>Products Management</h2>
        <Row className="justify-content-md-center">
          <Link to="/profile/AddProducts">
            <Button variant="success" size="lg">
                            Add a product
            </Button>
          </Link>
        </Row>
        <br />
        {isLoading ? <LoadingSpinner /> : allProductsToPrint}
      </Container>
    );
  }
}

ProductsManagement.propTypes = {
  isLoading: PropTypes.bool,
  // eslint-disable-next-line
    productsList: PropTypes.array,
  // eslint-disable-next-line
    removeProduct: PropTypes.func.isRequired,
  // eslint-disable-next-line
    getProductsList: PropTypes.func.isRequired,
};

ProductsManagement.defaultProps = {
  isLoading: false,
};

export default ProductsManagement;
