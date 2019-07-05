import { applyMiddleware, createStore, compose } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import freeze from 'redux-freeze'
import _ from 'lodash';
import rootReducer from './rootReducer'



const logger = createLogger()
const middlewares = _.compact([thunk, freeze, logger])
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)
const store = createStoreWithMiddleware(rootReducer)
export default store


























// import firebase from '../Firebase'
// import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
// import { reduxFirestore, firestoreReducer } from 'redux-firestore'

// const rrfConfig = {
//     userProfile: 'users',
//     // useFirestoreForProfile: true,
//     // enableLogging: true,
// }
// const logger = createLogger()
// const middlewares = _.compact([thunk, freeze, logger])
// const store = createStore(
//     rootReducer,
//     compose(
//         applyMiddleware(...middlewares)(createStore),
//         // reactReduxFirebase(firebase,rrfConfig),
//         // reduxFirestore(firebase),
//     )
// )


// const rrfConfig = {
//     userProfile: 'users',
//     // useFirestoreForProfile: true,
//     // enableLogging: true,
//   }

//   const logger = createLogger()
//   const middlewares = _.compact([thunk, logger])
//   const enhancers = [
//     reduxFirestore(firebase),
//     reactReduxFirebase(firebase, rrfConfig)
//   ]
//   const composedEnhancers = compose(
//     ...enhancers,
//     ...middlewares
//   )
// const store = createStore(rootReducer, composedEnhancers)




// const rrfConfig = {
//     userProfile: 'users',
//     // useFirestoreForProfile: true,
//     // enableLogging: true,
//   }

// const logger = createLogger()
// const middlewares = _.compact([thunk, logger])
// const createStoreWithMiddleware = compose(
//     // Add redux firestore store enhancer
//     reduxFirestore(firebase),
//     reactReduxFirebase(firebase,rrfConfig),
//     ...middlewares
//   )(createStore)

// const store = createStoreWithMiddleware(rootReducer)



// const logger = createLogger()
// const middlewares = _.compact([thunk, freeze, logger])
// const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)
// const store = createStoreWithMiddleware(rootReducer)



















// const rrfConfig = {
//     userProfile: 'users'
//     // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
//   }

// const logger = createLogger()
// const middlewares = _.compact([thunk, freeze, logger, reactReduxFirebase, firebaseReducer])
// const createStoreWithMiddleware = compose(
//     reactReduxFirebase(firebase,rrfConfig),
//     reduxFirestore(firebase),
//     ...middlewares,
//   )(createStore)

// const store = createStoreWithMiddleware(rootReducer)












// const rrfConfig = {
//     userProfile: 'users'
//     // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
// }
// const logger = createLogger()
// const middlewares = _.compact([thunk, freeze, logger, reactReduxFirebase, firebaseReducer])
// const createStoreWithMiddleware = compose(
//     applyMiddleware(...middlewares)(createStore),
//     reactReduxFirebase(firebase, rrfConfig),
//     reduxFirestore(firebase),
// )
// const store = createStoreWithMiddleware(rootReducer);
