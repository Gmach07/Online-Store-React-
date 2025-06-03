import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { snapshotEqual } from 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAPznM5dJBCEFZ9A_gDmNO-yHWmGmY2Gt8",
  authDomain: "ecommerce-c3189.firebaseapp.com",
  projectId: "ecommerce-c3189",
  storageBucket: "ecommerce-c3189.firebasestorage.app",
  messagingSenderId: "237510312209",
  appId: "1:237510312209:web:bd1df9011275d41792ccb0"
};


const firebaseApp = !firebase.apps.Length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export const uploadImage = async (file) => {
 return new Promise((resolve, reject) => {
  const uploadProcces = storage.child(`images/${file.name}-${file.lastModified}`).put(file);

  uploadProcces.on("state_changed"),(snapshot)=>console.log(`Subiendo ${file.name}: ${snapshot.bytesTransferred} bytes transferidos de ${snapshot.totalBytes} bytes totales.`), 
  reject, () =>{
    storage.ref('images').child(`${file.name}-${file.lastModified}`).getDownloadURL().then(resolve)
  }
});
}

