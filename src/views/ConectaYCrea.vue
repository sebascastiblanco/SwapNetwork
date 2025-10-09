<template>
  <ion-page>
    <!-- Header con verde pastel visible -->
    <ion-header>
      <ion-toolbar class="custom-toolbar">
        <ion-buttons slot="start">
          <ion-back-button 
            default-href="/"
            class="back-button"
          ></ion-back-button>
        </ion-buttons>
        <ion-title class="toolbar-title">Conecta y Crea</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding custom-content">
      <!-- Sección de introducción -->
      <div class="intro-section">
        <div class="intro-icon">
          <ion-icon :icon="peopleCircle" class="icon-large"></ion-icon>
        </div>
        <h2 class="intro-title">Conéctate y Colabora</h2>
        <p class="intro-text">Forma grupos de estudio o tutorías con personas que comparten tus intereses académicos.</p>
      </div>

      <!-- Selector de tipo de actividad -->
      <div class="activity-selector">
        <h3 class="section-title">¿Qué deseas crear?</h3>
        <div class="selector-buttons">
          <ion-segment 
            value="tutoring" 
            @ionChange="onActivityTypeChange($event)"
            class="custom-segment"
          >
            <ion-segment-button value="tutoring" class="segment-button">
              <div class="segment-content">
                <ion-icon :icon="school" class="segment-icon"></ion-icon>
                <ion-label class="segment-label">Tutoría</ion-label>
              </div>
            </ion-segment-button>
            <ion-segment-button value="studyGroup" class="segment-button">
              <div class="segment-content">
                <ion-icon :icon="people" class="segment-icon"></ion-icon>
                <ion-label class="segment-label">Grupo de Estudio</ion-label>
              </div>
            </ion-segment-button>
          </ion-segment>
        </div>
      </div>

      <!-- Formulario de creación -->
      <div class="creation-form" v-if="showForm">
        <ion-card class="form-card">
          <ion-card-header class="card-header">
            <ion-card-title class="card-title">
              {{ activityType === 'tutoring' ? 'Crear Nueva Tutoría' : 'Crear Grupo de Estudio' }}
            </ion-card-title>
          </ion-card-header>

          <ion-card-content class="card-content">
            <!-- Selección de materia -->
            <ion-item class="form-item custom-item">
              <ion-label position="stacked" class="input-label">Materia *</ion-label>
              <ion-select 
                placeholder="Selecciona una materia" 
                v-model="selectedSubject"
                interface="action-sheet"
                class="custom-select"
                :class="{ 'has-value': selectedSubject }"
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
            <ion-item class="form-item custom-item" v-if="activityType === 'tutoring'">
              <ion-label position="stacked" class="input-label">Profesor</ion-label>
              <ion-select 
                placeholder="Selecciona un profesor" 
                v-model="selectedTeacher"
                interface="action-sheet"
                class="custom-select"
                :class="{ 'has-value': selectedTeacher }"
              >
                <ion-select-option value="profesor1">Prof. García</ion-select-option>
                <ion-select-option value="profesor2">Prof. Martínez</ion-select-option>
                <ion-select-option value="profesor3">Prof. Rodríguez</ion-select-option>
                <ion-select-option value="profesor4">Prof. López</ion-select-option>
              </ion-select>
            </ion-item>

            <!-- Selección de grupo (solo para grupos de estudio) -->
            <ion-item class="form-item custom-item" v-if="activityType === 'studyGroup'">
              <ion-label position="stacked" class="input-label">Grupo</ion-label>
              <ion-select 
                placeholder="Selecciona un grupo" 
                v-model="selectedGroup"
                interface="action-sheet"
                class="custom-select"
                :class="{ 'has-value': selectedGroup }"
              >
                <ion-select-option value="grupo1">Grupo A - Matemáticas Avanzadas</ion-select-option>
                <ion-select-option value="grupo2">Grupo B - Física Cuántica</ion-select-option>
                <ion-select-option value="grupo3">Grupo C - Programación Web</ion-select-option>
                <ion-select-option value="grupo4">Grupo D - Literatura Clásica</ion-select-option>
              </ion-select>
            </ion-item>

            <!-- Descripción -->
            <ion-item class="form-item custom-item">
              <ion-label position="stacked" class="input-label">Descripción</ion-label>
              <ion-textarea 
                v-model="description" 
                placeholder="Describe el objetivo de esta actividad..."
                rows="3"
                auto-grow
                class="custom-textarea"
                :class="{ 'has-value': description }"
              ></ion-textarea>
            </ion-item>

            <!-- Selector de fecha y hora MEJORADO -->
            <div class="datetime-selector">
              <h4 class="datetime-title">Fecha y Hora *</h4>
              
              <!-- Selector de fecha simple -->
              <div class="date-selector">
                <label class="selector-label">Selecciona el día:</label>
                <div class="date-buttons">
                  <button 
                    v-for="date in availableDates" 
                    :key="date.value"
                    @click="selectDate(date.value)"
                    :class="['date-button', { 'selected': selectedDate && selectedDate.split('T')[0] === date.value }]"
                  >
                    <span class="date-day">{{ date.day }}</span>
                    <span class="date-number">{{ date.number }}</span>
                    <span class="date-month">{{ date.month }}</span>
                  </button>
                </div>
              </div>

              <!-- Selector de hora simple -->
              <div class="time-selector" v-if="selectedDate">
                <label class="selector-label">Selecciona la hora:</label>
                <div class="time-buttons">
                  <button 
                    v-for="timeSlot in availableTimes" 
                    :key="timeSlot.value"
                    @click="selectTime(timeSlot.value)"
                    :class="['time-button', { 'selected': selectedTime === timeSlot.value }]"
                  >
                    {{ timeSlot.label }}
                  </button>
                </div>
              </div>

              <!-- Fecha seleccionada -->
              <div class="selected-datetime" v-if="selectedDate && selectedTime">
                <div class="datetime-display">
                  <ion-icon :icon="calendar" class="datetime-icon"></ion-icon>
                  <div class="datetime-text">
                    <p class="datetime-label">Tu evento será el:</p>
                    <p class="datetime-value">{{ formatSelectedDateTime() }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Botón de crear evento -->
            <ion-button 
              expand="block" 
              class="create-button"
              :disabled="!isFormValid"
              @click="createEvent"
            >
              <ion-icon :icon="addCircle" slot="start" class="button-icon"></ion-icon>
              Crear Evento
            </ion-button>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
// Importaciones de Vue y Ionic
import { ref, computed, onMounted } from 'vue';
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
  toastController
} from '@ionic/vue';

