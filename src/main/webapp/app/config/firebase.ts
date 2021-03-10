/* tslint:disable:no-submodule-imports*/
import firebase from 'firebase/app';
import 'firebase/auth';
/* tslint:enable:no-submodule-imports*/

export const FirebaseConfig = {
  apiKey: 'AIzaSyBf0tf3CgQ-QurMEX3C369xd1LM2XbgG8s',
  authDomain: 'ccclubmanagement.firebaseapp.com',
  projectId: 'ccclubmanagement',
  storageBucket: 'ccclubmanagement.appspot.com',
  messagingSenderId: '8505081606',
  appId: '1:8505081606:web:b37c83a29c4d99b1d9e887'
};

firebase.initializeApp(FirebaseConfig);

export const firebaseGoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firebaseFacebookAuthProvider = new firebase.auth.FacebookAuthProvider();
export const firebaseAuth = firebase.auth();
