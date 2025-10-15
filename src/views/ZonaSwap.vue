<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          <ion-icon :icon="arrowBackOutline" id="volver"></ion-icon>
          Visualización Gestor del Conocimiento
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content id="zonaswap">
      <ion-list>

        <!-- Cuadro de Archivos -->
        <div id="archivos" @click="irAArchivos">
          <ion-text class="texto">Archivos</ion-text>
          <ion-icon :icon="folderOpenOutline" class="icon"></ion-icon>
        </div>

        <!-- Cuadro de Calificaciones -->
        <div id="calificaciones">
          <ion-text>Calificaciones</ion-text>
          <ion-icon :icon="checkmarkDoneOutline" class="icon2"></ion-icon>
        </div>

        <!-- Cuadro de Profes -->
        <div id="profes">
          <ion-text>Profes</ion-text>
          <ion-icon :icon="languageOutline" class="icon"></ion-icon>
        </div>

      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonTitle, IonHeader, IonToolbar, IonContent, IonList, IonText, IonIcon } from '@ionic/vue'
import { folderOpenOutline, arrowBackOutline, checkmarkDoneOutline, languageOutline } from 'ionicons/icons'
import { useRouter } from 'vue-router'

// Se importa el router para manejar la navegación
const router = useRouter()

// Función para redirigir al usuario a la página de Archivos
function irAArchivos() {
  router.push('/archivos')
}
</script>

<style>
#zonaswap {
  --background: #E3F2FD;
  height: 100%;
  width: auto;
}

#archivos {
  display: inline-block;
  background: #2196F3;
  height: 360px;
  width: 47%;
  margin: 50px;
  margin-bottom: 0;
  border-radius: 40px;
  text-align: center;
  font-size: 30px;
  padding-top: 40px;
  padding-bottom: 10px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

#archivos:hover {
  transform: scale(1.05);
}

#volver {
  display: inline-block;
  font-size: 20px;
  color: black;
  padding-right: 20px;
}

.icon {
  display: block;
  font-size: 200px;
  color: #ffffff;
  margin: 20px;
  padding-left: 36%;
}

#profes {
  display: inline-block;
  background: #26A69A;
  height: 360px;
  width: 47%;
  margin: 50px;
  border-radius: 40px;
  text-align: center;
  font-size: 30px;
  padding-top: 40px;
}

#calificaciones {
  float: right;
  background: #66BB6A;
  height: 770px;
  width: 42%;
  margin: 50px;
  border-radius: 40px;
  text-align: center;
  font-size: 30px;
  padding-top: 40px;
}

.icon2 {
  display: block;
  font-size: 200px;
  color: white;
  margin: 20px;
  padding-top: 20%;
  padding-left: 35%;
}

@media (min-width: 500px) {
  #archivos {
    display: inline-block;
    width: 40%;
  }

  #profes {
    display: inline-block;
    width: 40%;
  }

  .icon {
    padding-left: 30%;
  }

  .icon2 {
    padding-top: 35%;
  }
}
</style>
