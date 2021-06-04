import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAzMY23pgK5RByUNpZW_Z0Ucizjue6hBHs",
  authDomain: "signal-clone-f67cf.firebaseapp.com",
  projectId: "signal-clone-f67cf",
  storageBucket: "signal-clone-f67cf.appspot.com",
  messagingSenderId: "672379238512",
  appId: "1:672379238512:web:4ecfc0de98be2a4f729cb5",
  measurementId: "G-KSVPRWY1VX",
};
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };