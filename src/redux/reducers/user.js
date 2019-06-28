import C from '../../constants'

const initialState = {
    currentUser: '',
    isAuthenticated: false,
    signUpError: null,
    logInError: null,
};

export default(state = initialState, action) => {
    switch(action.type){
        case C.FETCH_USER_DETAILS: return{
            ...state,
            currentUser: action.payload
        }
        case C.LOG_IN: return{
            ...state,
            isAuthenticated: action.payload,
            signUpError: null,
            logInError: null,
        }
        case C.SIGN_UP: return {
            ...state,
            isAuthenticated: action.payload,
            signUpError: null,
            logInError: null,
        }
        case C.SIGN_UP_FAIL: return {
            ...state,
            isAuthenticated: false,
            signUpError: action.payload,
            logInError: null
        }
        case C.LOG_IN_FAIL: return {
            ...state,
            isAuthenticated: false,
            logInError: action.payload,
            signUpError: null,
        }
        case C.LOG_OUT: return {
            ...initialState
        }
        default:
            return state;
    }
}