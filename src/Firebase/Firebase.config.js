// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDC9qxB4LTy6euXoj8KiIZ_9By7ONLGM3A",
  authDomain: "the-book-heaven-664d8.firebaseapp.com",
  projectId: "the-book-heaven-664d8",
  storageBucket: "the-book-heaven-664d8.firebasestorage.app",
  messagingSenderId: "519484923271",
  appId: "1:519484923271:web:f1bc157172baf72273c722"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);