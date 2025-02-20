import { auth } from '@/config/firebaseConfig';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential
} from 'firebase/auth';

const getErrorMessage = (code: string) => {
  switch (code) {
    case 'auth/invalid-email': return 'Invalid email format';
    case 'auth/user-disabled': return 'Account disabled';
    case 'auth/user-not-found': return 'User not found';
    case 'auth/wrong-password': return 'Incorrect password';
    case 'auth/email-already-in-use': return 'Email already registered';
    case 'auth/weak-password': return 'Password too weak';
    default: return 'Authentication failed';
  }
};

export const emailSignUp = async (email: string, password: string) => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    throw new Error(getErrorMessage(error.code));
  }
};

export const emailSignIn = async (email: string, password: string) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    throw new Error(getErrorMessage(error.code));
  }
};

export const googleSignIn = async (idToken: string) => {
  try {
    const credential = GoogleAuthProvider.credential(idToken);
    return await signInWithCredential(auth, credential);
  } catch (error: any) {
    throw new Error(getErrorMessage(error.code));
  }
};