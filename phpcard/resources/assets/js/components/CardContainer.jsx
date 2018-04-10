import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {cards} from '../actions';
import {Button,Form,FormGroup,Input,Container,Row,Col} from 'reactstrap';
import { Card, CardImg, CardTitle, CardText, CardDeck,CardHeader,CardFooter,CardColumns,CardGroup,
  CardSubtitle, CardBody } from 'reactstrap';


class CardContainer extends Component {
    state = {
      title: "",
      description: "",
      imgurl: "",
      updateCardId: null,
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


    render() {
      const imageStyle={maxWidth:'20%'};
      const defaultCardImgUrl='data:image/jpeg;base64,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';
      return (
        <div>
          <h2>Welcome to Card!!</h2>
          <hr />
        <h3>Add new card</h3>
        <Row>
        <Col md="9">
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
  
