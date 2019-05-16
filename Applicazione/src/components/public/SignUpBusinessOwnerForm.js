import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';
import {isValidEmail, isValidVAT } from '../../util/inputValidation';
import ModalCustom from "./ModalCustom";

class SignUpBusinessOwnerForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      businessName: '',
      location: '',
      VATNumber: '',
      CE: '',
      businessNameValid: false,
      locationValid: false,
      VATNumberValid: false,
      CEValid: false,
      formValid: false,
      modalShow: false,
      errors: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    this.setState({
      formValid: this.state.businessNameValid && this.state.locationValid && this.state.CEValid
          && this.state.VATNumberValid,
    });
  }

  validateField(fieldName, value) {
    let businessNameValid = this.state.businessNameValid;
    let locationValid = this.state.locationValid;
    let VATNumberValid = this.state.VATNumberValid;
    let CEValid = this.state.CEValid;

    switch (fieldName) {
      case 'businessName':
        businessNameValid = value.length > 2;
        break;
      case 'VATNumber':
        VATNumberValid = value.length > 2 && isValidVAT(value);
        break;
      case 'location':
        locationValid = value.length > 2;
        break;
      case 'CE':
        CEValid = isValidEmail(value);
        break;
      default:
        break;
    }
    this.setState(
      {
        businessNameValid,
        locationValid,
        VATNumberValid,
        CEValid,
      },
      this.validateForm,
    );
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  handleSubmit(event) {
    event.preventDefault();

    const {
      props, state,
    } = this;

    const {
      businessName, location, VATNumber, CE, businessNameValid, locationValid, VATNumberValid, CEValid, formValid
    } = state;

    this.setState({
      formValid: businessNameValid && locationValid
          && VATNumberValid && CEValid,
    });

    if(formValid) {
      props.onSignUpBusinessOwnerFormSubmit(businessName, location, VATNumber, CE);
    } else {
      let errors = [];
      if(!businessNameValid) {
        errors.push("Business name must contain at least three characters");
      }
      if(!locationValid) {
        errors.push("Location must contain at least three characters.");
      }
      if(!VATNumberValid) {
        errors.push("VAT number must be eleven digit.");
      }
      if(!CEValid) {
        errors.push("Certified email is not valid.");
      }
      this.setState({modalShow: true, errors: errors});
    }
  }

  render() {
    const {
      businessName, location, VATNumber, CE, modalShow, errors
    } = this.state;

    let modalClose = () => this.setState({ modalShow: false });

    return (
      <Container>
        <Row><h1>Sign up as a Business Owner</h1></Row>

        <Card border="dark" bg="light" className="text-center" style={{ margin: 'auto', width: '75%' }}>
          <Card.Title as="h3">Compile and submit to register</Card.Title>


          <Form onSubmit={this.handleSubmit}>

            <Form.Group as={Row} controlId="businessName">
              <Form.Label column sm="3" className="text-right">Business Name</Form.Label>
              <Col sm="8">
                <Form.Control type="text" value={businessName} name={"businessName"} onChange={this.handleUserInput} placeholder="Business Name" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="VATNumber">
              <Form.Label column sm="3" className="text-right">VAT Number</Form.Label>
              <Col sm="8">
                <Form.Control type="text" value={VATNumber} name={"VATNumber"} onChange={this.handleUserInput} placeholder="VAT Number" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="location">
              <Form.Label column sm="3" className="text-right">Location</Form.Label>
              <Col sm="8">
                <Form.Control type="text" value={location} name={"location"} onChange={this.handleUserInput} placeholder="Location" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="CE">
              <Form.Label column sm="3" className="text-right">Certified E-mail</Form.Label>
              <Col sm="8">
                <Form.Control type="email" value={CE} name={"CE"} onChange={this.handleUserInput} placeholder="Certified E-Mail" />
              </Col>
            </Form.Group>

            <Button variant="info" type="submit" >
                SIGN UP
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

SignUpBusinessOwnerForm.propTypes = {
  // eslint-disable-next-line
  onSignUpBusinessOwnerFormSubmit: PropTypes.func.isRequired
};

export default SignUpBusinessOwnerForm;
