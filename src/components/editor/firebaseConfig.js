import firebase from "firebase";

console.log(process.env);

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

if (!firebase.app.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
export const dbRefence = (current) => {
  return firebase.database().ref().child(current);
};

export const dbCopy = (current, newdb) => {
  const sourceRef = firebase.database().ref().child(current);

  // Reference the location where you want to copy the data in the destination database
  const destRef = firebase.database().ref().child(newdb);

  // Copy the data from the source to the destination
  sourceRef.once("value").then((snapshot) => {
    destRef.set(snapshot.val()).catch((error) => {
      console.error("Data could not be copied: ", error);
    });
  });
};

export default firebaseConfig;
