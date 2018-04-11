import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Form,FormGroup,Input} from 'reactstrap';
import { Card, CardImg, CardTitle, CardText, CardDeck,CardHeader,CardFooter,CardColumns,CardGroup,
  CardSubtitle, CardBody } from 'reactstrap';
/** Will encapsulate the logic to add/edit a card 
 * open the modal, from parent
 * close the modal from this class(child)
*/
class CardModal extends React.Component {
  constructor() {
    super();
  }

  render(props) {
    const {modal,onToggle,onSetParentsState,currentCardData,submitCard,resetForm,className,imageStyle} = this.props;
    const defaultCardImgUrl='http://icons.iconarchive.com/icons/iconsmind/outline/128/Guitar-icon.png';

    return (
      <div>
        <Modal isOpen={modal} toggle={onToggle} className={className}>
          <ModalHeader toggle={onToggle}>{currentCardData.updateCardId ? 'Edit Card' : 'Add Card'}</ModalHeader>
          <ModalBody>
          <Card>
        <Form onSubmit={submitCard}>
        <CardHeader>
          <FormGroup >
            <Input
              value={currentCardData.title}
              placeholder="Card Title..."
              onChange={(e) => onSetParentsState({title: e.target.value})}
              required />
            </FormGroup>
          </CardHeader>
          <CardBody>
          <FormGroup >
          <Input
            value={currentCardData.imgurl}
            placeholder="Image url..."
            onChange={(e) => onSetParentsState({imgurl: e.target.value})}
            required />
          <CardImg src={currentCardData.imgurl?currentCardData.imgurl:defaultCardImgUrl} style={imageStyle}
            className="img-thumbnail" alt={currentCardData.title} />
          </FormGroup>
          <FormGroup >
          <Input
            value={currentCardData.description}
            placeholder="Card description..."
            onChange={(e) => onSetParentsState({description: e.target.value})}
            required />
          </FormGroup>
          <Button color="success" type="submit"> Save Card </Button>
          <Button onClick={resetForm}>Reset</Button>
          </CardBody>
        </Form>
          </Card>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default CardModal;