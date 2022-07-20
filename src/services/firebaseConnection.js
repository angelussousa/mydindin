import firebase from'firebase/app';
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firebase-storage'


let firebaseConfig = {
  apiKey: "AIzaSyBZcZnS8Dxykf_A5yh_7pUq6hVQv6cs_Hk",
  authDomain: "mydindin-69a3f.firebaseapp.com",
  databaseURL: "https://mydindin-69a3f-default-rtdb.firebaseio.com",
  projectId: "mydindin-69a3f",
  storageBucket: "mydindin-69a3f.appspot.com",
  messagingSenderId: "842689252382",
  appId: "1:842689252382:web:b62b7160607dbe0f0cb20f"
};

  
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
    
}
export default firebase;
