import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
//     appId: process.env.REACT_APP_APP_ID,
// };

const firebaseConfig = {
    apiKey: 'AIzaSyAE0AUjEcCUUtt5GpLacqFN_Y1L_X9Ky1k',
    authDomain: 'hwitter-e2706.firebaseapp.com',
    projectId: 'hwitter-e2706',
    storageBucket: 'hwitter-e2706.appspot.com',
    messagingSenderId: '697633742495',
    appId: '1:697633742495:web:5ddb0cb137fec1f0764caa',
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const dbService = firebase.firestore();

export const authService = firebase.auth();

export const storageService = firebase.storage();
