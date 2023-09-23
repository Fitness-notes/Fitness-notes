// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsJbJ6KjGNELFhUCX40lSoV073TODwhYA",
  authDomain: "gymador-f6ca5.firebaseapp.com",
  projectId: "gymador-f6ca5",
  storageBucket: "gymador-f6ca5.appspot.com",
  messagingSenderId: "234066723435",
  appId: "1:234066723435:web:9601e2cac9d7917871a72e",
  measurementId: "G-Z3RZ4NHRCG"
};


export const App = initializeApp(firebaseConfig);
export const AUTH = getAuth(App)
export const Firestore = getFirestore(App)

