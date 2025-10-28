<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="custom-toolbar">
        <ion-title>
          <ion-buttons>
          <ion-button class="regresar" fill="clear" @click="volver"><ion-icon :icon="arrowBackOutline" id="volver"></ion-icon></ion-button>
            ZonaSwap
          </ion-buttons>
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content id="zonaswap" :fullscreen="true">
      <ion-list id="contenido_zonaswap">

        <!-- Cuadro de Archivos -->
        <div id="archivos" @click="irAArchivos">
          <ion-text class="texto">Archivos</ion-text>
          <ion-icon :icon="folderOpenOutline" class="icon"></ion-icon>
        </div>

        <!-- Cuadro de Calificaciones -->
        <div id="calificaciones" @click="irACalificaciones">
          <ion-text class="texto">Calificaciones</ion-text>
          <ion-icon :icon="ribbonOutline" class="icon"></ion-icon>
        </div>

        <!-- Cuadro de Profes -->
        <div id="profes"  @click="irAProfes">
          <ion-text class="texto">Profes</ion-text>
          <ion-icon :icon="schoolOutline" class="icon"></ion-icon>
        </div>

      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonTitle, IonHeader, IonToolbar, IonContent, IonList, IonText, IonIcon, IonButton, IonButtons } from '@ionic/vue'
import { folderOpenOutline, arrowBackOutline, ribbonOutline, schoolOutline } from 'ionicons/icons'
import { useRouter } from 'vue-router'

// Se importa el router para manejar la navegación
const router = useRouter()

// Función para redirigir al usuario a las secciones
function irAArchivos() {
  router.push('/archivos')
}

function volver() {
  router.push('/menuprincipal')
}

function irAProfes() {
  router.push('/profes')
}

function irACalificaciones() {
  router.push('/calificaciones')
}

//
</script>

<style>

.custom-toolbar {
  --background: #1a7431;
  --color: white;
}

#zonaswap {
  --background: #E3F2FD;
  width: 100%;
  height: 100%;
  padding: 2rem;
  box-sizing: border-box;
}

#contenido_zonaswap {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;            
  flex-wrap: nowrap;    
  width: 100%;
  height: 100%;
}

#archivos,
#profes,
#calificaciones {
  flex: 0 0 25%;
  height: 500px;
  border-radius: 30px;
  color: white;
  text-align: center;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center; 
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

#archivos {
  background: linear-gradient(135deg, #00C853, #64DD17);
}

#calificaciones {
  background: linear-gradient(135deg, #1DE9B6, #00BFA5);
}

#profes {
  background: linear-gradient(135deg, #76FF03, #32CB00);
}

#archivos:hover,
#profes:hover,
#calificaciones:hover {
  transform: scale(1.05);
}

.texto {
  font-weight: 600;
  font-size: 28px;
  margin: 0;
  text-align: center;
}

.icon,
.icon2 {
  font-size: 140px;
  color: white;
  margin-top: 15px; 
  padding: 0;       
}

@media (max-width: 900px) {
  ion-list {
    flex-direction: column;
    align-items: center;
  }

  #archivos,
  #profes,
  #calificaciones {
    width: 90%;
    height: 300px;
  }

  .icon,
  .icon2 {
    font-size: 100px;
  }
}

</style>