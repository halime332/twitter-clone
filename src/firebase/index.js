// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCt_IaTXh0972lDBBdOiehZAdPNbFHmWHo",
    authDomain: "twitter-clone-a6489.firebaseapp.com",
    projectId: "twitter-clone-a6489",
    storageBucket: "twitter-clone-a6489.firebasestorage.app",
    messagingSenderId: "802847236513",
    appId: "1:802847236513:web:156e624369b62405646be0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);

export const storage = getStorage(app);