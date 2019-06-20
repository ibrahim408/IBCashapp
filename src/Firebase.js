import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
import Configer from 'react-native-config'

const settings = {};

const config = {
    apiKey: Configer.API_KEY,
    authDomain: Configer.AUTH_DOMAIN,
    databaseURL: Configer.DATA_BASE_URL,
    projectId: Configer.PROJECT_ID,
    storageBucket: Configer.STORAGEBUCKET,
    messagingSenderId: Configer.MESSAGING_SENDER_ID
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;