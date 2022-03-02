import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "key",
  authDomain: "signal-clone-f67cf.firebaseapp.com",
  projectId: "signal-clone-f67cf",
  storageBucket: "signal-clone-f67cf.appspot.com",
  messagingSenderId: "672379238512",
  appId: "appid",
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
