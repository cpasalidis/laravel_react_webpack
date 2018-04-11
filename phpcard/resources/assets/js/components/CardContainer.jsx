import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {cards} from '../actions';
import {Button,Form,FormGroup,Input,Container,Row,Col} from 'reactstrap';
import { Card, CardImg, CardTitle, CardText, CardDeck,CardHeader,CardFooter,CardColumns,CardGroup,
  CardSubtitle, CardBody } from 'reactstrap';
import CardModal from './CardModal';


class CardContainer extends Component {
    state = {
      title: "",
      description: "",
      imgurl: "",
      updateCardId: null,
      modal:false,
    }  

  resetForm = () => {
    this.setState({title: "",description: "",imgurl:"", updateCardId: null});
  }

  componentDidMount() {
    this.props.fetchCards();
  }

  selectForEdit = (cardIdx) => {
    let card = this.props.cards[cardIdx];
    this.setState({title: card.title,description:card.description,imgurl:card.imgurl?card.imgurl:"", updateCardId: cardIdx});
  }
  
  submitCard = (e) => {
    e.preventDefault();
    if (this.state.updateCardId === null) {
      this.props.addCard(this.state.title,this.state.description,this.state.imgurl)
        .then(this.resetForm);
    } else {
      this.props.updateCard(this.state.updateCardId, this.state.title,this.state.description,this.state.imgurl)
        .then(this.resetForm);
    }
    this.resetForm();
  }

    onToggle = () => {
      this.setState({
        modal: !this.state.modal
      });
    }

    render() {
      const imageStyle={maxWidth:'20%'};
      const defaultCardImgUrl='http://icons.iconarchive.com/icons/iconsmind/outline/128/Guitar-icon.png';
      return (
        <div>
          <h2>Welcome to Card!!</h2>
          <hr />
        <Row>
        <Col md="8">
        <h3>Add new card</h3>
        </Col>
        <Col md="1">
        <Button color="danger" onClick={this.onToggle}>Add Card</Button>
        </Col>
        </Row>
        <Row>
        <Col md="9">
        <CardModal modal={this.state.modal} onToggle={this.onToggle} />
        <Card>
        <Form onSubmit={this.submitCard}>
        <CardHeader>
          <FormGroup >
            <Input
              value={this.state.title}
              placeholder="Card Title..."
              onChange={(e) => this.setState({title: e.target.value})}
              required />
            </FormGroup>
          </CardHeader>
          <CardBody>
          <FormGroup >
          <Input
            value={this.state.imgurl}
            placeholder="Image url..."
            onChange={(e) => this.setState({imgurl: e.target.value})}
            required />
          <CardImg src={this.state.imgurl?this.state.imgurl:defaultCardImgUrl} style={imageStyle} className="img-thumbnail" alt={this.state.title} />
          </FormGroup>
          <FormGroup >
          <Input
            value={this.state.description}
            placeholder="Card description..."
            onChange={(e) => this.setState({description: e.target.value})}
            required />
          </FormGroup>
          <Button color="success" type="submit"> Save Card </Button>
          <Button onClick={this.resetForm}>Reset</Button>
          </CardBody>
        </Form>
          </Card>
          </Col>
          </Row>
          <h3>Cards</h3>
          {/*create a card deck. Then for each card put it on the deck with the normal look*/}
              <CardDeck>
              {this.props.cards.map((card,id) => (
                <Card key={"card_"+id}>
                  <CardHeader>{card.title}</CardHeader>
                  <CardImg src={card.imgurl} style={imageStyle} alt={card.title}/>
                  <CardBody>
                    <CardText>{card.description}</CardText>
                    <Button color="success" onClick={() => this.selectForEdit(id)}>edit</Button>
                    <Button color="danger" onClick={()=>this.props.deleteCard(id)}>delete</Button>
                  </CardBody>
                  <CardFooter>Footer</CardFooter>
                </Card>
              ))}
              </CardDeck>
        </div>
      )
    }
  }
  
  
  const mapStateToProps = state => {
    return {
      cards: state.cards,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      fetchCards: () => {
          dispatch(cards.fetchCards());
        },
      addCard: (title,description,imgurl) => {
        return dispatch(cards.addCard(title,description,imgurl));
      },
      updateCard: (id, title,description,imgurl) => {
        return dispatch(cards.updateCard(id, title,description,imgurl));
      },
      deleteCard: (id) => {
        dispatch(cards.deleteCard(id));
      },
    }
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);
  
