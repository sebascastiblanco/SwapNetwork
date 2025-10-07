import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // o getDatabase si usas Realtime

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "swapnetwork.firebaseapp.com",
  projectId: "swapnetwork",
  storageBucket: "swapnetwork.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdefg12345"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta la base de datos
const db = getFirestore(app);
export { db };