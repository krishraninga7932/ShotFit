// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmMqRnyuKGZfhJsljRc2wjkCbsiejR5iE",
  authDomain: "shotfit-c0e4a.firebaseapp.com",
  projectId: "shotfit-c0e4a",
  storageBucket: "shotfit-c0e4a.firebasestorage.app",
  messagingSenderId: "1010767441859",
  appId: "1:1010767441859:web:2f96eb7cb11b065e999776",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
