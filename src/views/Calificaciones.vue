<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          <ion-button fill="clear" @click="IrAZonaswap">
            <ion-icon :icon="arrowBackOutline" id="volver"></ion-icon>
          </ion-button>
          Calificaciones y reseñas
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-list>

        <ion-item>
          <ion-button @click="abrirCalificacion">Crear calificación</ion-button>
        </ion-item>

        <!-- Modal para crear calificación -->
        <ion-modal :is-open="mostrar" @didDismiss="cerrar">
          <ion-header>
            <ion-toolbar>
              <ion-title>Nueva Calificación</ion-title>
              <ion-buttons slot="end">
                <ion-button @click="cerrar">Cerrar</ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>

          <ion-content>
            <ion-item>
              <ion-label position="floating">Comentario</ion-label>
              <ion-textarea v-model="comentario"></ion-textarea>
            </ion-item>

            <!-- Selector de docente -->
            <ion-item>
              <ion-label position="stacked">Docente</ion-label>
              <ion-select v-model="docente" interface="popover" placeholder="Selecciona un docente">
                <ion-select-option v-for="(nombre, index) in docentesFijos" :key="index" :value="nombre">
                  {{ nombre }}
                </ion-select-option>
                <ion-select-option value="otro">Otro (escribir manualmente)</ion-select-option>
              </ion-select>
            </ion-item>

            <!-- Campo adicional si elige “otro” -->
            <ion-item v-if="docente === 'otro'">
              <ion-label position="floating">Nombre del nuevo docente</ion-label>
              <ion-input v-model="docentePersonalizado"></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="floating">Materia</ion-label>
              <ion-input v-model="materia"></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="floating">Valoración</ion-label>
              <ion-input v-model="valoracion"></ion-input>
            </ion-item>

            <ion-button expand="block" @click="guardar">Publicar</ion-button>
          </ion-content>
        </ion-modal>

        <ion-item>
          <ion-label>Buscar por nombre del maestro</ion-label>
          <ion-input v-model="busqueda" placeholder="Ejemplo: Sebastián..." />
          <ion-button @click="buscar">Buscar</ion-button>
        </ion-item>

        <!-- Lista de reseñas -->
        <ion-list v-if="reseñasFiltradas.length > 0">
          <ion-item v-for="(r, i) in reseñasFiltradas" :key="i">
            <ion-label>
              <h2>{{ r.comentario }}</h2>
              <p><strong>Docente:</strong> {{ r.docente }}</p>
              <p><strong>Materia:</strong> {{ r.materia }}</p>
              <p><strong>Valoración:</strong> {{ r.valoracion }}</p>
              <small>Publicado el {{ r.fecha }}</small>
            </ion-label>
          </ion-item>
        </ion-list>

        <ion-text v-else>
          <p style="text-align: center;">No se encontraron reseñas</p>
        </ion-text>

      </ion-list>
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
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonModal,
  IonButtons,
  IonTextarea,
  IonText,
  IonSelect,
  IonSelectOption
} from '@ionic/vue'
import { useRouter } from 'vue-router';
import { ref } from 'vue'
import { arrowBackOutline } from 'ionicons/icons'
import { calificacion } from '../router/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore'
import { basedatos } from '../router/firebaseConfig';

// Movimiento entre ventanas
const router = useRouter();
function IrAZonaswap() {
  router.push('/zonaswap')
}

// Lista fija de docentes
const docentesFijos = [
  'Alexander Mendoza Monaga',
  'Arley Alexander Rodríguez Pascuas',
  'Dilia Inés Molina Cubillos',
  'Ebelín Rocio Rodríguez Lombo',
  'Edgar Arturo Bustos Caldas',
  'Edilberto Ramírez Rivera',
  'Jorge Armando Jurado Peralta',
  'José Fernando Pinto Cruz',
  'José Fernando Sotelo',
  'Martín Ricardo Encizo Méndez',
  'Ricardo Alfonso Sanabria',
  'Rittner Eduardo Castro Galindo',
  'Robinson Alfonso Arias Ramos',
  'Rubén Darío Rodríguez Useche',
  'William Galvis Cuellar'
]

// Variables reactivas
const comentario = ref('')
const docente = ref('')
const docentePersonalizado = ref('')
const materia = ref('')
const valoracion = ref('')
const mostrar = ref(false)
const reseñas = ref([])
const reseñasFiltradas = ref([])
const busqueda = ref('')

const abrirCalificacion = () => (mostrar.value = true)
const cerrar = () => (mostrar.value = false)

// Guardar reseña
const guardar = async () => {
  const docenteFinal = docente.value === 'otro' ? docentePersonalizado.value : docente.value

  if (!docenteFinal) {
    alert('Por favor selecciona o escribe un nombre de docente')
    return
  }

  await calificacion(comentario.value, docenteFinal, valoracion.value, materia.value)

  const fechaFormateada = new Date().toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  reseñas.value.push({
    comentario: comentario.value,
    docente: docenteFinal,
    materia: materia.value,
    valoracion: valoracion.value,
    fecha: fechaFormateada
  })

  comentario.value = ''
  docente.value = ''
  docentePersonalizado.value = ''
  materia.value = ''
  valoracion.value = ''
  cerrar()

  reseñasFiltradas.value = reseñas.value
}

// Buscar por nombre del docente
const buscar = async () => {
  const nombre = busqueda.value.trim()

  if (!nombre) {
    reseñasFiltradas.value = []
    alert('Por favor escribe el nombre del docente')
    return
  }

  try {
    const reseñasRef = collection(basedatos, 'calificaciones')
    const q = query(reseñasRef, where('docente', '==', nombre))
    const querySnapshot = await getDocs(q)

    reseñasFiltradas.value = querySnapshot.docs.map(doc => {
      const data = doc.data()
      const fechaFormateada = data.fecha
        ? data.fecha.toDate().toLocaleDateString('es-CO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        : ''

      return {
        id: doc.id,
        ...data,
        fecha: fechaFormateada
      }
    })

    if (reseñasFiltradas.value.length === 0) {
      alert(`No se encontraron reseñas del docente "${nombre}"`)
    }
  } catch (error) {
    console.error('Error buscando reseñas:', error)
    alert('Hubo un problema al buscar las reseñas')
  }
}
</script>

<style scoped>
ion-button {
  margin-top: 10px;
}
</style>
