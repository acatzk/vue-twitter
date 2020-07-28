import firebase from "firebase";
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAraiqz9i6ePmMPD3f3jBqOnpwZ93CUpxQ",
  authDomain: "vue-twitter-abae3.firebaseapp.com",
  databaseURL: "https://vue-twitter-abae3.firebaseio.com",
  projectId: "vue-twitter-abae3",
  storageBucket: "vue-twitter-abae3.appspot.com",
  messagingSenderId: "81964812130",
  appId: "1:81964812130:web:c7d0ecd93c1f1ae0fa4e3b",
  measurementId: "G-N7BEC946F7"
};
// Initialize Firebase
export const fb = firebase.initializeApp(firebaseConfig);
