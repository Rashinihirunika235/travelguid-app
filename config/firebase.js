import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Auth සඳහා මේවා import කරන්න
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBS_wxhk2HDAc1ETTZ7RVXfd22AaXcqywo",
  authDomain: "serendib-12490.firebaseapp.com",
  projectId: "serendib-12490",
  storageBucket: "serendib-12490.firebasestorage.app",
  messagingSenderId: "1086801370157",
  appId: "1:1086801370157:web:0bf6b46bdd5febe87feca4",
  measurementId: "G-15H2JNKNGL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth with Persistence 
// මේකෙන් තමයි User ලොග් වෙලා ඉන්න එක මතක තියාගන්නේ
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});