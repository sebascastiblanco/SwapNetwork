
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3_o7aFMBQWZJUwSkWKtLNwAq3xJwB1fc",
  authDomain: "swapnetwork-d302e.firebaseapp.com",
  projectId: "swapnetwork-d302e",
  storageBucket: "swapnetwork-d302e.firebasestorage.app",
  messagingSenderId: "288224487523",
  appId: "1:288224487523:web:25852509306e2f1d8db056",
  measurementId: "G-RSYVSF274N"
};

//inicializar firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

///inicializar autenticacion
const auth = getAuth(app);
const basedatos = getFirestore(app);

//Funcion regitrar usuario
const registerUser = async (usuario, correo, rol, contrasena) => {
    try {
        const userCredential = await createUserWithEmailAndPassword (auth, correo, contrasena);
        const datosUR = userCredential.user.uid;
        //Guardado de datos extra en Firestone
        await setDoc(doc(basedatos, "usuarios", datosUR), {
        usuario: usuario,
        rol: rol,
        correo: correo
    });
        alert("Usuario registrado:", userCredential.user);
        return userCredential;
    } catch (error) {
        alert("Error al registrar usuario:" + error.message || error.code);
    }
}

export {registerUser};
export {auth};
