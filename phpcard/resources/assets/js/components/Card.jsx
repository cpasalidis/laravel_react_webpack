import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {cards} from '../actions';
import {Button,Form,FormGroup,Input} from 'reactstrap';


class Card extends Component {
    state = {
      text: "",
      updateCardId: null,
    }  

  resetForm = () => {
    this.setState({text: "", updateCardId: null});
  }

  componentDidMount() {
    this.props.fetchCards();
  }

  selectForEdit = (id) => {
    let card = this.props.cards[id];
    this.setState({text: card.text, updateCardId: id});
  }
  
  submitCard = (e) => {
    e.preventDefault();
    if (this.state.updateCardId === null) {
      this.props.addCard(this.state.text).then(this.resetForm);
    } else {
      this.props.updateCard(this.state.updateCardId, this.state.text).then(this.resetForm);
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
            value={this.state.text}
            placeholder="Enter card here..."
            onChange={(e) => this.setState({text: e.target.value})}
            required />
          <Button color="success" type="submit"> Save Card </Button>
          <Button onClick={this.resetForm}>Reset</Button>
          </FormGroup>
        </Form>

          <h3>Cards</h3>
          <table>
            <tbody>
              {this.props.cards.map((card,id) => (
                <tr key={"card_"+id} >
                  <td>{card.text}</td>
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
      addCard: (text) => {
        return dispatch(cards.addCard(text));
      },
      updateCard: (id, text) => {
        return dispatch(cards.addCard(id, text));
      },
      deleteCard: (id) => {
        dispatch(cards.deleteCard(id));
      },
    }
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Card);
  
