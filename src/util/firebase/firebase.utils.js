// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { deleteDoc, doc, getFirestore, setDoc } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

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
export const storage = getStorage(app);
export const db = getFirestore();

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Functions
//Sign up user
export const signUpUser = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);
//Sign in user
export const signInUser = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

// Sign Out User
export const signOutUser = () => signOut(auth);
export const dbQuery = (path) => query(collection(db, path));

// Sign in using google
const google = new GoogleAuthProvider();

export const googleSignIn = () => signInWithPopup(auth, google);
//Upload document
export const uploadComObject = (path, object) =>
  setDoc(doc(db, path, object.id), object);

//Remove document
export const deleteComObject = (path, object) =>
  deleteDoc(doc(db, path, object.id), object);

// Upload Images into storage

export const uploadImage = async (file, userId, comID) => {
  if (!file) return;
  // Storage reference
  const storageRef = ref(storage, `images/${userId}/${comID}/${file.name}`);

  try {
    // Upload file
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Optionally, handle progress (e.g., show upload progress)
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error(error);
      }
    );
    //Wait for upload to complete
    const uploadTaskSnapshot = await uploadTask;
    const downloadUrl = await getDownloadURL(uploadTaskSnapshot.ref);
    console.log("File available at", downloadUrl);
    return downloadUrl
  } catch (error) {
    console.log(error);
  }
};
