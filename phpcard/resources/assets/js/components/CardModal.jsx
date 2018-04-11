import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

/** Will encapsulate the logic to add/edit a card 
 * open the modal, from parent
 * close the modal from this class(child)
*/
class CardModal extends React.Component {
  constructor() {
    super();
  }

  render(props) {
    const {modal,onToggle,className} = this.props;
    //const {modal,onToggle,resetForm,submitCard,modalTitle} = this.props;
    return (
      <div>
        <Modal isOpen={modal} toggle={onToggle} className={className}>
          <ModalHeader toggle={onToggle}>modalTitle</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={onToggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={onToggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default CardModal;