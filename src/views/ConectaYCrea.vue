<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="custom-toolbar">
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>Conecta y Crea</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding custom-content">
      <!-- Sección de introducción -->
      <div class="intro-section">
        <h2>Conéctate y Colabora</h2>
        <p>Forma grupos de estudio o tutorías con personas que comparten tus intereses académicos.</p>
      </div>

      <!-- Selector de tipo de actividad -->
      <div class="activity-selector">
        <h3>¿Qué deseas crear?</h3>
        <div class="selector-buttons">
          <ion-segment value="tutoring" @ionChange="onActivityTypeChange($event)">
            <ion-segment-button value="tutoring">
              <ion-icon :icon="school"></ion-icon>
              <ion-label>Tutoría</ion-label>
            </ion-segment-button>
            <ion-segment-button value="studyGroup">
              <ion-icon :icon="people"></ion-icon>
              <ion-label>Grupo de Estudio</ion-label>
            </ion-segment-button>
          </ion-segment>
        </div>
      </div>

      <!-- Formulario de creación -->
      <div class="creation-form" v-if="showForm">
        <ion-card>
          <ion-card-header>
            <ion-card-title>
              {{ activityType === 'tutoring' ? 'Crear Nueva Tutoría' : 'Crear Grupo de Estudio' }}
            </ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <!-- Selección de materia -->
            <ion-item class="form-item">
              <ion-label position="stacked">Materia</ion-label>
              <ion-select 
                placeholder="Selecciona una materia" 
                v-model="selectedSubject"
                interface="action-sheet"
              >
                <ion-select-option value="matematicas">Matemáticas</ion-select-option>
                <ion-select-option value="fisica">Física</ion-select-option>
                <ion-select-option value="quimica">Química</ion-select-option>
                <ion-select-option value="biologia">Biología</ion-select-option>
                <ion-select-option value="historia">Historia</ion-select-option>
                <ion-select-option value="literatura">Literatura</ion-select-option>
                <ion-select-option value="ingles">Inglés</ion-select-option>
                <ion-select-option value="programacion">Programación</ion-select-option>
              </ion-select>
            </ion-item>

            <!-- Selección de profesor (solo para tutorías) -->
            <ion-item class="form-item" v-if="activityType === 'tutoring'">
              <ion-label position="stacked">Profesor</ion-label>
              <ion-select 
                placeholder="Selecciona un profesor" 
                v-model="selectedTeacher"
                interface="action-sheet"
              >
                <ion-select-option value="profesor1">Prof. García</ion-select-option>
                <ion-select-option value="profesor2">Prof. Martínez</ion-select-option>
                <ion-select-option value="profesor3">Prof. Rodríguez</ion-select-option>
                <ion-select-option value="profesor4">Prof. López</ion-select-option>
              </ion-select>
            </ion-item>

            <!-- Selección de grupo (solo para grupos de estudio) -->
            <ion-item class="form-item" v-if="activityType === 'studyGroup'">
              <ion-label position="stacked">Grupo</ion-label>
              <ion-select 
                placeholder="Selecciona un grupo" 
                v-model="selectedGroup"
                interface="action-sheet"
              >
                <ion-select-option value="grupo1">Grupo A - Matemáticas Avanzadas</ion-select-option>
                <ion-select-option value="grupo2">Grupo B - Física Cuántica</ion-select-option>
                <ion-select-option value="grupo3">Grupo C - Programación Web</ion-select-option>
                <ion-select-option value="grupo4">Grupo D - Literatura Clásica</ion-select-option>
              </ion-select>
            </ion-item>

            <!-- Descripción -->
            <ion-item class="form-item">
              <ion-label position="stacked">Descripción</ion-label>
              <ion-textarea 
                v-model="description" 
                placeholder="Describe el objetivo de esta actividad..."
                rows="3"
                auto-grow
              ></ion-textarea>
            </ion-item>

            <!-- Botón para abrir calendario -->
            <div class="calendar-button-container">
              <ion-button 
                expand="block" 
                class="calendar-button"
                @click="openCalendarModal"
                :disabled="!selectedSubject"
              >
                <ion-icon :icon="calendar" slot="start"></ion-icon>
                {{ selectedDate ? 'Modificar Fecha/Hora' : 'Seleccionar Fecha y Hora' }}
              </ion-button>
              
              <!-- Fecha seleccionada (si existe) -->
              <div class="selected-date" v-if="selectedDate">
                <p><strong>Fecha seleccionada:</strong></p>
                <p>{{ formatDate(selectedDate) }}</p>
              </div>
            </div>

            <!-- Botón de crear evento -->
            <ion-button 
              expand="block" 
              class="create-button"
              :disabled="!isFormValid"
              @click="createEvent"
            >
              <ion-icon :icon="addCircle" slot="start"></ion-icon>
              Crear Evento
            </ion-button>
          </ion-card-content>
        </ion-card>
      </div>

      <!-- Modal de calendario -->
      <ion-modal 
        :is-open="calendarModalOpen" 
        @didDismiss="calendarModalOpen = false"
        class="calendar-modal"
      >
        <div class="calendar-modal-content">
          <ion-toolbar>
            <ion-title>Selecciona Fecha y Hora</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="calendarModalOpen = false">Cerrar</ion-button>
            </ion-buttons>
          </ion-toolbar>

          <div class="calendar-container">
            <!-- Selector de fecha -->
            <div class="date-picker">
              <h4>Selecciona una fecha:</h4>
              <ion-datetime 
                presentation="date" 
                v-model="tempDate"
                :min="minDate"
                :max="maxDate"
                class="custom-datetime"
              ></ion-datetime>
            </div>

            <!-- Selector de hora -->
            <div class="time-picker" v-if="tempDate">
              <h4>Selecciona una hora:</h4>
              <ion-datetime 
                presentation="time" 
                v-model="tempTime"
                class="custom-datetime"
              ></ion-datetime>
            </div>

            <!-- Botón para confirmar selección -->
            <div class="modal-actions" v-if="tempDate && tempTime">
              <ion-button expand="block" @click="confirmDateTime">
                Confirmar Fecha y Hora
              </ion-button>
            </div>
          </div>
        </div>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, computed } from 'vue';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonButton,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonModal,
  IonDatetime,
  toastController
} from '@ionic/vue';
import { 
  school, 
  people, 
  calendar, 
  addCircle 
} from 'ionicons/icons';

