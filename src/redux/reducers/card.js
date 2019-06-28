import C from '../../constants'

const initialState = {
    cards: '',
    isFetched: 0
}

export default(state = initialState, action) => {
    switch(action.type){
        case C.CREATE_CARD: return{
            ...state
        }
        case C.FETCH_CARDS: return{
            ...state,
            cards: action.payload,
            isFetched: state.isFetched+1
        }
        default:
            return state;
    }
}