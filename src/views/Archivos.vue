<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Archivos y Banco de Apuntes</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Subir Apunte</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <ion-item>
            <ion-label position="stacked">Materia o semestre</ion-label>
            <ion-input v-model="materia" placeholder="Ejemplo: Programación I"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Seleccionar archivo</ion-label>
            <input type="file" @change="seleccionarArchivo" />
          </ion-item>

          <ion-button expand="block" @click="subirArchivo" :disabled="subiendo">
            {{ subiendo ? "Subiendo..." : "Subir Archivo" }}
          </ion-button>

          <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>Banco de Apuntes</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <ion-item>
            <ion-label position="stacked">Buscar por materia</ion-label>
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
  IonList
} from "@ionic/vue";

import { ref, computed, onMounted } from "vue";
import { db, storage } from "../firebaseDB";
import {
  ref as refStorage,
  uploadBytes,
  getDownloadURL,
  listAll
} from "firebase/storage";
import { collection, addDoc, getDocs } from "firebase/firestore";

const materia = ref("");
const archivo = ref(null);
const mensaje = ref("");
const subiendo = ref(false);
const busqueda = ref("");
const archivos = ref([]);

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
.mensaje {
  text-align: center;
  margin-top: 10px;
  color: #333;
}
</style>
