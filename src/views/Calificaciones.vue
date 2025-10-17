<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
            <ion-button fill="clear" @click="IrAZonaswap"><ion-icon :icon="arrowBackOutline" id="volver"></ion-icon></ion-button>
            Calificaciones y reseñas
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-list>

        <ion-item>
            <ion-button @click="abrirCalificacion">Crear calificacion</ion-button>
        </ion-item>

        <!-- ventana emergente creacion de calificacion-->
         <ion-modal :is-open="mostrar" @didDismiss="cerrar">
            <ion-header>
                <ion-toolbar>
                    <ion-title>Nueva Calificacion</ion-title>
                    <ion-buttons slot="end">
                        <ion-button @click="cerrar"></ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>

            <ion-content>
                <ion-item>
                    <ion-label position="floating">Comentario</ion-label>
                    <ion-textarea v-model="comentario"></ion-textarea>
                </ion-item>

                <ion-item>
                    <ion-label position="floating">Docente</ion-label>
                    <ion-input v-model="docente"></ion-input>
                </ion-item>

                <!-- Lista de reseñas -->
                <ion-list v-if="reseñas.length > 0">
                    <ion-item v-for="(r, i) in reseñas" :key="i">
                        <ion-label>
                            <h2>{{ r.comentario }}</h2>
                            <p>{{ r.docente }}</p>
                            <small>Publicado el {{ r.fecha }}</small>
                        </ion-label>
                    </ion-item> 
                </ion-list>

                <ion-item>
                    <ion-label position="floating">Valoracion</ion-label>
                    <ion-input v-model="valoracion"></ion-input>
                </ion-item>

                <ion-button @click="guardar">Publicar</ion-button>
            </ion-content>
         </ion-modal>
            
        <ion-item>
            <ion-label>Busqueda por nombre maestro</ion-label>
            <ion-input v-model="busqueda" placeholder="Ejemplo: Sebastian..."/>
            <ion-button @click="buscar">Buscar</ion-button>
        </ion-item>

        <ion-list v-if= "reseñasFiltradas.length > 0">
            <ion-item v-for="(r, i) in reseñasFiltradas" :key="i">
                <ion-label>
                    <h2>{{  r.comentario }}</h2>
                    <p>{{ r.docente }}</p>
                    <p>{{ r.valoracion }}</p>
                    <small>Publicado el {{ r.fecha_comentario }}</small>
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
  IonTextarea
} from '@ionic/vue'
import { useRouter } from 'vue-router';
import { ref } from 'vue'
import { arrowBackOutline } from 'ionicons/icons'
import { calificacion } from '../router/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore'
import { basedatos } from '../router/firebaseConfig';

//Movimiento entre ventanas

 function IrAZonaswap() {
    router.push('/zonaswap')
 }

//variables movimiento entre rutas y base de datos
 const comentario = ref('')
 const docente = ref('')
 const reseñas = ref([])
 const valoracion = ref ("")
 const mostrar = ref(false)
 const router = useRouter();


 const abrirCalificacion = () => (mostrar.value = true)
 const cerrar = () => (mostrar.value = false)


 //fucion para guardar reseña en la base de datos
 const guardar = async () => {
    await calificacion(comentario.value, docente.value, valoracion.value)

    const fechaFormateada = new Date().toLocaleDateString('es-CO',{
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    reseñas.value.push({
        comentario: comentario.value,
        docente: docente.value,
        valoracion: valoracion.value,
        fecha: fechaFormateada
    });

    comentario.value = ''
    docente.value = ''
    valoracion.value = ''
    cerrar()

    reseñasFiltradas.value = reseñas.value
 }

 //Buscar por Nombre
const busqueda = ref('')
const reseñasFiltradas = ref([])

const buscar = async () => {
    const docente = busqueda.value.trim()

    if (!docente) {
        reseñasFiltradas.value = []
        alert('Por favor escribe el nombre del docente')
        return
    }

    try {
        const reseñasRef = collection(basedatos, 'calificaciones')
        const q = query(reseñasRef, where('docente', '==', docente))
        const querySnapshot = await getDocs(q)

        reseñasFiltradas.value = querySnapshot.docs.map(doc => {
            const data = doc.data(); // Definir la variable 'data' fuera del retorno

            const fechaFormateada = data.fecha ? data.fecha.toDate().toLocaleDateString('es-CO', {
                year: 'numeric',
                month: 'long',
                day: 'numeric' // Corregí un pequeño error tipográfico: 'numeirc' a 'numeric'
            }) : '';

            return {
                id: doc.id,
                ...doc.data(),
                fecha: fechaFormateada
            }

        })

        if (reseñasFiltradas.value.length === 0) {
            alert(`No se encontraron reseñas del docente "${docente}`)
        }

    } catch (error) {
        console.error('Error buscando reseñas:', error)
        alert('Hubo un problema al buscar las reseñas')
    }
}

</script>

<style scoped>
/* Estilos opcionales */
</style>