// Importación de iconos
import { 
  school, 
  people, 
  calendar, 
  addCircle,
  peopleCircle
} from 'ionicons/icons';

// =============================================
// VARIABLES REACTIVAS
// =============================================

// Tipo de actividad seleccionada (tutoría o grupo de estudio)
const activityType = ref('tutoring');

// Controla si se muestra el formulario
const showForm = ref(true);

// Valores del formulario
const selectedSubject = ref('');
const selectedTeacher = ref('');
const selectedGroup = ref('');
const description = ref('');
const selectedDate = ref(''); // Formato: YYYY-MM-DD
const selectedTime = ref(''); // Formato: HH:MM

// Fechas y horas disponibles
const availableDates = ref([]);
const availableTimes = ref([
  { label: '08:00 AM', value: '08:00' },
  { label: '09:00 AM', value: '09:00' },
  { label: '10:00 AM', value: '10:00' },
  { label: '11:00 AM', value: '11:00' },
  { label: '12:00 PM', value: '12:00' },
  { label: '01:00 PM', value: '13:00' },
  { label: '02:00 PM', value: '14:00' },
  { label: '03:00 PM', value: '15:00' },
  { label: '04:00 PM', value: '16:00' },
  { label: '05:00 PM', value: '17:00' }
]);

// =============================================
// COMPUTED PROPERTIES
// =============================================

// Valida si el formulario está completo para habilitar el botón de crear
const isFormValid = computed(() => {
  try {
    return selectedSubject.value && selectedDate.value && selectedTime.value;
  } catch (error) {
    console.error('Error validando formulario:', error);
    return false;
  }
});

// =============================================
// MÉTODOS DEL CICLO DE VIDA
// =============================================

onMounted(() => {
  initializeAvailableDates();
});

