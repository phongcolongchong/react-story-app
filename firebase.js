require('firebase/firestore');
import firebase from 'firebase';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: "AIzaSyAglTZIL0X5AbfzGYPc9x_zxoMbQ173u00",
  authDomain: "react-story-app.firebaseapp.com",
  databaseURL: "https://react-story-app.firebaseio.com",
  projectId: "react-story-app",
  storageBucket: "react-story-app.appspot.com",
  messagingSenderId: "552033891629",
  appId: "1:552033891629:web:17d391fa5a873177aacfa4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

export const auth = firebase.auth();
export const storage = firebase.storage();
export const firestore = firebase.firestore;

export default db;