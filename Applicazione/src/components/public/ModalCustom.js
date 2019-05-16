import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ModalCustom = (props) => {
  const { title, description, onHide } = props;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {description.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

ModalCustom.propTypes = {
  title: PropTypes.string.isRequired,
  // eslint-disable-next-line
  description: PropTypes.array.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default ModalCustom;
