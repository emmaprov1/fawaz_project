// Import the functions you need from the SDKs you need
 
import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/storage'
import "firebase/database"

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyDbf09rzBrdIaeEwB5w5pqKom23nSgeCt8',
//   authDomain: 'visitee-f2df9.firebaseapp.com',
//   projectId: 'visitee-f2df9',
//   storageBucket: 'visitee-f2df9.appspot.com',
//   messagingSenderId: '775039344798',
//   appId: '1:775039344798:web:5187e1e2858b31b9f51b8f',
// };

  
const firebaseConfig = {
  apiKey: "AIzaSyBVZeTY5eLiiyngbZZ0b8PQKoZsIY9MqOo",
  databaseURL: "https://npf-recruitment-102021.firebaseapp.com",
  authDomain: "npf-recruitment-102021.firebaseapp.com",
  projectId: "npf-recruitment-102021",
  storageBucket: "npf-recruitment-102021.appspot.com",
  messagingSenderId: "425688837510",
  appId: "1:425688837510:web:b7a44905bf9376935a9007",
  measurementId: "G-CKDYYK7Z7W"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}else {
  firebase.app(); // if already initialized, use that one
}

export default firebase
