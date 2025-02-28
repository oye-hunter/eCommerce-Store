import { auth } from '@/config/firebaseConfig';
// import auth from '@react-native-firebase/auth';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential
} from 'firebase/auth';
// import {
//   GoogleSignin,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';


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


// Somewhere in your code

// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// GoogleSignin.configure({
//   webClientId: '27659315254-u7f0o7vp829ik7b9ae2fa4qbenlgars8.apps.googleusercontent.com',
// });

// export const signIn = async (idToken: string | null) => {
//   try {
//     // Check if your device supports Google Play
//   await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
//   // Get the users ID token
//   const signInResult = await GoogleSignin.signIn();

//   // Try the new style of google-sign in result, from v13+ of that module
//   // idToken = signInResult.data?.idToken;
//   // if (!idToken) {
//   //   idToken = signInResult.idToken;
//   // }
//   if (!idToken) {
//     throw new Error('No ID token found');
//   }

//   // Create a Google credential with the token
//   const googleCredential = auth.GoogleAuthProvider.credential(idToken);

//   // Sign-in the user with the credential
//   return auth().signInWithCredential(googleCredential);

//   } catch (error) {
//     if (isErrorWithCode(error)) {
//       switch (error.code) {
//         case statusCodes.IN_PROGRESS:
//           // operation (eg. sign in) already in progress
//           break;
//         case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
//           // Android only, play services not available or outdated
//           break;
//         default:
//         // some other error happened
//       }
//     } else {
//       // an error that's not related to google sign in occurred
//     }
//   }
// };
// function isErrorWithCode(error: unknown): error is { code: string } {
//   return typeof error === 'object' && error !== null && 'code' in error;
// }
