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

            <!-- NUEVO: Botón con icono "+" para calendario -->
            <div class="calendar-section">
              <h4 class="section-title">Seleccionar Fecha y Hora</h4>
              
              <!-- Botón flotante con "+" -->
              <div class="floating-calendar-button" @click="openCalendarModal">
                <div class="plus-button">
                  <ion-icon :icon="add"></ion-icon>
                </div>
                <span class="button-text">Agregar fecha</span>
              </div>

              <!-- Fecha seleccionada (si existe) -->
              <div class="selected-date-card" v-if="selectedDate">
                <div class="date-header">
                  <ion-icon :icon="calendar" class="date-icon"></ion-icon>
                  <span>Fecha seleccionada:</span>
                </div>
                <p class="date-display">{{ formatDate(selectedDate) }}</p>
                <ion-button 
                  fill="clear" 
                  size="small" 
                  @click="openCalendarModal"
                  class="edit-button"
                >
                  <ion-icon :icon="create" slot="start"></ion-icon>
                  Editar
                </ion-button>
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

      <!-- Modal de calendario MEJORADO -->
      <ion-modal 
        :is-open="calendarModalOpen" 
        @didDismiss="calendarModalOpen = false"
        class="calendar-modal"
        :initial-breakpoint="0.8"
        :breakpoints="[0, 0.8, 1]"
      >
        <div class="calendar-modal-content">
          <ion-toolbar class="modal-toolbar">
            <ion-title>Selecciona Fecha y Hora</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="calendarModalOpen = false" fill="clear">
                <ion-icon :icon="close"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>

          <div class="calendar-container">
            <!-- Selector de fecha MEJORADO -->
            <div class="date-picker-section">
              <h4 class="picker-title">📅 Selecciona una fecha</h4>
              <ion-datetime 
                presentation="date" 
                v-model="tempDate"
                :min="minDate"
                :max="maxDate"
                class="green-datetime"
                color="success"
              >
                <span slot="title">Selecciona la fecha</span>
              </ion-datetime>
            </div>

            <!-- Selector de hora MEJORADO -->
            <div class="time-picker-section" v-if="tempDate">
              <h4 class="picker-title">⏰ Selecciona una hora</h4>
              <ion-datetime 
                presentation="time" 
                v-model="tempTime"
                class="green-datetime"
                color="success"
              >
                <span slot="title">Selecciona la hora</span>
              </ion-datetime>
            </div>

            <!-- Botón para confirmar selección -->
            <div class="modal-actions" v-if="tempDate && tempTime">
              <ion-button 
                expand="block" 
                @click="confirmDateTime"
                class="confirm-button"
                strong="true"
              >
                <ion-icon :icon="checkmark" slot="start"></ion-icon>
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
  addCircle,
  add,
  create,
  close,
  checkmark
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
  } else {
    // Si no hay fecha seleccionada, establecer valores por defecto
    tempDate.value = today.toISOString();
    tempTime.value = '14:00';
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
    
    // Mostrar confirmación
    showDateSelectedToast();
  }
};

const showDateSelectedToast = async () => {
  const toast = await toastController.create({
    message: 'Fecha y hora seleccionadas correctamente',
    duration: 2000,
    color: 'success',
    position: 'top'
  });
  await toast.present();
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

/* NUEVO: Sección de calendario */
.calendar-section {
  margin: 2rem 0;
}

.section-title {
  color: var(--dark-gray);
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 600;
}

/* Botón flotante con "+" */
.floating-calendar-button {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: var(--white);
  border: 2px dashed var(--medium-gray);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1rem;
}

.floating-calendar-button:hover {
  border-color: var(--primary-green);
  background: var(--light-gray);
}

.plus-button {
  width: 40px;
  height: 40px;
  background: var(--primary-green);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  transition: all 0.3s ease;
}

.plus-button ion-icon {
  color: var(--white);
  font-size: 1.5rem;
}

.button-text {
  color: var(--text-gray);
  font-weight: 500;
}

/* Tarjeta de fecha seleccionada */
.selected-date-card {
  background: var(--white);
  border: 1px solid var(--medium-gray);
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 1rem;
}

.date-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.date-icon {
  color: var(--primary-green);
  margin-right: 0.5rem;
  font-size: 1.2rem;
}

.date-header span {
  color: var(--dark-gray);
  font-weight: 600;
}

.date-display {
  color: var(--text-gray);
  margin: 0.5rem 0;
  font-size: 1rem;
  line-height: 1.4;
}

.edit-button {
  --color: var(--primary-green);
  margin-top: 0.5rem;
}

/* Botón de crear */
.create-button {
  --background: var(--accent-green);
  --background-hover: var(--dark-green);
  --background-activated: var(--dark-green);
  margin-top: 1rem;
}

/* Modal de calendario MEJORADO */
.calendar-modal-content {
  background: var(--white);
  border-radius: 16px 16px 0 0;
}

.modal-toolbar {
  --background: var(--primary-green);
  --color: var(--white);
  border-bottom: 1px solid var(--medium-gray);
}

.calendar-container {
  padding: 1rem;
}

.date-picker-section, .time-picker-section {
  margin-bottom: 2rem;
}

.picker-title {
  color: var(--dark-gray);
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 600;
}

/* Calendario verde personalizado */
.green-datetime {
  --background: var(--white);
  --border-radius: 12px;
  --wheel-highlight-background: var(--light-green);
  --wheel-fade-background-rgb: 76, 175, 80, 0.1;
}

/* Asegurar que el calendario use colores verdes */
::v-deep .datetime-ready .datetime-color-success {
  color: var(--primary-green) !important;
}

::v-deep .datetime-ready ion-datetime {
  color: var(--primary-green) !important;
}

::v-deep .datetime-ready .datetime-highlight {
  background: var(--light-green) !important;
}

::v-deep .datetime-ready .datetime-active {
  color: var(--white) !important;
  background: var(--primary-green) !important;
}

.modal-actions {
  margin-top: 2rem;
  padding: 0 1rem;
}

.confirm-button {
  --background: var(--primary-green);
  --background-hover: var(--dark-green);
  --background-activated: var(--dark-green);
}

/* Responsive */
@media (max-width: 768px) {
  .creation-form {
    padding: 0 0.5rem;
  }
  
  .calendar-container {
    padding: 0.5rem;
  }
  
  .floating-calendar-button {
    padding: 0.8rem;
  }
  
  .plus-button {
    width: 35px;
    height: 35px;
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