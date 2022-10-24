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
  apiKey: "AIzaSyBB9d2tPREBiLzsJzBoHIcd98wTMDTenMg",
  authDomain: "fawaziatproject.firebaseapp.com",
  projectId: "fawaziatproject",
  storageBucket: "fawaziatproject.appspot.com",
  messagingSenderId: "1057192270767",
  appId: "1:1057192270767:web:0ec0c6a64ba0d2a8b8ad5a",
  measurementId: "G-Z76DEQX8JZ"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}else {
  firebase.app(); // if already initialized, use that one
}

export default firebase
