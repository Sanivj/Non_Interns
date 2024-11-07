// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfazuzTYf2vTXndRjjLFBtgEl8CmGWsa4",
  authDomain: "trippy-34d6c.firebaseapp.com",
  projectId: "trippy-34d6c",
  storageBucket: "trippy-34d6c.firebasestorage.app",
  messagingSenderId: "133343870545",
  appId: "1:133343870545:web:c4b4219810c744b8d40270",
  measurementId: "G-Y9LFCWYXDP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
//const analytics = getAnalytics(app);