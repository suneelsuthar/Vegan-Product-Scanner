import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// add firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCVbMGXVykkHlfWV2_W_-eP4DkwcA5rR-w",
  authDomain: "vagantrackerapp.firebaseapp.com",
  databaseURL: "https://vagantrackerapp-default-rtdb.firebaseio.com",
  projectId: "vagantrackerapp",
  storageBucket: "vagantrackerapp.appspot.com",
  messagingSenderId: "173257995549",
  appId: "1:173257995549:web:3e8cdc32adac2decb3ddf4",
  measurementId: "G-SXPT1T32FN",
};

// initialize firebase
initializeApp(firebaseConfig);

// initialize auth
const auth = getAuth();
const db = getDatabase();
const storage = getStorage();
export { auth, db, storage };
