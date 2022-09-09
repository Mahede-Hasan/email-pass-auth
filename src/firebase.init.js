// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2RVgT67ObrKK6Ib56bDnEPvD_BI6qd6k",
  authDomain: "email-pass-auth-7f361.firebaseapp.com",
  projectId: "email-pass-auth-7f361",
  storageBucket: "email-pass-auth-7f361.appspot.com",
  messagingSenderId: "971847302703",
  appId: "1:971847302703:web:1d8e8d2abee1973166d0da"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;