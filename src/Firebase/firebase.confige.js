// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA-0iVAUa_ui2iUOWAKH4Sr2DF6CLA6D7I",
  authDomain: "product-peak-fe9b7.firebaseapp.com",
  projectId: "product-peak-fe9b7",
  storageBucket: "product-peak-fe9b7.appspot.com",
  messagingSenderId: "559990392600",
  appId: "1:559990392600:web:064e132019b4b22768806d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);