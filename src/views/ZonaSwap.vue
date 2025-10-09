<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Visualizacion Gestor del Conocimiento</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>

      <!-- Creacion del formulario para aplicar filtros -->
      <ion-list>

          <ion-label>Asignatura - CAI - CADI</ion-label>

          <!-- opciones a escoger -->

          <ion-item>
            <ion-select id="asignatura" v-model="asignatura" interface="popover">
              <ion-select-option class="seleccion" value="programacion1"> Programación 1 </ion-select-option>
              <ion-select-option class="seleccion" value="programacion2"> Programación 2 </ion-select-option>
              <ion-select-option class="seleccion" value="programacio3n"> Programación Web </ion-select-option>
              <ion-select-option class="seleccion" value="matematicas1"> Matematicas Discretas </ion-select-option>
              <ion-select-option class="seleccion" value="matematicas2"> Fundamentos de Electronica </ion-select-option>
            </ion-select>
          </ion-item>
          
          <ion-label>Gestor del conocimiento</ion-label>

          <!-- opciones a escoger -->

          <ion-item>
            <ion-select id="profesor" v-model="maestro" interface="popover">
              <ion-select-option class="seleccion" value="1">Fernando Sotelo</ion-select-option>
              <ion-select-option class="seleccion" value="2">Evelyn Rodriguez</ion-select-option>
              <ion-select-option class="seleccion" value="3">William Galvis</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item>
            <ion-button>Buscar</ion-button>
          </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {IonPage, IonTitle, IonHeader, IonToolbar, IonContent, IonList, IonItem, IonSelect, IonLabel, IonSelectOption, IonButton} from '@ionic/vue';

</script>

<style>

</style>
