// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-rent-practice.firebaseapp.com",
  projectId: "mern-rent-practice",
  storageBucket: "mern-rent-practice.firebasestorage.app",
  messagingSenderId: "184264241604",
  appId: "1:184264241604:web:9316f8c56d145f8aaa7491",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
