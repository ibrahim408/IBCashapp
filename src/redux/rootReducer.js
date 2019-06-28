import { combineReducers } from 'redux'
import user from './reducers/user'
import card from './reducers/card'

const rootReducer = combineReducers({
    user: user,
    card: card
})

export default rootReducer
