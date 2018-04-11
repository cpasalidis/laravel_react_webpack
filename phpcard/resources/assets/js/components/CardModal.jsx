import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormFeedback } from 'reactstrap';
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
    const {modal,onToggle,onSetParentsState,currentCardData,
      cardStatuses,
      submitCard,resetForm,className,imageStyle} = this.props;
    const defaultCardImgUrl='http://icons.iconarchive.com/icons/iconsmind/outline/128/Guitar-icon.png';
    //https://stackoverflow.com/questions/36743041/font-awesome-icon-in-select-option
    //https://stackoverflow.com/questions/35166758/react-javascript-displaying-decoding-unicode-characters
    //Badge is a span, not allowed inside option
    const STATUS_ICONS=[
      '', //status id 0
      "\uf00c", //status id 1 (fa-check)
      "\uf058", //status id 2 (fa-check-circle)
      "\uf017", //status id 3 (fa-clock)
      "\uf04c", //status id 4 (fa-pause)
      "\uf1f8", //status id 5 (fa-trash)        
    ];
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
          <FormGroup >
          <Input 
            id="statusSelect"
            type="select"
            valid={currentCardData.card_status_id > 0}
            value={currentCardData.card_status_id}
            placeholder="Card Status..."
            onChange={(e) => onSetParentsState({card_status_id: e.target.value})}
            style={{fontFamily: 'Helvetica, FontAwesome'}}
            required> 
            <option key={0} value={0}>Please select a status</option> 
            {
                cardStatuses.length > 0 && cardStatuses.map((cardStatus,id) => (
                <option key={cardStatus.id} value={cardStatus.id}>{cardStatus.description+' ' + STATUS_ICONS[parseInt(cardStatus.id,10)||0]}</option>  
            ))}
            </Input>
          { (currentCardData.card_status_id > 0) && <FormFeedback>{'Please select a status'}</FormFeedback> }
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