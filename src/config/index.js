import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// add firebase config
const firebaseConfig = {

};

// initialize firebase
initializeApp(firebaseConfig);

// initialize auth
const auth = getAuth();
const db = getDatabase();
const storage = getStorage();
export { auth, db, storage };