// Variables reactivas
const activityType = ref('tutoring');
const showForm = ref(true);
const selectedSubject = ref('');
const selectedTeacher = ref('');
const selectedGroup = ref('');
const description = ref('');
const selectedDate = ref('');
const calendarModalOpen = ref(false);
const tempDate = ref('');
const tempTime = ref('');

// Fechas mínima y máxima para el calendario
const today = new Date();
const minDate = today.toISOString();
const maxDate = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate()).toISOString();

// Computed properties
const isFormValid = computed(() => {
  return selectedSubject.value && selectedDate.value;
});

// Métodos
const onActivityTypeChange = (ev) => {
  activityType.value = ev.detail.value;
  // Resetear formulario al cambiar tipo
  selectedSubject.value = '';
  selectedTeacher.value = '';
  selectedGroup.value = '';
  description.value = '';
  selectedDate.value = '';
};

const openCalendarModal = () => {
  // Si ya hay una fecha seleccionada, pre-cargar en el modal
  if (selectedDate.value) {
    const dateObj = new Date(selectedDate.value);
    tempDate.value = dateObj.toISOString().split('T')[0];
    tempTime.value = dateObj.toTimeString().split(' ')[0];
  }
  calendarModalOpen.value = true;
};

const confirmDateTime = () => {
  if (tempDate.value && tempTime.value) {
    // Combinar fecha y hora
    const datePart = tempDate.value.split('T')[0];
    const timePart = tempTime.value.split('T')[1];
    selectedDate.value = `${datePart}T${timePart}`;
    calendarModalOpen.value = false;
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const createEvent = async () => {
  // Aquí iría la lógica para guardar el evento
  const toast = await toastController.create({
    message: `¡${activityType.value === 'tutoring' ? 'Tutoría' : 'Grupo de estudio'} creado exitosamente!`,
    duration: 2000,
    color: 'success',
    position: 'top'
  });
  await toast.present();

  // Resetear formulario después de crear
  selectedSubject.value = '';
  selectedTeacher.value = '';
  selectedGroup.value = '';
  description.value = '';
  selectedDate.value = '';
};
</script>

<style scoped>
/* Variables de colores */
:root {
  --primary-green: #2E7D32;
  --light-green: #4CAF50;
  --dark-green: #1B5E20;
  --accent-green: #388E3C;
  --white: #FFFFFF;
  --light-gray: #F8F9FA;
  --medium-gray: #E0E0E0;
  --dark-gray: #424242;
  --text-gray: #616161;
}

.custom-toolbar {
  --background: var(--primary-green);
  --color: var(--white);
}

.custom-content {
  --background: var(--light-gray);
}

/* Sección de introducción */
.intro-section {
  text-align: center;
  margin-bottom: 2rem;
  padding: 0 1rem;
}

.intro-section h2 {
  color: var(--primary-green);
  font-weight: 600;
  margin-bottom: 1rem;
}

.intro-section p {
  color: var(--text-gray);
  line-height: 1.6;
  font-size: 1rem;
}

/* Selector de actividad */
.activity-selector {
  margin-bottom: 2rem;
}

.activity-selector h3 {
  color: var(--dark-gray);
  margin-bottom: 1rem;
  text-align: center;
}

.selector-buttons {
  display: flex;
  justify-content: center;
}

/* Formulario de creación */
.creation-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-item {
  margin-bottom: 1.5rem;
  --background: var(--white);
  border-radius: 8px;
}

/* Botón de calendario */
.calendar-button-container {
  margin: 2rem 0;
}

.calendar-button {
  --background: var(--primary-green);
  --background-hover: var(--dark-green);
  --background-activated: var(--dark-green);
  margin-bottom: 1rem;
}

.selected-date {
  background: var(--medium-gray);
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
}

.selected-date p {
  margin: 0.25rem 0;
  color: var(--dark-gray);
}

/* Botón de crear */
.create-button {
  --background: var(--accent-green);
  --background-hover: var(--dark-green);
  --background-activated: var(--dark-green);
  margin-top: 1rem;
}

/* Modal de calendario */
.calendar-modal-content {
  background: var(--white);
  height: 100%;
}

.calendar-container {
  padding: 1rem;
}

.date-picker, .time-picker {
  margin-bottom: 2rem;
}

.date-picker h4, .time-picker h4 {
  color: var(--dark-gray);
  margin-bottom: 1rem;
  text-align: center;
}

.custom-datetime {
  --background: var(--white);
  --border-radius: 8px;
  margin: 0 auto;
}

.modal-actions {
  margin-top: 2rem;
  padding: 0 1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .creation-form {
    padding: 0 0.5rem;
  }
  
  .calendar-container {
    padding: 0.5rem;
  }
}

/* Estilos para elementos de Ionic */
ion-segment {
  --background: var(--white);
}

ion-segment-button {
  --color: var(--text-gray);
  --color-checked: var(--primary-green);
  --indicator-color: var(--primary-green);
}

ion-card {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

ion-item {
  --border-radius: 8px;
}
</style>