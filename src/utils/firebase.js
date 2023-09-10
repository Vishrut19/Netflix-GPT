// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDm3hViU_Iw1qch5owSoTQHdVEjEwHIATw",
  authDomain: "netflixgpt-243d9.firebaseapp.com",
  projectId: "netflixgpt-243d9",
  storageBucket: "netflixgpt-243d9.appspot.com",
  messagingSenderId: "228694288483",
  appId: "1:228694288483:web:4e0720668bcf436e577056",
  measurementId: "G-RF029DJG2Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
