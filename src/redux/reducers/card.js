import C from '../../constants'

const initialState = {
    cards: '',
    activeCard: ''
}

export default(state = initialState, action) => {
    switch(action.type){
        case C.FETCH_CARDS: return{
            ...state,
            cards: action.payload
        }
        default:
            return state;
    }
}