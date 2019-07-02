import C from '../../constants'

const initialState = {
    transactions: '',
    isTransactionsFetched: 0
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
        default:
            return state;
    }
}