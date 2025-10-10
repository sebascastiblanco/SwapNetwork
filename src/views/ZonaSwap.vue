<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Visualizacion Gestor del Conocimiento</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content id="#zonaswap">

      <!-- Creacion del formulario para aplicar filtros -->
      <ion-list>

        <div id="archivos">
          <ion-text class="texto">
            Archivos
          </ion-text>
            <ion-icon :icon="briefcaseOutline" class="icon"></ion-icon>
        </div>
        <div id="calificaciones">
          <ion-text>
            Calificaciones
          </ion-text>
        </div>
        <div id="profes">
          <ion-text>
            Profes
          </ion-text>
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
import { briefcaseOutline } from 'ionicons/icons'

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
}

@media (min-width: 1200px) and (max-width: 1599px) {
  #archivos {
    width: 45%;
  }
  #profes {
    width: 45%;
  }
}

</style>
