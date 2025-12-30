


// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider,FacebookAuthProvider, signInWithPopup, GithubAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAFtXEwtZFLjbJlwanRnqVmicDZr8dBLm0",
  authDomain: "freshcart-dc250.firebaseapp.com",
  projectId: "freshcart-dc250",
  storageBucket: "freshcart-dc250.firebasestorage.app",
  messagingSenderId: "543161264943",
  appId: "1:543161264943:web:26beb21d44fdd2b56c8fda",
  measurementId: "G-X4HDGZMWNB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const Githubprovider = new GithubAuthProvider();


export { auth, googleProvider, facebookProvider, signInWithPopup ,Githubprovider};