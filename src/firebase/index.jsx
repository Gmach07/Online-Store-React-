// src/firebase/index.jsx
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAPznM5dJBCEFZ9A_gDmNO-yHWmGmY2Gt8",
  authDomain: "ecommerce-c3189.firebaseapp.com",
  projectId: "ecommerce-c3189",
  storageBucket: "ecommerce-c3189.firebasestorage.app",  // <-- CORREGIDO (.app -> .com)
  messagingSenderId: "237510312209",
  appId: "1:237510312209:web:bd1df9011275d41792ccb0"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// ✅ Función modular para subir imagen
export const uploadImage = async (file) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `images/${file.name}-${file.lastModified}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        console.log(
          `Subiendo ${file.name}: ${snapshot.bytesTransferred} bytes transferidos de ${snapshot.totalBytes} bytes totales.`
        );
      },
      (error) => reject(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject);
      }
    );
  });
};

export { auth, db, storage };
