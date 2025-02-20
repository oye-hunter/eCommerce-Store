import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyD_VVvZR4cX8RWObY-28HijR7p7tEf8Etc",
  authDomain: "ecommerce-store-3f4ea.firebaseapp.com",
  projectId: "ecommerce-store-3f4ea",
  storageBucket: "ecommerce-store-3f4ea.firebasestorage.app",
  messagingSenderId: "27659315254",
  appId: "1:27659315254:web:66893a40098f2bb41d5097"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(app);