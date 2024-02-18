import firebase from 'firebase/app';

 import 'firebase/auth';
 export const auth = firebase.initializeApp({
  apiKey: "AIzaSyBIe2uL2-GSeMY9aXzVyfAJYSdTH8i5uy0",
  authDomain: "chart-apk.firebaseapp.com",
  projectId: "chart-apk",
  storageBucket: "chart-apk.appspot.com",
  messagingSenderId: "313819047308",
  appId: "1:313819047308:web:f4e2d6018f96574de922a9"
 }).auth();