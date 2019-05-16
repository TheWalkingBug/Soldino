import React from 'react';
import Container from 'react-bootstrap/Container';
import { Form, Button, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ProductContainer from '../../containers/public/ProductContainer';
import LoadingSpinner from './LoadingSpinner';
import AlertMessage from './AlertMessage';


class ProductSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
    };

    this.handleQueryValue = this.handleQueryValue.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleQueryValue(event) {
    this.setState({ query: event.target.value });
  }

  handleKeyDown(event) {
    event.preventDefault();
  }

  render() {
    const {
      searchProducts,
      clearSearch,
      result,
      isLoading,
    } = this.props;

    const {
      query,
    } = this.state;

    let searchRes = null;
    if (result !== null) {
      if (result.length !== 0) {
        searchRes = result.map(item => (
          <ProductContainer
            key={item.id}
            prodInfo={item}
          />
        ));
      }
    }

    const error = <AlertMessage variant="info" message="No results found." />;

    return (
      <div>
        <Container>
          <h2 className="productFormTitle">Search for products</h2>
          <div style={{ textAlign: 'center' }}>
            <Form onSubmit={this.handleKeyDown} className="productFormSearch">
              <Form.Control size="lg" placeholder="e.g. Vans, White, Adidas, Blues" onChange={this.handleQueryValue} />
              <Button
                variant="info"
                type="submit"
                size="lg"
                className="searchButton"
                onClick={() => searchProducts(query)}
              >
Search
              </Button>
              <Button
                variant="info"
                type="submit"
                size="lg"
                className="searchButton"
                onClick={() => clearSearch()}
              >
                    Clear results
              </Button>
            </Form>
          </div>
          {isLoading ? <LoadingSpinner /> : <Row>{searchRes}</Row> }
          {result !== null && searchRes === null ? error : null }
        </Container>
      </div>
    );
  }
}

ProductSearch.propTypes = {
  isLoading: PropTypes.bool,
  // eslint-disable-next-line
  items: PropTypes.array,
  // eslint-disable-next-line
    result: PropTypes.array,
  searchProducts: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
};

ProductSearch.defaultProps = {
  isLoading: false,
};

export default ProductSearch;
