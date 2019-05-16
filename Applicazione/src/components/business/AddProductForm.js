import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import PropTypes from "prop-types";
import {
  isPositive,
  isPositiveInteger,
  isOnlyNumbersAndADot, onlyIntegerNumbers,
} from "../../util/inputValidation";
import { Link } from "react-router";
import ModalCustom from "../public/ModalCustom";

class AddProductForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      availability: "",
      VAT: "",
      description: "",
      price: "",
      imagePreview: "",
      formValid: false,
      nameValid: false,
      availabilityValid: false,
      VATValid: false,
      descriptionValid: false,
      priceValid: false,
      file: "",
      imageValid: false,
      modalShow: false,
      errors: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreview: reader.result
      });
    };

    if (file) {
      const fileType = file["type"];
      const validImageTypes = ["image/jpeg", "image/png", "image/svg"];
      if (validImageTypes.includes(fileType)) {
        this.setState({
          imageValid: true
        });
        reader.readAsDataURL(file);
      } else {
        this.setState({
          imagePreview: "",
          imageValid: false
        });
      }
    } else {
      this.setState({
        file: "",
        imagePreview: "",
        imageValid: false,
      });
    }
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.nameValid &&
        this.state.VATValid &&
        this.state.descriptionValid &&
        this.state.priceValid &&
        this.state.availabilityValid
    });
  }

  validateField(fieldName, value) {
    let nameValid = this.state.nameValid;
    let VATValid = this.state.VATValid;
    let availabilityValid = this.state.availabilityValid;
    let descriptionValid = this.state.descriptionValid;
    let priceValid = this.state.priceValid;

    switch (fieldName) {
      case "name":
        nameValid = value.length > 2 && value.length<100;
        break;
      case "VAT":
        VATValid =
          value.toString() === "4" ||
          value.toString() === "10" ||
          value.toString() === "22";
        break;
      case "availability":
        availabilityValid = onlyIntegerNumbers(value) && isPositiveInteger(value);
        break;
      case "description":
        descriptionValid = value.length > 1;
        break;
      case "price":
        priceValid = isOnlyNumbersAndADot(value) && isPositive(value);
        break;
      default:
        break;
    }
    this.setState(
      {
        nameValid: nameValid,
        VATValid: VATValid,
        descriptionValid: descriptionValid,
        availabilityValid: availabilityValid,
        priceValid: priceValid,
      },
      this.validateForm
    );
  }

  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  handleSubmit(event) {
    event.preventDefault();

    const { props, state } = this;

    const {
      name, availability, VAT, description, price, nameValid, availabilityValid,
      VATValid, descriptionValid, priceValid, formValid, imageValid, imagePreview
    } = state;

    this.setState({
      formValid: nameValid && availabilityValid && VATValid && descriptionValid && priceValid && imageValid
    });

    if (formValid) {
      props.addProduct({
        name,
        availability,
        VAT,
        description,
        price,
        imagePreview
      });
    } else {
      let errors = [];
      if(!nameValid) {
        errors.push("Name must contain at least three characters and 100 max.");
      }
      if(!availabilityValid) {
        errors.push("Availability must be an integer number.");
      }
      if(!VATValid) {
        errors.push("VAT must be 4% or 10% or 22%.");
      }
      if(!descriptionValid) {
        errors.push("Description must contain at least two characters.");
      }
      if(!priceValid) {
        errors.push("Price must be greater then zero and contain only numbers.");
      }
      if(!imageValid) {
        errors.push("Invalid image file. Accepted file: .png, .jpg, .svg");
      }
      this.setState({modalShow: true, errors: errors});
    }
  }

  render() {
    const {
      name,
      availability,
      VAT,
      description,
      price,
      modalShow,
      errors
    } = this.state;

    let { imagePreview } = this.state;
    let $imagePreview = null;
    if (imagePreview) {
      $imagePreview = <img src={imagePreview} alt={this.name + ' image'}/>;
    }

    let modalClose = () => this.setState({ modalShow: false });

    return (
      <Container>
        <Link to="/profile/productsManagement">
          <Button variant="dark" size="lg">
            Back to products management
          </Button>
        </Link>
        <Row>
          <h1>Add a product</h1>
        </Row>

        <Card
          border="dark"
          bg="light"
          className="text-center"
          style={{ margin: "auto", width: "75%" }}
        >
          <Card.Title as="h3">
            Compile and submit to add a new product
          </Card.Title>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group as={Row} controlId="name">
              <Form.Label column sm="3" className="text-right">
                Name
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  value={name}
                  name={"name"}
                  onChange={this.handleUserInput}
                  placeholder="Name"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="VAT">
              <Form.Label column sm="3" className="text-right">
                VAT
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  as="select"
                  value={VAT}
                  name={"VAT"}
                  onChange={this.handleUserInput}
                >
                  <option>Select VAT category (%)</option>
                  <option>4</option>
                  <option>10</option>
                  <option>22</option>
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="availability">
              <Form.Label column sm="3" className="text-right">
                Availability
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="number"
                  value={availability}
                  min={0}
                  name={"availability"}
                  onChange={this.handleUserInput}
                  placeholder="Availability"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="description">
              <Form.Label column sm="3" className="text-right">
                Description
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  value={description}
                  name={"description"}
                  onChange={this.handleUserInput}
                  placeholder="Description"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="price">
              <Form.Label column sm="3" className="text-right">
                Price
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  value={price}
                  name={"price"}
                  onChange={this.handleUserInput}
                  placeholder="Price"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="image">
              <Form.Label column sm="3" className="text-right">
                Image
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type={"file"}
                  name={"image"}
                  onChange={(e) => {this.handleImageChange(e); this.handleUserInput(e)}}
                  placeholder="Image"
                />
              </Col>
            </Form.Group>
            {$imagePreview}
            <br />
            <Button
              variant="success"
              type="submit"
              onClick={this.handleSubmit}
            >
              Add product
            </Button>
          </Form>
        </Card>
        <ModalCustom
            show={modalShow}
            title={"Form not valid!"}
            description={errors}
            onHide={modalClose}
        />
      </Container>
    );
  }
}

AddProductForm.propTypes = {
  // eslint-disable-next-line
  addProduct: PropTypes.func.isRequired
};

export default AddProductForm;