// =============================================
// MÉTODOS
// =============================================

/**
 * Inicializa las fechas disponibles para los próximos 15 días
 */
const initializeAvailableDates = () => {
  try {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 15; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      
      dates.push({
        value: date.toISOString().split('T')[0], // YYYY-MM-DD
        day: date.toLocaleDateString('es-ES', { weekday: 'short' }),
        number: date.getDate(),
        month: date.toLocaleDateString('es-ES', { month: 'short' })
      });
    }
    
    availableDates.value = dates;
  } catch (error) {
    console.error('Error inicializando fechas:', error);
    // Fecha de respaldo en caso de error
    availableDates.value = [
      { value: new Date().toISOString().split('T')[0], day: 'Hoy', number: new Date().getDate(), month: 'Actual' }
    ];
  }
};

/**
 * Maneja el cambio entre tutoría y grupo de estudio
 */
const onActivityTypeChange = (ev) => {
  try {
    activityType.value = ev.detail.value;
    
    // Limpia el formulario al cambiar de tipo de actividad
    selectedSubject.value = '';
    selectedTeacher.value = '';
    selectedGroup.value = '';
    description.value = '';
    selectedDate.value = '';
    selectedTime.value = '';
  } catch (error) {
    console.error('Error cambiando tipo de actividad:', error);
    showErrorToast('Error al cambiar el tipo de actividad');
  }
};

/**
 * Selecciona una fecha
 */
const selectDate = (date) => {
  try {
    selectedDate.value = date;
    selectedTime.value = ''; // Resetear hora al cambiar fecha
  } catch (error) {
    console.error('Error seleccionando fecha:', error);
    showErrorToast('Error al seleccionar la fecha');
  }
};

/**
 * Selecciona una hora
 */
const selectTime = (time) => {
  try {
    selectedTime.value = time;
  } catch (error) {
    console.error('Error seleccionando hora:', error);
    showErrorToast('Error al seleccionar la hora');
  }
};

/**
 * Formatea la fecha y hora seleccionada para mostrar
 */
const formatSelectedDateTime = () => {
  try {
    if (!selectedDate.value || !selectedTime.value) return '';
    
    const date = new Date(selectedDate.value + 'T' + selectedTime.value);
    return date.toLocaleString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    console.error('Error formateando fecha:', error);
    return 'Fecha no disponible';
  }
};

/**
 * Muestra un mensaje de error
 */
const showErrorToast = async (message) => {
  try {
    const toast = await toastController.create({
      message: message,
      duration: 3000,
      color: 'danger',
      position: 'top'
    });
    await toast.present();
  } catch (error) {
    console.error('Error mostrando toast:', error);
  }
};

/**
 * Crea el evento (tutoría o grupo de estudio)
 */
const createEvent = async () => {
  try {
    // Validación adicional por seguridad
    if (!selectedSubject.value || !selectedDate.value || !selectedTime.value) {
      await showErrorToast('Por favor completa todos los campos obligatorios');
      return;
    }

    // Combinar fecha y hora para Firebase
    const eventDateTime = `${selectedDate.value}T${selectedTime.value}:00`;
    
    // Aquí iría la conexión con Firebase
    console.log('Creando evento con datos:', {
      type: activityType.value,
      subject: selectedSubject.value,
      teacher: selectedTeacher.value,
      group: selectedGroup.value,
      description: description.value,
      datetime: eventDateTime
    });

    // Mostrar mensaje de éxito
    const toast = await toastController.create({
      message: `¡${activityType.value === 'tutoring' ? 'Tutoría' : 'Grupo de estudio'} creado exitosamente!`,
      duration: 2000,
      color: 'success',
      position: 'top'
    });
    
    await toast.present();

    // Limpiar el formulario después de crear
    resetForm();

  } catch (error) {
    console.error('Error creando evento:', error);
    await showErrorToast('Error al crear el evento. Intenta nuevamente.');
  }
};

/**
 * Reinicia el formulario a su estado inicial
 */
const resetForm = () => {
  try {
    selectedSubject.value = '';
    selectedTeacher.value = '';
    selectedGroup.value = '';
    description.value = '';
    selectedDate.value = '';
    selectedTime.value = '';
  } catch (error) {
    console.error('Error reiniciando formulario:', error);
  }
};
</script>

