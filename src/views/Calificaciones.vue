<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="success">
        <ion-title>
          <ion-button fill="clear" @click="IrAZonaswap">
            <ion-icon :icon="arrowBackOutline" id="volver"></ion-icon>
          </ion-button>
          Calificaciones y reseñas
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content id="principal" :fullscreen="true">
      <ion-list>

        <ion-item>
          <ion-button id="crear" @click="abrirCalificacion">Crear calificación</ion-button>
        </ion-item>

        <!-- Modal para crear calificación -->
        <ion-modal id="ventana" :is-open="mostrar" @didDismiss="cerrar">
          <ion-header>
            <ion-toolbar style="--background: #3AE065">
              <ion-title style="text-align: center;" >Nueva Calificación</ion-title>
              <ion-buttons slot="end">
                <ion-button id="cerrar" @click="cerrar">
                    <ion-icon :icon="closeCircleOutline"></ion-icon>
                </ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>

          <ion-content>
            <ion-item>
              <ion-label class="subtitulo" position="floating">Comentario</ion-label><br>
              <ion-textarea v-model="comentario" placeholder="Ej: Bueno, Malo, etc."></ion-textarea>
            </ion-item>

            <!-- Selector de docente -->
            
            <ion-item>
                    <ion-label class="subtitulo" position="floating">Docente</ion-label><br><br>
                <ion-select v-model="docente" interface="popover" placeholder="Selecciona un docente">
                    <ion-select-option v-for="(nombre, index) in docentesFijos" :key="index" :value="nombre">
                    {{ nombre }}
                    </ion-select-option>
                    <ion-select-option value="otro">Otro (escribir manualmente)</ion-select-option>
                </ion-select>
            </ion-item>

            <!-- Campo adicional si elige “otro” -->
            <ion-item v-if="docente === 'otro'">
              <ion-label class="subtitulo" position="floating">Nombre del nuevo docente</ion-label><br>
              <ion-input v-model="docentePersonalizado" placeholder="Ej: Felipe Zambrano"></ion-input>
            </ion-item>

            <!-- Apartado de materia -->
            <ion-item>
              <ion-label class="subtitulo" position="floating">Materia</ion-label><br>
              <ion-input v-model="materia" placeholder="Ej: Emprendimiento V"></ion-input>
            </ion-item>

            <!-- Apartado de valoracion -->
            <ion-item>
              <ion-label class="subtitulo" position="floating">Valoración</ion-label><br>
              <ion-input v-model="valoracion" placeholder="Ej: 1.0, 2.0, 3.0, 4.0, 5.0"></ion-input>
            </ion-item>

            <!-- Boton de registrar -->
            <ion-button id="publicar" @click="guardar">Publicar</ion-button>
          </ion-content>
        </ion-modal>

        <!-- Busqueda por nombre -->
        <div id="buscar">
          <ion-label>Buscar por nombre del maestro</ion-label><br>
          <ion-input id="texto" v-model="busqueda" placeholder="Ej: Sebastián..." />
          <ion-button id="boton_buscar" @click="buscar">Buscar</ion-button>
        </div>

        <!-- Lista de reseñas -->
        <ion-list v-if="reseñasFiltradas.length > 0" id="resena">
            <ion-item v-for="(r, i) in reseñasFiltradas" :key="i" class="tarjeta">
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
import { arrowBackOutline, closeCircleOutline } from 'ionicons/icons'
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
  'Alexander Mendoza',
  'Arley Rodríguez',
  'Dilia Molina',
  'Ebelín Rodríguez',
  'Edgar Bustos',
  'Edilberto Ramírez',
  'Jorge Jurado',
  'José Pinto',
  'José Sotelo',
  'Martín Encizo',
  'Ricardo Sanabria',
  'Rittner Castro',
  'Robinson Arias',
  'Rubén Rodríguez',
  'William Galvis '
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

ion-title {
    display: flex;
    gap: 10px;
}

ion-button {
  margin-top: 1%;
}

#cerrar {
    color: rgb(0, 0, 0);
    font-size: 20px;
}

#cerrar:hover {
  transform: scale(1.05);
}

#principal {
    display: flex;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    height: 100dhv;
}

#crear {
    display: inline-block;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    --background: green;
    color: black;
    justify-content: center;
    align-items: center;
    margin-left: 38%;
    margin-top: 4%;
    margin-bottom: 2%;;
    width: 25%;
    height: 40%;
    border-radius: 15px;
    overflow: hidden;
}

#publicar {
    display: flex;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    justify-content: center;
    width: 40%;
    margin-left: 30%;
    --background: #3AE065; 
    color: black;
    margin-top: 2rem;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
}

#publicar:hover {
  transform: scale(1.05);
}

.subtitulo {
    display: flex;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    padding-top: 0.5rem;
    font-weight: bold;
}

#buscar {
    display: flex !important;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    align-items: center;
    text-align: center;
    gap: 10px;
    width: 70%;
    margin-left: 15%;
    font-weight: bold;
        margin-bottom: 3%;
}

#texto {
    font-weight: 100;
}

#boton_buscar {
    --background: #3AE065;
    color: black;
    font-weight: bold;
    border-radius: 10px;
    overflow: hidden;
    width: 10rem;
}

#resena {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  padding: 40px 20px;
  background: #f7fdf8;
  box-sizing: border-box;
}

.tarjeta {
  flex: 1 1 300px;
  max-width: 360px;
  background: #45e86b;
  --background: #45e86b;
  color: #0d0d0d;
  padding: 16px 18px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  border-left: 5px solid #1da24c;
  text-align: left;
  transition: transform 0.2s, box-shadow 0.2s;
}

.tarjeta:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.tarjeta h2 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #0a0a0a;
  margin-bottom: 8px;
}

.tarjeta p {
  font-size: 0.95rem;
  color: #222;
  margin: 4px 0;
}

.tarjeta small {
  font-size: 0.85rem;
  color: #444;
}



</style>
