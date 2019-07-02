import { combineReducers } from 'redux'
import user from './reducers/user'
import card from './reducers/card'
import transactions from './reducers/transactions'

const rootReducer = combineReducers({
    user: user,
    card: card,
    transactions: transactions
})

export default rootReducer
