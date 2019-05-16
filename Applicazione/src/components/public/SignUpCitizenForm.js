import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import {
  isOnlyCharacters, isValidEmail, isValidFiscalCode,
} from '../../util/inputValidation';
import ModalCustom from "./ModalCustom";

class SignUpCitizenForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      surname: '',
      fiscalCode: '',
      email: '',
      nameValid: false,
      surnameValid: false,
      fiscalCodeValid: false,
      emailValid: false,
      formValid: false,
      modalShow: false,
      errors: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    this.setState({
      formValid: this.state.nameValid && this.state.surnameValid && this.state.fiscalCodeValid && this.state.emailValid,
    });
  }

  validateField(fieldName, value) {
    let nameValid = this.state.nameValid;
    let surnameValid = this.state.surnameValid;
    let fiscalCodeValid = this.state.fiscalCodeValid;
    let emailValid = this.state.emailValid;

    switch (fieldName) {
      case 'name':
        nameValid = value.length > 2 && isOnlyCharacters(value);
        break;
      case 'surname':
        surnameValid = value.length > 2 && isOnlyCharacters(value);
        break;
      case 'fiscalCode':
        fiscalCodeValid = isValidFiscalCode(value);
        break;
      case 'email':
        emailValid = isValidEmail(value);
        break;
      default:
        break;
    }
    this.setState(
      {
        nameValid,
        surnameValid,
        fiscalCodeValid,
        emailValid,
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
      name, surname, fiscalCode, email, nameValid, surnameValid, emailValid, fiscalCodeValid, formValid
    } = state;

    this.setState({
      formValid: nameValid && surnameValid
          && emailValid && fiscalCodeValid,
    });

    if(formValid) {
      props.onSignUpCitizenFormSubmit(name, surname, fiscalCode, email);
    } else {
      let errors = [];
      if(!nameValid) {
        errors.push("Name must contain at least three characters.");
      }
      if(!surnameValid) {
        errors.push("Surname must contain at least three characters.");
      }
      if(!fiscalCodeValid) {
        errors.push("Social security is not valid.");
      }
      if(!emailValid) {
        errors.push("Email is not valid.");
      }
      this.setState({modalShow: true, errors: errors});
    }
  }

  render() {
    const {
      name, surname, fiscalCode, email, modalShow, errors
    } = this.state;

    let modalClose = () => this.setState({ modalShow: false });

    return (
      <Container>
        <Row><h1>Sign up as a Citizen</h1></Row>

        <Card border="dark" bg="light" className="text-center" style={{ margin: 'auto', width: '75%' }}>
          <Card.Title as="h3">Compile and submit to register</Card.Title>
          <Form onSubmit={this.handleSubmit}>

            <Form.Group as={Row} controlId="Name">
              <Form.Label column sm="3" className="text-right">Name</Form.Label>
              <Col sm="8">
                <Form.Control type="text" value={name} name={"name"} onChange={this.handleUserInput} placeholder="Name" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="surname">
              <Form.Label column sm="3" className="text-right">Surname</Form.Label>
              <Col sm="8">
                <Form.Control type="text" value={surname} name={"surname"} onChange={this.handleUserInput} placeholder="Surname" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="location">
              <Form.Label column sm="3" className="text-right">Social Security Code</Form.Label>
              <Col sm="8">
                <Form.Control type="text" value={fiscalCode} name={"fiscalCode"} onChange={this.handleUserInput} placeholder="Social Security Code" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="email">
              <Form.Label column sm="3" className="text-right">E-mail</Form.Label>
              <Col sm="8">
                <Form.Control type="email" value={email} name={"email"} onChange={this.handleUserInput} placeholder="E-Mail" />
              </Col>
            </Form.Group>

            <Button variant="info" type="submit">
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

SignUpCitizenForm.propTypes = {
  // eslint-disable-next-line
  onSignUpCitizenFormSubmit: PropTypes.func.isRequired
};

export default SignUpCitizenForm;
