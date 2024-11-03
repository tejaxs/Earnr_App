// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBDv_yMJC6B4WxF96K8YVjEveM_iFPe4gM",
    authDomain: "earn-ea4bc.firebaseapp.com",
    projectId: "earn-ea4bc",
    storageBucket: "earn-ea4bc.appspot.com",
    messagingSenderId: "1066381293991",
    appId: "1:1066381293991:web:7b115b531db3304ac65e82",
    measurementId: "G-WCWWFFQJ4S"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// Export the authentication instance
export const auth = getAuth(app);

