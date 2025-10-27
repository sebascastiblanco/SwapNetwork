<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="custom-toolbar">
        <ion-title>
          <ion-buttons>
          <ion-button fill="clear" @click="IrAZonaswap">
            <ion-icon :icon="arrowBackOutline" id="volver"></ion-icon>
          </ion-button>
          Archivos y Banco de Apuntes
        </ion-buttons>
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding" color="light">
      <div id="subir">
      <ion-card>
        <ion-card-header>
          <ion-card-title style="font-weight:600; font-size:1.3rem;">Subir Apunte</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <ion-item>
            <ion-label position="stacked" class="custom-item">Materia o semestre</ion-label>
            <ion-input v-model="materia" placeholder="Ejemplo: Programación I"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label id="seleccionar_texto" position="stacked" class="custom-item">Seleccionar archivo</ion-label>
            <ion-input type="file" @change="seleccionarArchivo" />
          </ion-item>

          <ion-button id="boton_subir" @click="subirArchivo" :disabled="subiendo" shape="round">
            {{ subiendo ? "Subiendo..." : "Subir Archivo" }}
          </ion-button>

          <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>
        </ion-card-content>
      </ion-card>
    </div>
    <div id="apuntes">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Banco de Apuntes</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <ion-item>
            <ion-label class="custom-item" position="stacked">Buscar por materia</ion-label>
            <ion-input v-model="busqueda" placeholder="Ejemplo: Cálculo"></ion-input>
          </ion-item>
    

          <ion-list>
            <ion-item
              v-for="(archivo, index) in archivosFiltrados"
              :key="index"
              @click="descargarArchivo(archivo.url)"
            >
              <ion-label>
                <h2>{{ archivo.nombre }}</h2>
                <p>{{ archivo.materia }}</p>
              </ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonList,
  IonButtons,
  IonIcon
} from "@ionic/vue";

import { ref, computed, onMounted } from "vue";
import { db, storage } from "../firebaseDB";
import {
  ref as refStorage,
  uploadBytes,
  getDownloadURL,
  listAll
} from "firebase/storage";
import { arrowBackOutline} from 'ionicons/icons'
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useRouter } from 'vue-router';

const materia = ref("");
const archivo = ref(null);
const mensaje = ref("");
const subiendo = ref(false);
const busqueda = ref("");
const archivos = ref([]);

// Movimiento entre ventanas
const router = useRouter();
function IrAZonaswap() {
  router.push('/zonaswap')
}

// Seleccionar archivo
function seleccionarArchivo(event) {
  archivo.value = event.target.files[0];
}

// Subir archivo
async function subirArchivo() {
  if (!materia.value || !archivo.value) {
    mensaje.value = "Por favor completa todos los campos.";
    return;
  }

  try {
    subiendo.value = true;
    const ruta = `apuntes/${materia.value}/${archivo.value.name}`;
    const archivoRef = refStorage(storage, ruta);

    await uploadBytes(archivoRef, archivo.value);
    const url = await getDownloadURL(archivoRef);

    await addDoc(collection(db, "archivos"), {
      nombre: archivo.value.name,
      materia: materia.value,
      url
    });

    mensaje.value = "Archivo subido correctamente.";
    materia.value = "";
    archivo.value = null;
    await cargarArchivos();
  } catch (error) {
    mensaje.value = "Error al subir: " + error.message;
  } finally {
    subiendo.value = false;
  }
}

// Cargar archivos
async function cargarArchivos() {
  archivos.value = [];
  const querySnapshot = await getDocs(collection(db, "archivos"));
  querySnapshot.forEach((doc) => {
    archivos.value.push(doc.data());
  });
}

// Filtrar archivos
const archivosFiltrados = computed(() => {
  return archivos.value.filter((a) =>
    a.materia.toLowerCase().includes(busqueda.value.toLowerCase())
  );
});

// Descargar archivo
function descargarArchivo(url) {
  window.open(url, "_blank");
}

// Cargar al iniciar
onMounted(() => {
  cargarArchivos();
});
</script>

<style scoped>
.custom-toolbar {
  --background: #1a7431;
  --color: white;
}

#regresar {
  --color: white !important;
  color: white !important;
}

#subir {
  display: flex;
  justify-content: center;
}

ion-card {
  width: 60%;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  justify-content: center;
  height: auto;
  border-radius: 12px;
  --ion-card-box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 16px;
}

.subtitulo {
  font-size: 16px;
}

.mensaje {
  text-align: center;
  margin-top: 10px;
  color: #333;
}

#seleccionar_texto {
  background-color: white;
  margin-bottom: 2%;
}

#boton_subir {
  width: 40%;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  justify-content: center;
  align-items: center;
  margin-left: 30%;
  --background: #0e7c2a;
  color: black;
}

#boton_subir:hover {
  transform: scale(1.02);
  transition: 0.2s ease-in-out;
}

#apuntes {
  display: flex;
  justify-content: center;
}

.custom-item ion-label {
  font-size: 1rem;
  font-weight: 600;
}

</style>
