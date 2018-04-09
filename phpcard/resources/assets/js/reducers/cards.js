const initialState = [
  ];

  export default function cards(state=initialState, action) {
    let cardList = state.slice();

    switch (action.type) {
      case 'FETCH_CARDS':
        return [...state, ...action.cards];

      case 'ADD_CARD':
        return [...state, action.card];
  
      case 'UPDATE_CARD':
        let cardToUpdate = cardList[action.index]
        cardToUpdate.text = action.text;
        cardList.splice(action.id, 1, cardToUpdate);
        return cardList;
  
      case 'DELETE_CARD':
        cardList.splice(action.index, 1);
        return cardList;
  
      default:
        return state;
    }
  } //of function cards