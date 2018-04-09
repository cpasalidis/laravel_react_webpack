import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {cards} from '../actions';
import {Button,Form,FormGroup,Input} from 'reactstrap';


class Card extends Component {
    state = {
      title: "",
      description: "",
      updateCardId: null,
    }  

  resetForm = () => {
    this.setState({title: "",description: "", updateCardId: null});
  }

  componentDidMount() {
    this.props.fetchCards();
  }

  selectForEdit = (id) => {
    let card = this.props.cards[id];
    this.setState({title: card.title,description:card.description,updateCardId: id});
  }
  
  submitCard = (e) => {
    e.preventDefault();
    if (this.state.updateCardId === null) {
      this.props.addCard(this.state.title,this.state.description).then(this.resetForm);
    } else {
      this.props.updateCard(this.state.updateCardId, this.state.title,this.state.description).then(this.resetForm);
    }
    this.resetForm();
  }


    render() {
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
          <Button color="success" type="submit"> Save Card </Button>
          <Button onClick={this.resetForm}>Reset</Button>
        </Form>

          <h3>Cards</h3>
          <table>
            <tbody>
              {this.props.cards.map((card,id) => (
                <tr key={"card_"+id} >
                  <td>{card.title}</td>
                  <td>{card.description}</td>
                  <td><Button color="success" onClick={() => this.selectForEdit(id)}>edit</Button></td>
                  <td><Button color="danger" onClick={()=>this.props.deleteCard(id)}>delete</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
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
      addCard: (title,description) => {
        return dispatch(cards.addCard(title,description));
      },
      updateCard: (id, title,description) => {
        return dispatch(cards.addCard(id, title,description));
      },
      deleteCard: (id) => {
        dispatch(cards.deleteCard(id));
      },
    }
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Card);
  
