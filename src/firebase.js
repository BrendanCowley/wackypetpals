import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyB3L7S0L00ChTebNgCR1wqQ18IBXwTwZsY",
  authDomain: "pet-profiles.firebaseapp.com",
  databaseURL: "https://pet-profiles.firebaseio.com",
  projectId: "pet-profiles",
  storageBucket: "pet-profiles.appspot.com",
  messagingSenderId: "189464479121"
};
firebase.initializeApp(config);
export default firebase;
