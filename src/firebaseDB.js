// src/firebaseDB.js
import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; //Importar autenticación

// Configuración del proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB3_o7aFMBQWZJUwSkWKtLNwAq3xJwB1fc",
  authDomain: "swapnetwork-d302e.firebaseapp.com",
  projectId: "swapnetwork-d302e",
  storageBucket: "swapnetwork-d302e.appspot.com", //Corregido
  messagingSenderId: "288224487523",
  appId: "1:288224487523:web:25852509306e2f1d8db056",
  measurementId: "G-RSYVSF274N"
};

// Evita inicializar la app más de una vez
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

//Inicializa servicios de Firebase
const db = getFirestore(app);  // Base de datos
const auth = getAuth(app);     // Autenticación

// Exporta ambos para poder usarlos en todo el proyecto
export { db, auth };

