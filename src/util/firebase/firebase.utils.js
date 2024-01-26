// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGJt9C9kIT2U2D73mPBXyvPtQFr5DvE2Q",
  authDomain: "commission-manager-901ae.firebaseapp.com",
  projectId: "commission-manager-901ae",
  storageBucket: "commission-manager-901ae.appspot.com",
  messagingSenderId: "66387001598",
  appId: "1:66387001598:web:fdc655256242666d1ae5af",
  measurementId: "G-P4PVSJ6ZB8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Functions
//Sign up user
export const signUpUser = (email, password) => createUserWithEmailAndPassword(auth, email, password)
//Sign in user
export const signInUser = (email, password) => signInWithEmailAndPassword(auth, email, password)


// Sign Out User
export const signOutUser = () => signOut(auth);
