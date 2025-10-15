// src/firebaseDB.js
import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Configuración del proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB3_o7aFMBQWZJUwSkWKtLNwAq3xJwB1fc",
  authDomain: "swapnetwork-d302e.firebaseapp.com",
  projectId: "swapnetwork-d302e",
  storageBucket: "swapnetwork-d302e.appspot.com",
  messagingSenderId: "288224487523",
  appId: "1:288224487523:web:25852509306e2f1d8db056",
  measurementId: "G-RSYVSF274N"
};

// Inicializa Firebase (evita múltiples inicializaciones)
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// Inicializa servicios de Firebase
const db = getFirestore(app);   
const auth = getAuth(app);      
const storage = getStorage(app); 

// Exporta todo para usarlo en el resto del proyecto
export { app, db, auth, storage };
