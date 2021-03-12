import axios from 'axios';
import { Storage } from 'react-jhipster';
import { firebaseAuth, firebaseGoogleAuthProvider, firebaseFacebookAuthProvider } from 'app/config/firebase';
import { FIREBASE_AUTH_HEADER_NAME, AUTH_TOKEN_KEY, FIREBASE_TOKEN_KEY } from 'app/config/constants';
import store from 'app/config/store';
import { ACTION_TYPES } from '../reducers/authentication';
import { ILogin } from '../model/auth/login.model';

export async function getAuthToken(firebaseToken: string): Promise<void> {
  const headers = {
    [FIREBASE_AUTH_HEADER_NAME]: firebaseToken
  };
  const response = await axios.post('/api/authenticate/firebase', null, {
    headers
  });
  const jwtToken: string = response.data['accessToken'];
  Storage.local.set(AUTH_TOKEN_KEY, jwtToken);
  store.dispatch({ type: ACTION_TYPES.LOGIN });
}

export function logout(): void {
  Storage.local.remove(FIREBASE_TOKEN_KEY);
  Storage.local.remove(AUTH_TOKEN_KEY);
  store.dispatch({ type: ACTION_TYPES.LOGOUT });
}

const SocialProvider = {
  facebook: firebaseFacebookAuthProvider,
  google: firebaseGoogleAuthProvider
};

export function socialLogin(providerType: keyof typeof SocialProvider): Promise<string> {
  return new Promise(async (resolve, reject) => {
    const provider = SocialProvider[providerType];
    firebaseAuth
      .signInWithPopup(provider)
      .then(userCredentials => {
        return userCredentials.user.getIdToken();
      })
      .then(firebaseToken => {
        Storage.local.set(FIREBASE_TOKEN_KEY, firebaseToken);
        resolve(firebaseToken);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export async function emailRegister(logincredential: ILogin): Promise<void> {
  if (!(logincredential.email && logincredential.password)) {
    throw new Error('Please enter your email and password');
  }
  await firebaseAuth.createUserWithEmailAndPassword(logincredential.email, logincredential.password);
  if (!firebaseAuth.currentUser) {
    throw new Error('No user created, please try again');
  }
  await firebaseAuth.currentUser.sendEmailVerification();
}

export async function emailLogin(logincredential: ILogin): Promise<string> {
  if (!(logincredential.email && logincredential.password)) {
    throw new Error('Please enter your email and password');
  }
  const userCredential = await firebaseAuth.signInWithEmailAndPassword(logincredential.email, logincredential.password);
  if (!userCredential.user) {
    throw new Error('userCredential.user is null');
  }
  if (!userCredential.user.emailVerified) {
    throw new Error('Please verify your email before login');
  }
  const firebaseToken = await userCredential.user.getIdToken();
  if (!firebaseToken) {
    throw new Error('firebaseToken is null');
  }
  Storage.local.set(FIREBASE_TOKEN_KEY, firebaseToken);
  return firebaseToken;
}

export async function emailResetPassword(email: string): Promise<void> {
  await firebaseAuth.sendPasswordResetEmail(email);
}

export function fetchAccount(): Promise<void> {
  return new Promise(async (resolve, reject) => {
    axios
      .get(`/api/account`)
      .then(res => {
        store.dispatch({ type: ACTION_TYPES.FETCH_ACCOUNT, payload: res.data });
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  });
}
