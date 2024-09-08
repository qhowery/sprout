import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQW3WoW1IhnWwArVrP1gy7VXTb8vTNwhM",
  authDomain: "sprout-9c2ee.firebaseapp.com",
  projectId: "sprout-9c2ee",
  storageBucket: "sprout-9c2ee.appspot.com",
  messagingSenderId: "297612531452",
  appId: "1:297612531452:web:8c39ed69bc8300b2da6979",
  measurementId: "G-7B26F00NQB"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };