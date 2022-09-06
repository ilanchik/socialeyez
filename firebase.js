// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAbJp9PtooIipYQUcx4OhXa9UaDcyNKACQ",
    authDomain: "socialeyez-5f95f.firebaseapp.com",
    projectId: "socialeyez-5f95f",
    storageBucket: "socialeyez-5f95f.appspot.com",
    messagingSenderId: "625296770410",
    appId: "1:625296770410:web:5ff54ce99203aa0e3e9113",
    databaseURL: 'https://socialeyez-5f95f-default-rtdb.firebaseio.com/',
    storageBucket: 'gs://socialeyez-5f95f.appspot.com'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authentication
const auth = getAuth(app);

// Database firestore
const db = getFirestore(app);

// Realtime database
const database = getDatabase(app);

// Firebase photo storage
const storage = getStorage(app);

export { app, auth, db, database, storage }