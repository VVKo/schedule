import React, { useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import RozkladContext from '../../../context/RozkladContext';
import SetModalBody from './SetModalBody';

const ModalLayout = () => {
  const { showModal, setShowModal, dataForModal } = useContext(RozkladContext);

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        size={dataForModal.size}
      >
        <Modal.Header closeButton>
          <Modal.Title>{dataForModal.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SetModalBody />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Вийти
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalLayout;
