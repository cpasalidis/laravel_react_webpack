export const fetchCards = () => {
  return dispatch => {
    let headers = {"Content-Type": "application/json"};
    return fetch("/api/cards/", {headers, })
      .then(res => res.json())
      .then(cards => {
        return dispatch({
          type: 'FETCH_CARDS',
          cards
        })
      })
  }
}

export const addCard = text => {
  let headers = {"Content-Type": "application/json"};
  let body = JSON.stringify({text, });
  return dispatch => {
  return fetch("/api/cards/", {headers, method: "POST", body})
  .then(res => res.json())
  .then(card => {
    return dispatch({
      type: 'ADD_CARD',
      card
    })
  })
  } //of dispatch
} //of addCard
  
  export const updateCard = (index, text) => {
    return (dispatch, getState) => {

      let headers = {"Content-Type": "application/json"};
      let body = JSON.stringify({text, });
      let cardId = getState().cards[index].id;
  
      return fetch(`/api/notes/${cardId}/`, {headers, method: "PUT", body})
        .then(res => res.json())
        .then(card => {
          return dispatch({
            type: 'UPDATE_CARD',
            card,
            index
          })
        })
    } //of dispatch
} //of updateCard

export const deleteCard = index => {
  return (dispatch, getState) => {

    let headers = {"Content-Type": "application/json"};
    let cardId = getState().cards[index].id;

    return fetch(`/api/cards/${cardId}/`, {headers, method: "DELETE"})
      .then(res => {
        if (res.ok) {
          return dispatch({
            type: 'DELETE_CARD',
            index
          })
        }
      })
    } //of dispatch
  } //of deleteCard