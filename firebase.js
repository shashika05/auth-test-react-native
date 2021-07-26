import firebase from "firebase";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
  databaseURL:
    "https://chatapp-fcfd6-default-rtdb.asia-southeast1.firebasedatabase.app",
  apiKey: "AIzaSyCj_IFoNZ_7jUmvnKWDf7D6o7Wcbdn-yLM",
  authDomain: "chatapp-fcfd6.firebaseapp.com",
  projectId: "chatapp-fcfd6",
  storageBucket: "chatapp-fcfd6.appspot.com",
  messagingSenderId: "875991008157",
  appId: "1:875991008157:web:cbaeea03125c4c6d012574",
  measurementId: "G-31LDKYPRLJ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
