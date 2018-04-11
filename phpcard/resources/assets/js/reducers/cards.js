const initialState = {cards:[],cardStatuses:[]};

  export default function cards(state=initialState, action) {
    let cardList = [...state.cards];

    switch (action.type) {
      case 'FETCH_CARDSTATUSES_CARDS':
        let fetchedCards = [...state.cards,...action.cards];
        let fetchedCardStatuses = [...state.cardStatuses,...action.cardStatuses];
        return {cards:fetchedCards,cardStatuses:fetchedCardStatuses};

      case 'FETCH_CARDS':
        let newFetchedCards = [...state.cards, ...action.cards];
        return {cards:newFetchedCards};

      case 'ADD_CARD':
        let newAddedCards = [...state.cards, action.card];
        return {cards:newAddedCards};
  
      case 'UPDATE_CARD':
        let cardToUpdate = cardList[action.index]
        cardToUpdate.title = action.card.title;
        cardToUpdate.description = action.card.description;
        cardToUpdate.imgurl = action.card.imgurl;
        cardToUpdate.card_status_id = action.card.card_status_id;
        cardList.splice(action.index, 1, cardToUpdate);
        return {cards:cardList};
  
      case 'DELETE_CARD':
        cardList.splice(action.index, 1);
        return {cards:cardList};
  
      default:
        return state;
    }
  } //of function cards