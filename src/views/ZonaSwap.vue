<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title><ion-icon :icon="arrowBackOutline" id="volver"></ion-icon>Visualizacion Gestor del Conocimiento</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content id="zonaswap">

      <!-- Creacion del formulario para aplicar filtros -->
      <ion-list>

        <div id="archivos">
          <ion-text class="texto">
            Archivos
          </ion-text>
            <ion-icon :icon="folderOpenOutline" class="icon"></ion-icon>
        </div>
        <div id="calificaciones">
          <ion-text>
            Calificaciones
          </ion-text>
          <ion-icon :icon="checkmarkDoneOutline" class="icon2"></ion-icon>
          
        </div>
        <div id="profes">
          <ion-text>
            Profes
          </ion-text>
          <ion-icon :icon="languageOutline" class="icon"></ion-icon>
          
        </div>

          <!-- opciones a escoger -->

          

          <!-- opciones a escoger

          <ion-item>
            <ion-button>Buscar</ion-button>
          </ion-item>
           -->
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {IonPage, IonTitle, IonHeader, IonToolbar, IonContent, IonList, IonItem, IonButton, IonText, IonIcon} from '@ionic/vue';
import { folderOpenOutline } from 'ionicons/icons'
import { arrowBackOutline, checkmarkDoneOutline, languageOutline } from 'ionicons/icons'


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
  /*Texto y espacio central*/
  text-align: center;
  font-size: 30px;
  padding-top: 40px;
  padding-bottom: 10px;
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
  /*Texto y espacio central*/
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
  /*Texto y espacio central*/
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
