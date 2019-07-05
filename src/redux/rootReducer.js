import { combineReducers } from 'redux'
import user from './reducers/user'
import card from './reducers/card'
import transactions from './reducers/transactions'
// import { firebaseReducer } from 'react-redux-firebase'
// import { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
    user: user,
    card: card,
    transactions: transactions,
    // firestoreReducer: firestoreReducer,
    // firestore: firebaseReducer
})

export default rootReducer
