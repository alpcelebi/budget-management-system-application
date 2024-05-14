
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdLTLLs54SQOI8SdLjeZIP5yc3mkymvJo",
  authDomain: "redux-toolkit-ve-modern-1b29d.firebaseapp.com",
  projectId: "redux-toolkit-ve-modern-1b29d",
  storageBucket: "redux-toolkit-ve-modern-1b29d.appspot.com",
  messagingSenderId: "32124278555",
  appId: "1:32124278555:web:503d2c180b5f3e78d4e5be"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);

export {
    auth,
    db
}