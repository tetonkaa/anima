import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "Your-API-Key",
  authDomain: "Your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
  measurementId: "your–messure-id",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;