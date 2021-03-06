import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {cards} from '../actions';
import {Button,Form,FormGroup,Input,Container,Row,Col,Badge} from 'reactstrap';
import { Card, CardImg, CardTitle, CardText, CardDeck,CardHeader,CardFooter,CardColumns,CardGroup,
  CardSubtitle, CardBody } from 'reactstrap';
import CardModal from './CardModal';


class CardContainer extends Component {
    state = {
      title: "",
      description: "",
      imgurl: "",
      card_status_id:0,
      updateCardId: null,
      modal:false,
    }  

  resetForm = () => {
    this.setState({title: "",description: "",imgurl:"", updateCardId: null,
    card_status_id:0,
    modal: false});
  }

  componentDidMount() {
    this.props.fetchCardStatusesAndCards();
  }

  selectForEdit = (cardIdx) => {
    let card = this.props.cards[cardIdx];
    this.setState({title: card.title,description:card.description,imgurl:card.imgurl?card.imgurl:"",
    card_status_id:card.card_status_id,
    updateCardId: cardIdx,
  modal:true});
  }
  
  submitCard = (e) => {
    e.preventDefault();
    if (this.state.card_status_id>0) {
      if (this.state.updateCardId === null) {
        this.props.addCard(this.state.title,this.state.description,this.state.imgurl,this.state.card_status_id)
          .then(this.resetForm);
      } else {
        this.props.updateCard(this.state.updateCardId, this.state.title,this.state.description,this.state.imgurl,this.state.card_status_id)
          .then(this.resetForm);
      }
    }
    this.resetForm();
  }

    onToggle = () => {
      this.setState({
        modal: !this.state.modal
      });
    }

    onSetParentsState = (newState) => {
      this.setState(newState);
    }

    render() {
      const imageStyle={maxWidth:'20%'};
      const currentCardData={
        title:this.state.title,
        description:this.state.description,
        imgurl:this.state.imgurl,
        card_status_id:this.state.card_status_id,
        updateCardId:this.state.updateCardId};
      const STATUS_ICONS=[
        <Badge color="primary"></Badge>, //status id 0
        <Badge color="primary"><span className="fa fa-check" title="check" aria-hidden="true"/></Badge>, //status id 1
        <Badge color="success"><span className="fa fa-check-circle" title="check-circle" aria-hidden="true"/></Badge>, //status id 2
        <Badge color="primary"><span className="fa fa-clock" title="clock" aria-hidden="true"/></Badge>, //status id 3
        <Badge color="primary"><span className="fa fa-pause" title="pause" aria-hidden="true"/></Badge>, //status id 4
        <Badge color="danger"><span className="fa fa-trash" title="trash" aria-hidden="true"/></Badge>, //status id 5        
      ];
      return (
        <div>
        <hr />  
        <Row>
        <Col md="8">
        <h2>Welcome to Card!!</h2>
        </Col>
        <Col md="1">
        <Button color="primary" onClick={this.onToggle}>
        {/* i have included the cdn css of font awesome fonts to the html template of the main page */}
        <span className="fa fa-plus" title="plus" aria-hidden="true"></span>
        </Button>
        </Col>
        </Row>
        <Row>
        <Col md="9">
        <CardModal modal={this.state.modal} currentCardData={currentCardData} imageStyle={imageStyle}
          cardStatuses={this.props.cardStatuses} statusIcons={STATUS_ICONS}
          onToggle={this.onToggle} onSetParentsState={this.onSetParentsState}
          submitCard={this.submitCard} resetForm={this.resetForm} >
        </CardModal>
          </Col>
          </Row>
          {/*create a card deck. Then for each card put it on the deck with the normal look*/}
              <CardDeck>
              {
                this.props.cards.length > 0 && this.props.cards.map((card,id) => (
                <Card key={"card_"+id}>
                  <CardHeader>{card.title}</CardHeader>
                  <CardImg src={card.imgurl} style={imageStyle} alt={card.title}/>
                  <CardBody>
                    <CardText>{card.description}</CardText>
                    <Button color="success" onClick={() => this.selectForEdit(id)}>edit</Button>
                    <Button color="danger" onClick={()=>this.props.deleteCard(id)}>delete</Button>
                  </CardBody>
                  <CardFooter>{STATUS_ICONS[parseInt(card.card_status_id,10)||0]}</CardFooter>
                </Card>
              ))}
              </CardDeck>
        </div>
      )
    }
  }
  
  
  const mapStateToProps = state => {
    return {
      cards: state.cards.cards,
      cardStatuses:state.cards.cardStatuses,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      fetchCardStatusesAndCards: () => {
        dispatch(cards.fetchCardStatusesAndCards());
      },
      fetchCards: () => {
          dispatch(cards.fetchCards());
        },
      addCard: (title,description,imgurl,card_status_id) => {
        return dispatch(cards.addCard(title,description,imgurl,card_status_id));
      },
      updateCard: (id, title,description,imgurl,card_status_id) => {
        return dispatch(cards.updateCard(id, title,description,imgurl,card_status_id));
      },
      deleteCard: (id) => {
        dispatch(cards.deleteCard(id));
      },
    }
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);
  
