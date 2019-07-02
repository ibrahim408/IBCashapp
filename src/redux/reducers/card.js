import C from '../../constants'

const initialState = {
    cards: '',
    isCardFetched: 0
}

export default(state = initialState, action) => {
    switch(action.type){
        case C.CREATE_CARD: return{
            ...state
        }
        case C.FETCH_CARDS: return{
            ...state,
            cards: action.payload,
            isCardFetched: state.isCardFetched+1
        }
        default:
            return state;
    }
}