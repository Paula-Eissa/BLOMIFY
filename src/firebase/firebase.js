
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAas5i2BaLdvIR9--bZGQTcNERY1Lo8uFY",
  authDomain: "bouquet-project-data.firebaseapp.com",
  projectId: "bouquet-project-data",
  storageBucket: "bouquet-project-data.appspot.com",
  messagingSenderId: "1008601956624",
  appId: "1:1008601956624:web:7651e2d37e3226a4566595"
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db =getFirestore(app);
export {auth,db};
