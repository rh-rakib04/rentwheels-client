// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtQIGmFnRMq12SwbXSQMSBH7gSe1ii6Cs",
  authDomain: "rent-wheels-526aa.firebaseapp.com",
  projectId: "rent-wheels-526aa",
  storageBucket: "rent-wheels-526aa.firebasestorage.app",
  messagingSenderId: "563755453161",
  appId: "1:563755453161:web:3ab6d32a5bf23445f6fe78",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
