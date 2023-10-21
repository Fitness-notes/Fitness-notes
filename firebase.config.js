// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, } from 'firebase/firestore'
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

//TODO add here your configuration, go to https://firebase.google.com for more information

export const App = initializeApp(firebaseConfig);
export const AUTH = initializeAuth(App, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
export const Firestore = getFirestore(App)