<style scoped>
/* =============================================
   VARIABLES DE COLORES VERDE PASTEL VISIBLES
   ============================================= */
:root {
  --primary-green: #A8E6CF;        /* Verde pastel principal - MUY VISIBLE */
  --light-green: #D4F1E6;          /* Verde pastel claro */
  --dark-green: #88D4AB;           /* Verde pastel oscuro */
  --accent-green: #97E8C7;         /* Verde pastel de acento */
  --background-light: #F0F9F5;     /* Fondo verde pastel muy claro */
  --white: #FFFFFF;
  --light-gray: #F5F5F5;
  --medium-gray: #E0E0E0;
  --dark-gray: #424242;
  --text-gray: #616161;
  --text-dark: #212121;
  --shadow-light: rgba(168, 230, 207, 0.3);
  --shadow-medium: rgba(168, 230, 207, 0.5);
  --success-green: #4CAF50;
}

/* =============================================
   ESTILOS GENERALES
   ============================================= */
.custom-toolbar {
  --background: var(--primary-green);
  --color: var(--text-dark);
  box-shadow: 0 2px 8px var(--shadow-medium);
}

.toolbar-title {
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--text-dark);
}

.back-button {
  --color: var(--text-dark);
}

.custom-content {
  --background: var(--background-light);
}

/* =============================================
   SECCIÓN DE INTRODUCCIÓN
   ============================================= */
.intro-section {
  text-align: center;
  margin-bottom: 2rem;
  padding: 1.5rem 1rem;
  background: var(--white);
  border-radius: 16px;
  box-shadow: 0 4px 12px var(--shadow-light);
  border: 2px solid var(--primary-green);
}

.intro-icon {
  margin-bottom: 1rem;
}

.icon-large {
  font-size: 3rem;
  color: var(--primary-green);
}

