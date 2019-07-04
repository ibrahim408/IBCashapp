import C from '../../constants'

const initialState = {
    transactions: '',
    isTransactionsFetched: 0,
    amount: 0,
    isTenth: false
}

export default(state = initialState, action) => {
    switch(action.type){
        case C.SEND_OR_REQUEST: return{
            ...state
        }
        case C.ACCEPT_REQUEST: return {
            ...state
        }
        case C.FETCH_TRANSACTIONS: return{
            ...state,
            transactions: action.payload,
            isTransactionsFetched: state.isTransactionsFetched+1
        }
        case C.SET_AMOUNT: return{
            ...state,
            amount: action.payload
        }
        case C.SET_IS_TENTH: return{
            ...state,
            isTenth: action.payload
        }
        default:
            return state;
    }
}