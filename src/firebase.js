import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore'

const app = firebase.initializeApp({
  apiKey: "AIzaSyD2961DuecsMUBh8wZnkSwABbsGMKuETKk",
  authDomain: "taskmanager-23f8a.firebaseapp.com",
  projectId: "taskmanager-23f8a",
  storageBucket: "taskmanager-23f8a.appspot.com",
  messagingSenderId: "980918032506",
  appId: "1:980918032506:web:ef1725e9bc1b09e68343c3",
});

export const auth = app.auth();
export const firestore = app.firestore();
export const database = {
  tasks: firestore.collection("tasks"),
  comments: firestore.collection("comments"),
  users: firestore.collection("users"),
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
}
export default app;
