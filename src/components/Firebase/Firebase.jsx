import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCfTzNMc-p5pj89EeLVVrUxHaLRhXu3V5Y",
  authDomain: "fisiterapia-69bf5.firebaseapp.com",
  projectId: "fisiterapia-69bf5",
  storageBucket: "fisiterapia-69bf5.firebasestorage.app",
  messagingSenderId: "498395665576",
  appId: "1:498395665576:web:adc4de3b9c08fd998bde9d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const googleProvider = new GoogleAuthProvider()

export {auth, googleProvider}