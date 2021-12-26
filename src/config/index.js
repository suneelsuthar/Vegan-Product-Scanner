import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// add firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBVZza4G1hf7FD0z--PvyQ2R9SMswzaRPc",
  authDomain: "veganproducts-64762.firebaseapp.com",
  databaseURL: "https://veganproducts-64762-default-rtdb.firebaseio.com",
  projectId: "veganproducts-64762",
  storageBucket: "veganproducts-64762.appspot.com",
  messagingSenderId: "661901715662",
  appId: "1:661901715662:web:475eaa10908e0f7509889f",
  measurementId: "G-7PN0752W42",
};

// initialize firebase
initializeApp(firebaseConfig);

// initialize auth
const auth = getAuth();
const db = getDatabase();
const storage = getStorage();
export { auth, db, storage };
