
const getHeaders = () => {
  var token = document.head.querySelector('meta[name="csrf-token"]').content;
  let headers = {
    "Content-Type": "application/json",
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-Token':token
  };
  return headers;
}

export const fetchCards = () => {
  return dispatch => {
    let headers = getHeaders();
    return fetch("/api/cards/", {headers,credentials: 'same-origin' })
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
  let headers = getHeaders();
  let body = JSON.stringify({text, });
  return dispatch => {
  return fetch("/api/cards/", {headers,credentials: 'same-origin', method: "POST", body})
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

      let headers = getHeaders();
      let body = JSON.stringify({text, });
      let cardId = getState().cards[index].id;
  
      return fetch(`/api/notes/${cardId}/`, {headers,credentials: 'same-origin', method: "PUT", body})
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

    let headers = getHeaders();
    let cardId = getState().cards[index].id;

    return fetch(`/api/cards/${cardId}/`, {headers, credentials: 'same-origin',method: "DELETE"})
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