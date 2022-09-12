import React from 'react';
import { Modal, Spinner } from 'react-bootstrap';

const ShowProces = ({showProces, title}) => {
  return (
    <>
      <Modal
        show={showProces}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ShowProces;
