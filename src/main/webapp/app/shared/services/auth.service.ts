import axios from 'axios';
import { Storage } from 'react-jhipster';
import { firebaseAuth, firebaseGoogleAuthProvider, firebaseFacebookAuthProvider } from 'app/config/firebase';
import { FIREBASE_AUTH_HEADER_NAME, ACCESS_TOKEN_KEY, FIREBASE_TOKEN_KEY, REFRESH_TOKEN_KEY } from 'app/config/constants';
import store from 'app/config/store';
import { ACTION_TYPES } from '../reducers/authentication';
import { ILogin } from '../model/auth/login.model';
import { IAuthToken } from '../model/auth/auth-token.model';

export async function getAuthToken(firebaseToken: string): Promise<void> {
  const headers = {
    [FIREBASE_AUTH_HEADER_NAME]: firebaseToken,
  };
  const response = await axios.post('/api/authenticate/firebase', null, { headers });
  const responseBody: IAuthToken = response.data;
  Storage.local.set(ACCESS_TOKEN_KEY, responseBody.accessToken);
  Storage.local.set(REFRESH_TOKEN_KEY, responseBody.refreshToken);
  await fetchAccount();
  // await checkUserProfileCompleted();
}

export function logout(): void {
  Storage.local.remove(FIREBASE_TOKEN_KEY);
  Storage.local.remove(ACCESS_TOKEN_KEY);
  Storage.local.remove(REFRESH_TOKEN_KEY);
  store.dispatch({ type: ACTION_TYPES.LOGOUT });
}

export async function handleUnauthenticated(): Promise<void> {
  const refreshToken = Storage.local.get(REFRESH_TOKEN_KEY) || Storage.session.get(REFRESH_TOKEN_KEY);
  if (refreshToken) {
    let response = null;
    try {
      response = await axios.post(`/api/authenticate/refresh?refreshToken=${refreshToken}`);
    } catch (err) {
      logout();
      throw err;
    }
    const responseBody: IAuthToken = response.data;
    Storage.local.set(ACCESS_TOKEN_KEY, responseBody.accessToken);
    Storage.local.set(REFRESH_TOKEN_KEY, responseBody.refreshToken);
    await fetchAccount();
    // await checkUserProfileCompleted();
  }
}

const SocialProvider = {
  facebook: firebaseFacebookAuthProvider,
  google: firebaseGoogleAuthProvider,
};

export async function socialLogin(providerType: keyof typeof SocialProvider): Promise<string> {
  const provider = SocialProvider[providerType];
  const userCredentials = await firebaseAuth.signInWithPopup(provider);
  const firebaseToken = await userCredentials.user?.getIdToken();
  if (!firebaseToken) throw new Error('Firebase Token is undefined');
  Storage.local.set(FIREBASE_TOKEN_KEY, firebaseToken);
  return firebaseToken;
}

export async function emailRegister(logincredential: ILogin): Promise<void> {
  const isValidCredential = Boolean(logincredential.email) && Boolean(logincredential.password);
  if (!isValidCredential) {
    throw new Error('Please enter your email and password');
  }
  await firebaseAuth.createUserWithEmailAndPassword(logincredential.email, logincredential.password);
  if (!firebaseAuth.currentUser) {
    throw new Error('No user created, please try again');
  }
  await firebaseAuth.currentUser.sendEmailVerification();
}

export async function emailLogin(logincredential: ILogin): Promise<string> {
  const isValidCredential = Boolean(logincredential.email) && Boolean(logincredential.password);
  if (!isValidCredential) {
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

export async function fetchAccount(): Promise<void> {
  const res = await axios.get(`/api/account`);
  store.dispatch({ type: ACTION_TYPES.FETCH_ACCOUNT, payload: res.data });
  await checkUserProfileCompleted();
}

export async function checkUserProfileCompleted(): Promise<void> {
  const res = await axios.get(`/api/account/is-profile-completed`);
  store.dispatch({ type: ACTION_TYPES.CHECK_USERPROFILE_COMPLETE, payload: res.data });
}
