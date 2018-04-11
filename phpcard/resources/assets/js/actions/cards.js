
const getHeaders = () => {
  var token = document.head.querySelector('meta[name="csrf-token"]').content;
  let headers = {
    "Content-Type": "application/json",
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-Token':token
  };
  return headers;
}

export const fetchCardStatusesAndCards = () => {
  return dispatch => {
    let headers = getHeaders();
    return Promise.all([
      fetch("/api/card_statuses/", {headers,credentials: 'same-origin' }),
      fetch("/api/cards/", {headers,credentials: 'same-origin' })
    ])
      .then(([resStatus,resCard]) => {
        Promise.all([resStatus.json(),resCard.json()])
      .then(([cardStatuses,cards]) => {
        return dispatch({
          type: 'FETCH_CARDSTATUSES_CARDS',
          cardStatuses,
          cards
        }) //of dispatch to reducers
      }) //of inner Promise.all for json() in both promises
    }) //of first Promise.all, for http request
  } //of dispatch...
} //of fetchCardStatusesAndCards

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

export const addCard = (title,description,imgurl,card_status_id) => {
  let headers = getHeaders();
  let body = JSON.stringify({title,description,imgurl,card_status_id, });
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
  
  export const updateCard = (index, title,description,imgurl,card_status_id ) => {
    return (dispatch, getState) => {

      let headers = getHeaders();
      let body = JSON.stringify({title,description,imgurl,card_status_id, });
      let cardId = getState().cards.cards[index].id;
      return fetch(`/api/cards/${cardId}/`, {headers,credentials: 'same-origin', method: "PUT", body})
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
    let cardId = getState().cards.cards[index].id;

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