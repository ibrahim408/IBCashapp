import C from '../../constants'
import Firebase from '../../Firebase'

/* 
user API
fetchUserDetails
logIn
signUp
logOut
*////////////////////////////////////////////////////

export const fetchUserDetails = (uid) => dispatch => {
    Firebase.firestore().collection(C.USERS).doc(uid)
        .get().then(res => {
            dispatch({
                type: C.FETCH_USER_DETAILS,
                payload: { ...res.data(), id: res.id }
            })
        }).catch((e) => console.log('ERROR: ', e))
}

export const logIn = (email, password) => dispatch => {
    Firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            dispatch({
                type: C.LOG_IN,
                payload: true
            })
        })
        .catch(error => {
            var errorFound;
            if (error.code == "auth/user-not-found")
                errorFound = "Email Not Found"
            else if (error.code == "auth/wrong-password") {
                errorFound = "Wrong Password"
            }
            dispatch({
                type: C.LOG_IN_FAIL,
                payload: errorFound
            })
        })
}

export const signUp = (firstName, lastName, email, password) => dispatch => {
    Firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
            var uid = user.user.uid;
            Firebase.firestore().collection(C.USERS).doc(uid).set({
                firstName: firstName,
                lastName: lastName,
                email: email,
                balance: 0,
            }).catch(error => console.log("ERROR :", error))
        })
        .then(() => {
            dispatch({
                type: C.SIGN_UP,
                payload: true
            })
        })
        .catch(error => {
            console.log('error mo: ', error.code);
            var errorFound;
            if (error.code == 'auth/weak-password')
                errorFound = 'password to weak. Minimal 6 characters';
            else if (error.code == 'auth/email-already-in-use')
                errorFound = 'Email already in use error'
            else
                errorFound = error

            dispatch({
                type: C.SIGN_UP_FAIL,
                payload: errorFound
            })
        })
}

export const logOut = () => {
    Firebase.auth().signOut();
    return (dispatch) => dispatch({
        type: C.LOG_OUT
    })
}

/*
card API
createCard
updateCard
fetchCards
*////////////////////////////////////////////////////

export const createCard = (card) => (dispatch, getState) => {
    let currentUser = getState().user.currentUser;
    let cardWithID = { ...card, userID: currentUser.id }
    Firebase.firestore().collection(C.CARDS).add(cardWithID)
        .then(() => {
            dispatch({
                type: C.CREATE_CARD,
            })
        })
        .catch(error => console.log("ERROR :", error))
}

export const updateCard = (cardUpdates) => dispatch => {
    Firebase.firestore().collection(C.CARDS).doc(cardUpdates.id)
        .update(cardUpdates)
        .then(() => {
            dispatch({
                type: C.UPDATE_CARD
            })
        })
        .catch(function (error) {
            console.error("error des", error);
        });
}

export const fetchCards = () => (dispatch, getState) => {
    let currentUser = getState().user.currentUser;
    const docRef = Firebase.firestore().collection(C.CARDS).where('userID', '==', currentUser.id);
    docRef.get()
        .then(snapshot => {
            let cards = snapshot.docs.map(doc => {
                return { ...doc.data(), id: doc.id };
            });

            dispatch({
                type: C.FETCH_CARDS,
                payload: cards
            })
        }).catch(function (error) {
            console.log("got an error", error);
        })
}

/*
transactions API
fetchTransactions
sendMoneyOrRequest
acceptRequest
updateRecieverBalance
declineRequest
setAmount
setIsTenth
*////////////////////////////////////////////////////

export const fetchTransactions = () => (dispatch, getState) => {
    let currentUser = getState().user.currentUser;
    const docRef = Firebase.firestore().collection(C.TRANSACTIONS).orderBy("date", 'desc');
    docRef.get()
        .then(snapshot => {
            let transactions = snapshot.docs.map(doc => {
                return { ...doc.data(), id: doc.id };
            });
            let filterTransactions = transactions.filter((transaction) => {
                return (transaction.recieverEmail == currentUser.email) || (transaction.senderEmail == currentUser.email)
            })
            dispatch({
                type: C.FETCH_TRANSACTIONS,
                payload: filterTransactions
            })
        }).catch(function (error) {
            console.log("got an error", error);
        })
}

export const sendMoneyOrRequest = (transaction) => dispatch => {
    var user;
    Firebase.firestore().collection(C.USERS)
        .where("email", '==', transaction.recieverEmail)
        .get()
        .then(snapshot => {
            user = snapshot.docs.map(doc => {
                return { ...doc.data(), id: doc.id }
            })
        })
        .then(() => {
            if (user.length) {
                this.updateRecieverBalance(transaction);
                Firebase.firestore().collection(C.TRANSACTIONS).add(transaction)
                    .then((ref) => {
                        dispatch({
                            type: C.SEND_OR_REQUEST,
                        })
                    })
                    .catch(error => console.log("ERROR :", error))
            } else {
                dispatch({
                    type: C.TRANSACTION_FAILED
                })
            }
        })
        .catch(error => console.log("ERROR :", error))
}


export const acceptRequest = (id, senderEmail, recieverEmail, amount) => dispatch => {
    let transaction = {
        type: 'pay',
        recieverEmail: senderEmail,
        amount: amount,
    };
    this.updateRecieverBalance(transaction);

    Firebase.firestore().collection(C.TRANSACTIONS).doc(id)
        .update({
            type: 'pay',
            action: 'accept',
            recieverEmail: senderEmail,
            senderEmail: recieverEmail,
            date: new Date(),
        })
        .then(() => {
            dispatch({
                type: C.ACCEPT_REQUEST
            })
        })
        .catch(function (error) {
            console.error("error des", error);
        });
}

updateRecieverBalance = (transaction) => {

    if (transaction.type == 'pay') {
        var user;
        Firebase.firestore().collection(C.USERS)
            .where("email", '==', transaction.recieverEmail)
            .get()
            .then(snapshot => {
                user = snapshot.docs.map(doc => {
                    return { ...doc.data(), id: doc.id }
                })
            })
            .then(() => {
                let balance = user[0].balance + parseFloat(transaction.amount);
                balance = balance.toFixed(2);

                Firebase.firestore().collection(C.USERS).doc(user[0].id)
                    .update({
                        balance: balance
                    })
                    .catch(() => console.error("error des", error));
            })
            .catch(error => console.log("ERROR :", error))

    }
}

export const declineRequest = (id) => dispatch => {
    Firebase.firestore().collection(C.TRANSACTIONS).doc(id)
        .update({
            action: 'decline',
            date: new Date(),
        })
        .then(() => {
            dispatch({
                type: C.ACCEPT_REQUEST
            })
        })
        .catch(function (error) {
            console.error("error des", error);
        });
}

export const setAmount = (amount) => dispatch => {
    dispatch({
        type: C.SET_AMOUNT,
        payload: amount
    })
}

export const setIsTenth = (boolean) => dispatch => {
    dispatch({
        type: C.SET_IS_TENTH,
        payload: boolean
    })
}



