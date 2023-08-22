import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {

  apiKey: process.env.REACT_APP_APIKEY,

  authDomain: "anima-80af4.firebaseapp.com",

  projectId: "anima-80af4",

  storageBucket: "anima-80af4.appspot.com",

  messagingSenderId: "107841057777",

  appId: "1:107841057777:web:35a2014caaebb5e63c4a50",

  measurementId: "G-QJ9KRMQSXH"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;