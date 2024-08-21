import * as firebase from "firebase/app";
import { getDatabase } from "firebase/database";

const config = {
  apiKey: "AIzaSyBWfefsKNm-yNrP7co03wAhIruiwbU37PI",
  authDomain: "heart-rate-ae678.firebaseapp.com",
  databaseURL:
    "https://heart-rate-ae678-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "heart-rate-ae678",
  storageBucket: "heart-rate-ae678.appspot.com",
  messagingSenderId: "200487423885",
  appId: "1:200487423885:web:37884a2f3b54966735b7c4",
  measurementId: "G-H9MJMB9HEY",
};

const app = firebase.initializeApp(config);
const database = getDatabase(app);

export { database };
