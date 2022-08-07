import firebase from'firebase/app';
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firebase-storage'


let firebaseConfig = {
  apiKey: "XXXXXXXXXXX",
  authDomain: "XXXXXXXXXXX",
  databaseURL: "XXXXXXXXXXXXXX",
  projectId: "XXXXXXXXXXX",
  storageBucket: "XXXXXXXXXX",
  messagingSenderId: "XXXXXXXXXX",
  appId: "XXXXXXXXXXXXXX"
};

  
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
    
}
export default firebase;