.intro-title {
  color: var(--dark-green);
  font-weight: 700;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.intro-text {
  color: var(--text-gray);
  line-height: 1.6;
  font-size: 1rem;
  margin: 0;
}

/* =============================================
   SELECTOR DE ACTIVIDAD
   ============================================= */
.activity-selector {
  margin-bottom: 2rem;
}

.section-title {
  color: var(--dark-gray);
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 600;
}

.selector-buttons {
  display: flex;
  justify-content: center;
}

.custom-segment {
  --background: var(--white);
  border-radius: 12px;
  padding: 4px;
  box-shadow: 0 2px 8px var(--shadow-light);
  border: 1px solid var(--primary-green);
}

.segment-button {
  --background: transparent;
  --background-checked: var(--primary-green);
  --color: var(--text-gray);
  --color-checked: var(--text-dark);
  --border-radius: 8px;
  --indicator-color: transparent;
  min-height: 48px;
}

.segment-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.segment-icon {
  font-size: 1.2rem;
}

.segment-label {
  font-size: 0.8rem;
  font-weight: 500;
}

/* =============================================
   FORMULARIO DE CREACIÓN
   ============================================= */
.creation-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-card {
  border-radius: 16px;
  box-shadow: 0 4px 16px var(--shadow-medium);
  overflow: hidden;
  border: 2px solid var(--primary-green);
}

.card-header {
  padding-bottom: 0;
  background: linear-gradient(135deg, var(--primary-green), var(--accent-green));
}

.card-title {
  color: var(--text-dark);
  font-weight: 700;
  font-size: 1.3rem;
  text-align: center;
}

.card-content {
  padding-top: 1rem;
}

.custom-item {
  --background: var(--white);
  border-radius: 12px;
  margin-bottom: 1.5rem;
  border: 1px solid var(--medium-gray);
  transition: all 0.3s ease;
}

.custom-item:focus-within {
  border-color: var(--primary-green);
  box-shadow: 0 0 0 2px var(--shadow-light);
}

.input-label {
  color: var(--dark-gray);
  font-weight: 600;
  margin-bottom: 8px;
}

.custom-select, .custom-textarea {
  --placeholder-color: var(--text-gray);
  --placeholder-opacity: 0.8;
}

.has-value {
  border-color: var(--primary-green);
  background-color: var(--light-green);
}

/* =============================================
   SELECTOR DE FECHA Y HORA MEJORADO
   ============================================= */
.datetime-selector {
  margin: 2rem 0;
  padding: 1rem;
  background: var(--white);
  border-radius: 12px;
  border: 1px solid var(--primary-green);
}

.datetime-title {
  color: var(--dark-green);
  margin-bottom: 1rem;
  font-weight: 600;
  text-align: center;
}

.selector-label {
  display: block;
  color: var(--dark-gray);
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

/* Selector de fecha */
.date-selector {
  margin-bottom: 1.5rem;
}

.date-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.date-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem 0.5rem;
  border: 2px solid var(--medium-gray);
  border-radius: 8px;
  background: var(--white);
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 60px;
}

.date-button:hover {
  border-color: var(--primary-green);
  transform: translateY(-2px);
}

.date-button.selected {
  background: var(--primary-green);
  border-color: var(--dark-green);
  color: var(--text-dark);
  font-weight: 600;
}

.date-day {
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
}

.date-number {
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0.1rem 0;
}

.date-month {
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
}

/* Selector de hora */
.time-selector {
  margin-bottom: 1.5rem;
}

.time-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.time-button {
  padding: 0.75rem 0.5rem;
  border: 2px solid var(--medium-gray);
  border-radius: 8px;
  background: var(--white);
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.time-button:hover {
  border-color: var(--primary-green);
  transform: translateY(-2px);
}

.time-button.selected {
  background: var(--primary-green);
  border-color: var(--dark-green);
  color: var(--text-dark);
  font-weight: 600;
}

/* Fecha seleccionada */
.selected-datetime {
  background: var(--light-green);
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid var(--primary-green);
}

.datetime-display {
  display: flex;
  align-items: center;
  gap: 12px;
}

.datetime-icon {
  font-size: 1.5rem;
  color: var(--dark-green);
}

.datetime-text {
  flex: 1;
}

.datetime-label {
  margin: 0 0 4px 0;
  color: var(--dark-green);
  font-weight: 500;
  font-size: 0.9rem;
}

.datetime-value {
  margin: 0;
  color: var(--text-dark);
  font-weight: 600;
  font-size: 1rem;
}

/* =============================================
   BOTÓN DE CREAR EVENTO
   ============================================= */
.create-button {
  --background: var(--primary-green);
  --background-hover: var(--dark-green);
  --background-activated: var(--dark-green);
  --border-radius: 12px;
  margin-top: 1rem;
  font-weight: 700;
  height: 50px;
  box-shadow: 0 4px 8px var(--shadow-medium);
  --color: var(--text-dark);
}

.create-button:disabled {
  --background: var(--medium-gray);
  --color: var(--text-gray);
}

/* =============================================
   ESTILOS RESPONSIVE
   ============================================= */
@media (max-width: 768px) {
  .creation-form {
    padding: 0 0.5rem;
  }
  
  .intro-section {
    padding: 1rem 0.5rem;
  }
  
  .card-title {
    font-size: 1.1rem;
  }
  
  .date-buttons {
    grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
  }
  
  .time-buttons {
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  }
}

@media (max-width: 480px) {
  .segment-content {
    flex-direction: row;
    gap: 8px;
  }
  
  .segment-label {
    font-size: 0.9rem;
  }
  
  .date-button {
    min-height: 50px;
    padding: 0.5rem 0.25rem;
  }
  
  .date-number {
    font-size: 1rem;
  }
}

/* =============================================
   ANIMACIONES Y TRANSICIONES
   ============================================= */
.form-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.form-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px var(--shadow-medium);
}

.date-button, .time-button {
  transition: all 0.3s ease;
}

.date-button:active, .time-button:active {
  transform: scale(0.95);
}

.create-button {
  transition: all 0.3s ease;
}

.create-button:active:not(:disabled) {
  transform: scale(0.98);
}

/* =============================================
   ESTADOS DE VALIDACIÓN
   ============================================= */
.input-label {
  position: relative;
}

.input-label::after {
  content: '*';
  color: #ff4444;
  margin-left: 2px;
  display: none;
}

.input-label[for*="required"]::after {
  display: inline;
}
</style>