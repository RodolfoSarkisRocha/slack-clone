import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBWN0d9uGv2dX-QV7uLTDGyrHToI9n5d98',
  authDomain: 'slack-clone-61c70.firebaseapp.com',
  databaseURL: 'https://slack-clone-61c70.firebaseio.com',
  projectId: 'slack-clone-61c70',
  storageBucket: 'slack-clone-61c70.appspot.com',
  messagingSenderId: '866153722399',
  appId: '1:866153722399:web:272b1512be39d50b6b1b2a',
  measurementId: 'G-4GCQD7PQ17',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
