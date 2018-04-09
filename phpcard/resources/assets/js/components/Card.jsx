import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {cards} from '../actions';



class Card extends Component {

  state = {
    text: "",
    updateCardId:null
  }

  componentDidMount() {
    this.props.fetchCards();
  }

  resetForm = () => {
    this.setState({text: "", updateCardId: null});
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
        <form onSubmit={this.submitCard}>
          <input
            value={this.state.text}
            placeholder="Enter card here..."
            onChange={(e) => this.setState({text: e.target.value})}
            required />
          <input type="submit" value="Save Card" />
          <button onClick={this.resetForm}>Reset</button>
        </form>

          <h3>Cards</h3>
          <table>
            <tbody>
              {this.props.cards.map((card,id) => (
                <tr key={"card_"+id} >
                  <td>{card.text}</td>
                  <td><button onClick={() => this.selectForEdit(id)}>edit</button></td>
                  <td><button onClick={()=>this.props.deleteCard(id)}>delete</button></td>
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
  