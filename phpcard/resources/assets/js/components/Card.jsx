import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {cards} from '../actions';
import {Button,Form,FormGroup,Input,Container,Row,Col} from 'reactstrap';


class Card extends Component {
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
      return (
        <div>
          <h2>Welcome to Card!!</h2>
          <hr />
        <h3>Add new card</h3>
        <Form inline onSubmit={this.submitCard}>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input
            value={this.state.title}
            placeholder="Card Title..."
            onChange={(e) => this.setState({title: e.target.value})}
            required />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input
            value={this.state.description}
            placeholder="Card description..."
            onChange={(e) => this.setState({description: e.target.value})}
            required />
          </FormGroup>
          <FormGroup className="mb-4 mr-sm-4 mb-sm-0">
          <Input
            value={this.state.imgurl}
            placeholder="Image url..."
            onChange={(e) => this.setState({imgurl: e.target.value})}
            required />
          <img src={this.state.imgurl} style={imageStyle} className="img-thumbnail" alt={this.state.title} />
          </FormGroup>
          <Button color="success" type="submit"> Save Card </Button>
          <Button onClick={this.resetForm}>Reset</Button>
        </Form>

          <h3>Cards</h3>
          <Container>
          {this.props.cards.map((card,id) => (
                <Row key={"card_"+id} >
                  <Col sm="3">{card.title}</Col>
                  <Col sm="3">{card.description}</Col>
                  <Col sm="3"><img src={card.imgurl} style={imageStyle} className="img-thumbnail" alt={card.title}/></Col>
                  <Col sm="3">
                  <Button color="success" onClick={() => this.selectForEdit(id)}>edit</Button>
                  <Button color="danger" onClick={()=>this.props.deleteCard(id)}>delete</Button>
                  </Col>
                </Row>
              ))}
          </Container>
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
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Card);
  
