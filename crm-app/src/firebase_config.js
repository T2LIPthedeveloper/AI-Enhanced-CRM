import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAEBvAoSCvs9AuuK6jysduDqImrwHDdNZQ",
    authDomain: "tiktok-sales-helper.firebaseapp.com",
    projectId: "tiktok-sales-helper",
    storageBucket: "tiktok-sales-helper.appspot.com",
    messagingSenderId: "1065591144705",
    appId: "1:1065591144705:web:a82f2552d23597a80e9b00",
    measurementId: "G-8C6XZT8EVM"
  };
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, collection };
