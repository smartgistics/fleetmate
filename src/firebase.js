// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAl8BQV7CCqfUc9tr-Wf0i8Ds71sqJ3e28",
    authDomain: "fleetmate-6800e.firebaseapp.com",
    projectId: "fleetmate-6800e",
    storageBucket: "fleetmate-6800e.firebasestorage.app",
    messagingSenderId: "574462719866",
    appId: "1:574462719866:web:ceee75725daa96b25f88c3",
    measurementId: "G-G7ZKLXS11Q"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };