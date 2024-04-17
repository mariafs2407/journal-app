// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getEnvironments } from "../helpers";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_DATABASEURL,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
} = getEnvironments();

//console.log(process)
//console.log(import.meta.env);

// Your web app's Firebase configuration
//Dev/prod
// const firebaseConfig = {
//   apiKey: "AIzaSyAbuVD0vLyn0j26MOO3Z0TAixSAn5-4PmE",
//   authDomain: "react-cursos-ff0ca.firebaseapp.com",
//   projectId: "react-cursos-ff0ca",
//   storageBucket: "react-cursos-ff0ca.appspot.com",
//   messagingSenderId: "223991927605",
//   appId: "1:223991927605:web:2c5a3aa0e7c1d1401d727c"
// };

//testing:
// const firebaseConfig = {
//   apiKey: "AIzaSyBolObYnnZ5rpsb1jUrQZM7jSQbyYDMXkA",
//   authDomain: "bdtesting-124d0.firebaseapp.com",
//   projectId: "bdtesting-124d0",
//   storageBucket: "bdtesting-124d0.appspot.com",
//   messagingSenderId: "493169488961",
//   appId: "1:493169488961:web:c047ee63a386401c4642c0"
// };

const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID,
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp); //configuracion de la bd
