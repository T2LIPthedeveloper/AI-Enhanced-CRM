import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

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
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
