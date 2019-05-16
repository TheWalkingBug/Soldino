import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';
import { isPositive } from '../../util/inputValidation';
import LoadingSpinner from '../public/LoadingSpinner';
import AlertMessage from '../public/AlertMessage';
import ModalCustom from '../public/ModalCustom';
import {Link} from "react-router";

class EconomyForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amountMint: 0,
      amountDist: 0,
      checkedAll: false,
      checkedItems: new Map(),
      modalShow: false,
      errors: [],
    };

    this.handleSubmitMint = this.handleSubmitMint.bind(this);
    this.handleSubmitDistribute = this.handleSubmitDistribute.bind(this);
    this.onMintChange = this.onMintChange.bind(this);
    this.onDistributeChange = this.onDistributeChange.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.handleCheckAll = this.handleCheckAll.bind(this);
  }

  componentDidMount() {
    const { getUsersList } = this.props;
    getUsersList();
  }

  onMintChange(event) {
    this.setState({ amountMint: event.target.value });
  }

  onDistributeChange(event) {
    this.setState({ amountDist: event.target.value });
  }

  handleCheckChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({
      checkedItems: prevState.checkedItems.set(item, isChecked),
    }));
  }

  handleCheckAll() {
    const { checkedItems, checkedAll } = this.state;
    const { users } = this.props;
    const newCheckedItems = checkedItems;
    for (let i = 0; i < users.citizens.length; i += 1) {
      newCheckedItems.set(users.citizens[i].address, !checkedAll);
    }
    for (let i = 0; i < users.businessOwners.length; i += 1) {
      newCheckedItems.set(users.businessOwners[i].address, !checkedAll);
    }
    this.setState({ checkedItems: newCheckedItems, checkedAll: !checkedAll });
  }

  handleSubmitMint(event) {
    event.preventDefault();
    const { amountMint } = this.state;

    const { props } = this;

    if (isPositive(amountMint)) {
      props.onMintFormSubmit(amountMint);
    } else {
      const errors = [];
      errors.push('Mint amount must be positive and greater than zero.');
      this.setState({ modalShow: true, errors });
    }
  }

  checkAnyUserChecked() {
    const { checkedItems } = this.state;
    const usersToDistribute = [];
    for (const [k, v] of checkedItems) {
      if (v) {
        usersToDistribute.push(k);
      }
    }
    return usersToDistribute;
  }


  handleSubmitDistribute(event) {
    event.preventDefault();
    const { amountDist } = this.state;

    const { props } = this;

    const usersToDistribute = this.checkAnyUserChecked();

    if (parseInt(amountDist, 10) * usersToDistribute.length <= parseInt(props.data.balance, 10)
        && isPositive(amountDist) && usersToDistribute.length > 0) {
      props.onDistributeFormSubmit(usersToDistribute, amountDist);
    } else {
      const errors = [];
      if (parseInt(amountDist, 10) * usersToDistribute.length > parseInt(props.data.balance, 10)) {
        errors.push("You can't distribute more Cubit than you have. Mint some first!");
      }
      if (usersToDistribute.length < 1) {
        errors.push('You must select at least one user to distribute Cubit.');
      }
      if (!isPositive(amountDist)) {
        errors.push('Cubit amount to distribute must be positive and greater than zero.');
      }
      this.setState({ modalShow: true, errors });
    }
  }

  render() {
    const {
      amountMint, amountDist, checkedItems, modalShow, errors,
    } = this.state;

    const { users, isLoading } = this.props;

    const modalClose = () => this.setState({ modalShow: false });

    let allUsersList = null;

    if (users !== null && users !== undefined) {
      allUsersList = users.citizens.map(item => (
        <Col key={item.address}>
          <Form.Check
            className="checkbox"
            id={item.address}
            name={item.address}
            type="checkbox"
            label={`Citizen: ${item.name} ${item.surname}`}
            checked={checkedItems.get(item.address)}
            onChange={this.handleCheckChange}
          />
        </Col>
      ));
      allUsersList.push(
        users.businessOwners.map(item => (
          <Col key={item.address}>
            <Form.Check
              className="checkbox"
              id={item.address}
              name={item.address}
              type="checkbox"
              label={`Business: ${item.businessName}`}
              checked={checkedItems.get(item.address)}
              onChange={this.handleCheckChange}
            />
          </Col>
        )),
      );
    }

    if (allUsersList === null) {
      allUsersList = <AlertMessage variant="info" message="No users registered in Soldino." />;
    }

    return (
      <Container>
        <Link to="/profile">
          <Button variant="dark" size="lg">
            Back to all actions
          </Button>
        </Link>
        <h2 style={{ margin: '1em' }}>Mint cubits here</h2>
        <Form onSubmit={this.handleSubmitMint}>
          <Form.Group as={Row} controlId="mintAmount">
            <Form.Label column sm="4" className="text-right">
              Amount of cubits to mint:
            </Form.Label>
            <Col sm="6">
              <Form.Control
                type="text"
                value={amountMint}
                onChange={this.onMintChange}
                placeholder="0"
              />
            </Col>
            <Col>
              <Button
                variant="info"
                type="submit"
                block
              >
                Mint
              </Button>
            </Col>
          </Form.Group>
        </Form>

        <h2 style={{ margin: '1em' }}>Distribute cubits here</h2>
        <Form onSubmit={this.handleSubmitDistribute}>
          <Form.Group as={Row} controlId="distributeAmount">
            <Form.Label column sm="4" className="text-right">
              Amount of cubits to distribute:
            </Form.Label>
            <Col sm="6">
              <Form.Control
                type="text"
                value={amountDist}
                onChange={this.onDistributeChange}
                placeholder="Distribute"
              />
            </Col>
          </Form.Group>

          <Form.Group controlId="distributeAddress">
            <Form.Label
              column
              sm="4"
              className="text-right"
              style={{ margin: '1em' }}
            >
              Users to distribute cubits to:
            </Form.Label>
            <Row style={{ textAlign: 'center', marginTop: '2%', marginBottom: '4%' }}>
              <Col>
                <Form.Check
                  type="checkbox"
                  label="Check All"
                  onChange={this.handleCheckAll}
                />
              </Col>
            </Row>
            <Row style={{ textAlign: 'center' }}>{isLoading ? <LoadingSpinner /> : allUsersList}</Row>
            <div style={{ textAlign: 'center', margin: '3em' }}>
              <Button variant="info" type="submit" size="lg">
                Distribute
              </Button>
            </div>
          </Form.Group>
        </Form>
        <ModalCustom
          show={modalShow}
          title="Form not valid!"
          description={errors}
          onHide={modalClose}
        />
      </Container>
    );
  }
}

EconomyForm.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  // eslint-disable-next-line
  users: PropTypes.object,
  // eslint-disable-next-line
  onMintFormSubmit: PropTypes.func.isRequired,
  // eslint-disable-next-line
  onDistributeFormSubmit: PropTypes.func.isRequired,
  // eslint-disable-next-line
  getUsersList: PropTypes.func.isRequired
};

export default EconomyForm;
