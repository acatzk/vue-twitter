import firebase from "firebase";
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAVJlnEBMA7NPcYKoC6qHkOldYeHXQ2Gfs",
  authDomain: "social-media-vue.firebaseapp.com",
  databaseURL: "https://social-media-vue.firebaseio.com",
  projectId: "social-media-vue",
  storageBucket: "social-media-vue.appspot.com",
  messagingSenderId: "284380650113",
  appId: "1:284380650113:web:f64878fb7e5fbaf50b0b80",
  measurementId: "G-HKLGWWVMSN"
};
// Initialize Firebase
export const fb = firebase.initializeApp(firebaseConfig);
