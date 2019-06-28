import C from '../../constants'
import Firebase from '../../Firebase'

/* 
user API
login,sign up, fetch user
*////////////////////////////////////////////////////

export const fetchUserDetails = (uid) => dispatch => {
    Firebase.firestore().collection(C.USERS).doc(uid)
        .get().then(res => {
            dispatch({
                type: C.FETCH_USER_DETAILS,
                payload: res.data()
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

export const signUp = (firstName,lastName,email, password) => dispatch => {
    Firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
            var uid = user.user.uid;
            Firebase.firestore().collection(C.USERS).doc(uid).set({
                firstName: firstName,
                lastName: lastName,
                email: email
            }).catch(error => console.log("ERROR :", error))
        })
        .then(() => {
            dispatch({
                type: C.SIGN_UP,
                payload: true
            })
        })
        .catch(error => {
            console.log('error mo fucka: ', error.code);
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
addCard
getCards
updateCards
*////////////////////////////////////////////////////

export const addCard = (name,cardNumber,expMonth,expYear,cvc,addressZip) => dispatch => {
    
    Firebase.firestore().collection(C.CARDS).add({
        name: name,
        cardNumber: cardNumber,
        expMonth: expMonth,
        expYear: expYear,
        cvc: cvc,
        addressZip: addressZip        
    }).catch(error => console.log("ERROR :", error))
}

export const updateCards = () => {

}

export const fetchCards = () => dispatch => {
    const docRef = Firebase.firestore().collection(C.CARDS);
    docRef.get()
    .then(snapshot => {
        let cards = snapshot.docs.map(doc => {
           return doc.data();
        }); 

        dispatch({
            type: C.FETCH_CARDS,
            payload: cards
        })      
    }).catch(function(error){
        console.log("got an error",error);        
    })   
}

/*
transactions API
sendMoney
requestMoney 
*////////////////////////////////////////////////////

