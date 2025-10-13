<template>
  <!-- Página principal de Ionic -->
  <ion-page>
    <!-- Encabezado de la página -->
    <ion-header>
      <ion-toolbar class="custom-toolbar">
        <!-- Botón de regreso -->
        <ion-buttons slot="start">
          <ion-back-button default-href="/" class="custom-back-button"></ion-back-button>
        </ion-buttons>
        <!-- Título de la página -->
        <ion-title>Conecta y Crea</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- Contenido principal de la página -->
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
          <!-- Segmento para elegir entre tutoría o grupo de estudio -->
          <ion-segment value="tutoring" @ionChange="onActivityTypeChange($event)">
            <ion-segment-button value="tutoring">
              <ion-icon :icon="school" class="segment-icon"></ion-icon>
              <ion-label>Tutoría</ion-label>
            </ion-segment-button>
            <ion-segment-button value="studyGroup">
              <ion-icon :icon="people" class="segment-icon"></ion-icon>
              <ion-label>Grupo de Estudio</ion-label>
            </ion-segment-button>
          </ion-segment>
        </div>
      </div>

      <!-- CONTENIDO TUTORÍAS -->
      <div v-if="activityType === 'tutoring'" class="contenido-pestana" :class="{ 'fade-in': mostrarTutorias }">
        
        <!-- FORMULARIO TUTORÍA -->
        <ion-card class="main-form-card">
          <ion-card-header>
            <ion-card-title class="form-title">
              <ion-icon :icon="tutoriaEditando ? create : addCircle" color="success" />
              {{ tutoriaEditando ? 'Editar' : 'Registrar' }} Tutoría
            </ion-card-title>
          </ion-card-header>
          
          <ion-card-content>
            <form @submit.prevent="tutoriaEditando ? actualizarTutoria() : agregarTutoria()">
              <ion-item class="form-item custom-form-item">
                <ion-label position="stacked" class="form-label">
                  <ion-icon :icon="book" slot="start" />
                  Tema
                </ion-label>
                <ion-input 
                  v-model="tutoriaForm.tema" 
                  placeholder="Ej: Programación I" 
                  class="custom-input"
                />
              </ion-item>

              <ion-item class="form-item custom-form-item">
                <ion-label position="stacked" class="form-label">
                  <ion-icon :icon="person" slot="start" />
                  Tutor
                </ion-label>
                <ion-input 
                  v-model="tutoriaForm.tutor" 
                  placeholder="Ej: Ebelin Rodríguez" 
                  class="custom-input"
                />
              </ion-item>

              <!-- SELECTOR DE FECHA Y HORA SIMPLE (VERSIÓN ANTERIOR) -->
              <ion-item class="form-item custom-form-item">
                <ion-label position="stacked" class="form-label">
                  <ion-icon :icon="calendar" slot="start" />
                  Fecha y hora
                </ion-label>
                <input 
                  type="datetime-local" 
                  v-model="tutoriaForm.timespacep" 
                  class="input-datetime"
                />
              </ion-item>

              <div class="botones-form">
                <ion-button 
                  expand="block" 
                  type="submit"
                  class="create-button custom-create-button"
                  :disabled="!tutoriaForm.tema || !tutoriaForm.tutor"
                >
                  <ion-icon :icon="tutoriaEditando ? checkmark : addCircle" slot="start" />
                  {{ tutoriaEditando ? 'Actualizar' : 'Guardar' }} Tutoría
                </ion-button>
                
                <ion-button 
                  v-if="tutoriaEditando" 
                  expand="block" 
                  fill="outline" 
                  color="medium" 
                  @click="cancelarEdicionTutoria" 
                  class="ion-margin-top"
                >
                  <ion-icon :icon="close" slot="start" />
                  Cancelar
                </ion-button>
              </div>
            </form>
          </ion-card-content>
        </ion-card>

        <!-- LISTA DE TUTORÍAS -->
        <ion-card class="main-form-card">
          <ion-card-header>
            <ion-card-title class="form-title">
              <ion-icon :icon="list" color="success" />
              Lista de Tutorías
            </ion-card-title>
          </ion-card-header>
          
          <ion-card-content>
            <div v-if="tutorias.length === 0" class="empty-state">
              <ion-icon :icon="document" color="medium" />
              <p>No hay tutorías registradas</p>
            </div>
            
            <ion-list lines="none">
              <ion-item 
                v-for="t in tutorias" 
                :key="t.id" 
                class="list-item custom-form-item"
                :class="{ 'item-enter': t.animacion }"
              >
                <ion-icon :icon="school" slot="start" color="success" />
                
                <ion-label class="item-content">
                  <h3>{{ t.tema }}</h3>
                  <p>
                    <ion-icon :icon="person" color="medium" />
                    <strong>Tutor:</strong> {{ t.tutor }}
                  </p>
                  <small v-if="t.timespacep" class="fecha">
                    <ion-icon :icon="time" color="medium" />
                    {{ t.timespacep.toDate ? t.timespacep.toDate().toLocaleString() : t.timespacep }}
                  </small>
                </ion-label>
                
                <div class="item-actions">
                  <ion-button 
                    fill="clear" 
                    color="primary" 
                    @click="editarTutoria(t)"
                    class="action-btn"
                  >
                    <ion-icon :icon="create" />
                  </ion-button>
                  <ion-button 
                    fill="clear" 
                    color="danger" 
                    @click="eliminarTutoria(t.id)"
                    class="action-btn"
                  >
                    <ion-icon :icon="trash" />
                  </ion-button>
                </div>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>
      </div>

      <!-- CONTENIDO GRUPOS DE ESTUDIO -->
      <div v-if="activityType === 'studyGroup'" class="contenido-pestana" :class="{ 'fade-in': mostrarGrupos }">
        
        <!-- FORMULARIO GRUPO -->
        <ion-card class="main-form-card">
          <ion-card-header>
            <ion-card-title class="form-title">
              <ion-icon :icon="grupoEditando ? create : addCircle" color="success" />
              {{ grupoEditando ? 'Editar' : 'Registrar' }} Grupo de Estudio
            </ion-card-title>
          </ion-card-header>
          
          <ion-card-content>
            <form @submit.prevent="grupoEditando ? actualizarGrupo() : agregarGrupo()">
              <ion-item class="form-item custom-form-item">
                <ion-label position="stacked" class="form-label">
                  <ion-icon :icon="peopleCircle" slot="start" />
                  Nombre del grupo
                </ion-label>
                <ion-input 
                  v-model="grupoForm.nombre" 
                  placeholder="Ej: Swapnetwork" 
                  class="custom-input"
                />
              </ion-item>

              <ion-item class="form-item custom-form-item">
                <ion-label position="stacked" class="form-label">
                  <ion-icon :icon="document" slot="start" />
                  Descripción
                </ion-label>
                <ion-input 
                  v-model="grupoForm.descripcion" 
                  placeholder="Ej: Desarrollo proyecto CDC" 
                  class="custom-input"
                />
              </ion-item>

              <ion-item class="form-item custom-form-item">
                <ion-label position="stacked" class="form-label">
                  <ion-icon :icon="time" slot="start" />
                  Horario
                </ion-label>
                <ion-input 
                  v-model="grupoForm.horario" 
                  placeholder="Ej: 2pm a 4pm los viernes" 
                  class="custom-input"
                />
              </ion-item>

              <!-- SELECTOR DE FECHA Y HORA SIMPLE (VERSIÓN ANTERIOR) -->
              <ion-item class="form-item custom-form-item">
                <ion-label position="stacked" class="form-label">
                  <ion-icon :icon="calendar" slot="start" />
                  Fecha y hora
                </ion-label>
                <input 
                  type="datetime-local" 
                  v-model="grupoForm.timespacep" 
                  class="input-datetime"
                />
              </ion-item>

              <div class="botones-form">
                <ion-button 
                  expand="block" 
                  type="submit"
                  class="create-button custom-create-button"
                  :disabled="!grupoForm.nombre || !grupoForm.descripcion"
                >
                  <ion-icon :icon="grupoEditando ? checkmark : addCircle" slot="start" />
                  {{ grupoEditando ? 'Actualizar' : 'Guardar' }} Grupo
                </ion-button>
                
                <ion-button 
                  v-if="grupoEditando" 
                  expand="block" 
                  fill="outline" 
                  color="medium" 
                  @click="cancelarEdicionGrupo" 
                  class="ion-margin-top"
                >
                  <ion-icon :icon="close" slot="start" />
                  Cancelar
                </ion-button>
              </div>
            </form>
          </ion-card-content>
        </ion-card>

        <!-- LISTA DE GRUPOS -->
        <ion-card class="main-form-card">
          <ion-card-header>
            <ion-card-title class="form-title">
              <ion-icon :icon="list" color="success" />
              Lista de Grupos de Estudio
            </ion-card-title>
          </ion-card-header>
          
          <ion-card-content>
            <div v-if="grupos.length === 0" class="empty-state">
              <ion-icon :icon="people" color="medium" />
              <p>No hay grupos registrados</p>
            </div>
            
            <ion-list lines="none">
              <ion-item 
                v-for="g in grupos" 
                :key="g.id" 
                class="list-item custom-form-item"
                :class="{ 'item-enter': g.animacion }"
              >
                <ion-icon :icon="people" slot="start" color="success" />
                
                <ion-label class="item-content">
                  <h3>{{ g.nombre }}</h3>
                  <p>
                    <ion-icon :icon="document" color="medium" />
                    <strong>Descripción:</strong> {{ g.descripcion }}
                  </p>
                  <p>
                    <ion-icon :icon="time" color="medium" />
                    <strong>Horario:</strong> {{ g.horario }}
                  </p>
                  <small v-if="g.timespacep" class="fecha">
                    <ion-icon :icon="calendar" color="medium" />
                    {{ g.timespacep.toDate ? g.timespacep.toDate().toLocaleString() : g.timespacep }}
                  </small>
                </ion-label>
                
                <div class="item-actions">
                  <ion-button 
                    fill="clear" 
                    color="primary" 
                    @click="editarGrupo(g)"
                    class="action-btn"
                  >
                    <ion-icon :icon="create" />
                  </ion-button>
                  <ion-button 
                    fill="clear" 
                    color="danger" 
                    @click="eliminarGrupo(g.id)"
                    class="action-btn"
                  >
                    <ion-icon :icon="trash" />
                  </ion-button>
                </div>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>
      </div>

    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from '../firebaseDB'
import { collection, addDoc, getDocs, deleteDoc, doc, Timestamp, updateDoc } from 'firebase/firestore'
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
  IonInput,
  IonButton,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonList,
  toastController
} from '@ionic/vue';

// Importación de iconos
import { 
  school, 
  people, 
  calendar, 
  addCircle,
  create,
  close,
  checkmark,
  list,
  document,
  time,
  trash,
  book,
  person,
  peopleCircle
} from 'ionicons/icons';

// Variables reactivas para el estado del componente
const activityType = ref('tutoring');
const mostrarTutorias = ref(true);
const mostrarGrupos = ref(false);

// Colecciones de Firebase
const tutoriasRef = collection(db, 'tutoria')
const gruposRef = collection(db, 'grupoestudio')

// Datos reactivas
const tutorias = ref([])
const grupos = ref([])

// Formularios
const tutoriaForm = ref({ tema: '', tutor: '', timespacep: '' })
const grupoForm = ref({ nombre: '', descripcion: '', horario: '', timespacep: '' })

// Estados para edición
const tutoriaEditando = ref(null)
const grupoEditando = ref(null)

// Función que se ejecuta cuando cambia el tipo de actividad
const onActivityTypeChange = (ev) => {
  activityType.value = ev.detail.value;
  if (activityType.value === 'tutoring') {
    mostrarTutorias.value = true;
    mostrarGrupos.value = false;
  } else {
    mostrarTutorias.value = false;
    mostrarGrupos.value = true;
  }
  // Limpiar formularios al cambiar
  cancelarEdicionTutoria();
  cancelarEdicionGrupo();
};

// ========== CRUD TUTORÍAS ==========
const agregarTutoria = async () => {
  if (!tutoriaForm.value.tema || !tutoriaForm.value.tutor) {
    mostrarToast('Por favor, completa todos los campos de la tutoría.', 'warning')
    return
  }

  try {
    let fechaHora = null
    if (tutoriaForm.value.timespacep) {
      fechaHora = Timestamp.fromDate(new Date(tutoriaForm.value.timespacep))
    }

    await addDoc(tutoriasRef, {
      tema: tutoriaForm.value.tema,
      tutor: tutoriaForm.value.tutor,
      timespacep: fechaHora
    })

    mostrarToast('Tutoría guardada correctamente.', 'success')
    tutoriaForm.value = { tema: '', tutor: '', timespacep: '' }
    obtenerTutorias()
  } catch (error) {
    console.error(error)
    mostrarToast('Error al guardar tutoría.', 'danger')
  }
}

const editarTutoria = (tutoria) => {
  tutoriaEditando.value = tutoria.id
  tutoriaForm.value = {
    tema: tutoria.tema,
    tutor: tutoria.tutor,
    timespacep: tutoria.timespacep?.toDate ? formatDateForInput(tutoria.timespacep.toDate()) : tutoria.timespacep
  }
}

const actualizarTutoria = async () => {
  if (!tutoriaForm.value.tema || !tutoriaForm.value.tutor) {
    mostrarToast('Por favor, completa todos los campos de la tutoría.', 'warning')
    return
  }

  try {
    let fechaHora = null
    if (tutoriaForm.value.timespacep) {
      fechaHora = Timestamp.fromDate(new Date(tutoriaForm.value.timespacep))
    }

    await updateDoc(doc(db, 'tutoria', tutoriaEditando.value), {
      tema: tutoriaForm.value.tema,
      tutor: tutoriaForm.value.tutor,
      timespacep: fechaHora
    })

    mostrarToast('Tutoría actualizada correctamente.', 'success')
    cancelarEdicionTutoria()
    obtenerTutorias()
  } catch (error) {
    console.error(error)
    mostrarToast('Error al actualizar tutoría.', 'danger')
  }
}

const cancelarEdicionTutoria = () => {
  tutoriaEditando.value = null
  tutoriaForm.value = { tema: '', tutor: '', timespacep: '' }
}

const obtenerTutorias = async () => {
  const snap = await getDocs(tutoriasRef)
  tutorias.value = snap.docs.map(d => ({ 
    id: d.id, 
    ...d.data(),
    animacion: true 
  }))
  
  setTimeout(() => {
    tutorias.value.forEach(t => t.animacion = false)
  }, 500)
}

const eliminarTutoria = async (id) => {
  if (confirm('¿Estás seguro de eliminar esta tutoría?')) {
    try {
      await deleteDoc(doc(db, 'tutoria', id))
      mostrarToast('Tutoría eliminada correctamente.', 'success')
      obtenerTutorias()
    } catch (error) {
      console.error(error)
      mostrarToast('Error al eliminar tutoría.', 'danger')
    }
  }
}

// ========== CRUD GRUPOS DE ESTUDIO ==========
const agregarGrupo = async () => {
  if (!grupoForm.value.nombre || !grupoForm.value.descripcion) {
    mostrarToast('Por favor, completa todos los campos del grupo de estudio.', 'warning')
    return
  }

  try {
    let fechaHora = null
    if (grupoForm.value.timespacep) {
      fechaHora = Timestamp.fromDate(new Date(grupoForm.value.timespacep))
    }

    await addDoc(gruposRef, {
      nombre: grupoForm.value.nombre,
      descripcion: grupoForm.value.descripcion,
      horario: grupoForm.value.horario,
      timespacep: fechaHora
    })

    mostrarToast('Grupo de estudio guardado correctamente.', 'success')
    grupoForm.value = { nombre: '', descripcion: '', horario: '', timespacep: '' }
    obtenerGrupos()
  } catch (error) {
    console.error(error)
    mostrarToast('Error al guardar grupo de estudio.', 'danger')
  }
}

const editarGrupo = (grupo) => {
  grupoEditando.value = grupo.id
  grupoForm.value = {
    nombre: grupo.nombre,
    descripcion: grupo.descripcion,
    horario: grupo.horario,
    timespacep: grupo.timespacep?.toDate ? formatDateForInput(grupo.timespacep.toDate()) : grupo.timespacep
  }
}

const actualizarGrupo = async () => {
  if (!grupoForm.value.nombre || !grupoForm.value.descripcion) {
    mostrarToast('Por favor, completa todos los campos del grupo de estudio.', 'warning')
    return
  }

  try {
    let fechaHora = null
    if (grupoForm.value.timespacep) {
      fechaHora = Timestamp.fromDate(new Date(grupoForm.value.timespacep))
    }

    await updateDoc(doc(db, 'grupoestudio', grupoEditando.value), {
      nombre: grupoForm.value.nombre,
      descripcion: grupoForm.value.descripcion,
      horario: grupoForm.value.horario,
      timespacep: fechaHora
    })

    mostrarToast('Grupo de estudio actualizado correctamente.', 'success')
    cancelarEdicionGrupo()
    obtenerGrupos()
  } catch (error) {
    console.error(error)
    mostrarToast('Error al actualizar grupo de estudio.', 'danger')
  }
}

const cancelarEdicionGrupo = () => {
  grupoEditando.value = null
  grupoForm.value = { nombre: '', descripcion: '', horario: '', timespacep: '' }
}

const obtenerGrupos = async () => {
  const snap = await getDocs(gruposRef)
  grupos.value = snap.docs.map(d => ({ 
    id: d.id, 
    ...d.data(),
    animacion: true 
  }))
  
  setTimeout(() => {
    grupos.value.forEach(g => g.animacion = false)
  }, 500)
}

const eliminarGrupo = async (id) => {
  if (confirm('¿Estás seguro de eliminar este grupo de estudio?')) {
    try {
      await deleteDoc(doc(db, 'grupoestudio', id))
      mostrarToast('Grupo de estudio eliminado correctamente.', 'success')
      obtenerGrupos()
    } catch (error) {
      console.error(error)
      mostrarToast('Error al eliminar grupo de estudio.', 'danger')
    }
  }
}

// Función auxiliar para formatear fecha al input datetime-local
const formatDateForInput = (date) => {
  return date.toISOString().slice(0, 16)
}

// Función para mostrar notificaciones
const mostrarToast = async (mensaje, color = 'success') => {
  const toast = await toastController.create({
    message: mensaje,
    duration: 2000,
    color: color,
    position: 'top'
  });
  await toast.present();
}

// Cargar datos al iniciar
onMounted(() => {
  obtenerTutorias()
  obtenerGrupos()
})
</script>

<style scoped>
/* MANTENIENDO TODOS TUS ESTILOS EXISTENTES */

/* TOOLBAR SUPERIOR */
ion-toolbar.custom-toolbar {
  --background: #1a7431 !important;
  background: #1a7431 !important;
  --border-color: #1a7431 !important;
  --color: white !important;
}

ion-toolbar.custom-toolbar ion-title {
  color: white !important;
  font-weight: bold !important;
  font-size: 1.2rem !important;
}

/* BOTÓN DE REGRESO BLANCO */
ion-back-button.custom-back-button {
  --color: white !important;
  color: white !important;
  --opacity: 1 !important;
}

ion-back-button.custom-back-button::part(native) {
  color: white !important;
}

/* CONTENIDO PRINCIPAL BLANCO */
ion-content.custom-content {
  --background: #ffffff !important;
  background: #ffffff !important;
}

/* SECCIÓN INTRODUCCIÓN - TEXTO VERDE */
.intro-section {
  text-align: center !important;
  margin-bottom: 2rem !important;
  padding: 0 1rem !important;
}

.intro-section h2 {
  color: #1a7431 !important;
  font-weight: bold !important;
  font-size: 1.5rem !important;
  margin-bottom: 1rem !important;
}

.intro-section p {
  color: #1a7431 !important;
  font-size: 1.1rem !important;
  line-height: 1.6 !important;
  margin: 0 !important;
}

/* SELECTOR DE ACTIVIDAD */
.activity-selector {
  margin-bottom: 2rem !important;
}

.activity-selector h3 {
  color: #1a7431 !important;
  font-weight: bold !important;
  font-size: 1.3rem !important;
  margin-bottom: 1rem !important;
  text-align: center !important;
}

.selector-buttons {
  display: flex !important;
  justify-content: center !important;
}

/* SEGMENT BUTTONS - VERDE */
ion-segment {
  --background: #ffffff !important;
  background: #ffffff !important;
}

ion-segment-button {
  --color: #1a7431 !important;
  --color-checked: #ffffff !important;
  --indicator-color: #1a7431 !important;
  border: 2px solid #1a7431 !important;
  border-radius: 8px !important;
  margin: 0 5px !important;
}

ion-segment-button::part(native) {
  color: #1a7431 !important;
}

ion-segment-button[aria-selected="true"] {
  background: #1a7431 !important;
}

ion-segment-button[aria-selected="true"]::part(native) {
  color: white !important;
}

/* ICONOS DEL SEGMENTO */
.segment-icon {
  color: #1a7431 !important;
  font-size: 1.2rem !important;
}

ion-segment-button[aria-selected="true"] .segment-icon {
  color: white !important;
}

/* FORMULARIO PRINCIPAL */
.main-form-card {
  background: #ffffff !important;
  border: 3px solid #1a7431 !important;
  border-radius: 16px !important;
  box-shadow: 0 4px 15px rgba(26, 116, 49, 0.3) !important;
  margin: 1rem 0 !important;
}

/* TÍTULO DEL FORMULARIO */
.form-title {
  color: #1a7431 !important;
  font-weight: bold !important;
  font-size: 1.4rem !important;
  text-align: center !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px !important;
}

/* ITEMS DEL FORMULARIO */
.custom-form-item {
  --background: #ffffff !important;
  background: #ffffff !important;
  border: 2px solid #1a7431 !important;
  border-radius: 10px !important;
  margin-bottom: 1rem !important;
}

/* LABELS VERDES */
.form-label {
  color: #1a7431 !important;
  font-weight: bold !important;
  font-size: 1rem !important;
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
}

/* INPUTS - VERDE */
.custom-input::part(placeholder),
.custom-input::part(text) {
  color: #1a7431 !important;
  font-weight: 500 !important;
}

/* INPUT DATETIME */
.input-datetime {
  width: 100% !important;
  padding: 16px 12px !important;
  border: none !important;  
  border-radius: 10px !important;
  margin-top: 8px !important;
  font-size: 16px !important;
  color: #1a7431 !important;
  background: #ffffff !important;
  font-family: inherit !important;
  min-height: 50px !important;
  box-sizing: border-box !important;
}

.input-datetime:focus {
  outline: none !important;
  border: none !important;  
  box-shadow: none !important; 
}

/* BOTÓN CREAR EVENTO  */
.custom-create-button {
  --background: #1a7431 !important;
  --background-hover: #145c2c !important;
  --background-activated: #145c2c !important;
  --color: #ffffff !important;
  --border-radius: 10px !important;
  margin-top: 1rem !important;
  font-weight: bold !important;
  font-size: 1.1rem !important;
  height: 50px !important;
}

.custom-create-button::part(native) {
  background: #1a7431 !important;
  color: white !important;
}

/* LIST ITEMS */
.list-item {
  --padding-start: 16px !important;
  --padding-end: 16px !important;
  --inner-padding-end: 8px !important;
  margin: 8px 0 !important;
  transition: all 0.3s ease !important;
}

.list-item:hover {
  background-color: #f8f9fa !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
}

.item-enter {
  animation: slideIn 0.5s ease-out !important;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.item-content {
  margin: 12px 0 !important;
}

.item-content h3 {
  font-weight: 600 !important;
  color: #1a7431 !important;
  margin-bottom: 8px !important;
}

.item-content p {
  margin: 4px 0 !important;
  display: flex !important;
  align-items: center !important;
  gap: 6px !important;
  color: #666 !important;
  font-size: 14px !important;
}

.fecha {
  display: flex !important;
  align-items: center !important;
  gap: 6px !important;
  color: #888 !important;
  font-size: 12px !important;
  margin-top: 8px !important;
}

.item-actions {
  display: flex !important;
  gap: 4px !important;
}

.action-btn {
  --padding-start: 8px !important;
  --padding-end: 8px !important;
}

.empty-state {
  text-align: center !important;
  padding: 40px 20px !important;
  color: #888 !important;
}

.empty-state ion-icon {
  font-size: 48px !important;
  margin-bottom: 16px !important;
}

.empty-state p {
  margin: 0 !important;
  font-size: 16px !important;
}

/* ANIMACIONES PESTAÑAS */
.contenido-pestana {
  transition: all 0.3s ease-in-out !important;
}

.fade-in {
  animation: fadeIn 0.5s ease-in !important;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* BOTONES FORM */
.botones-form {
  display: flex !important;
  flex-direction: column !important;
  gap: 12px !important;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .intro-section h2 {
    font-size: 1.3rem !important;
  }
  
  .form-title {
    font-size: 1.2rem !important;
  }
  
  .custom-create-button {
    height: 45px !important;
    font-size: 1rem !important;
  }
  
  .item-actions {
    flex-direction: column !important;
  }
}

/* MODO OSCURO - MANTENER COLORES */
@media (prefers-color-scheme: dark) {
  ion-content.custom-content {
    --background: #ffffff !important;
    background: #ffffff !important;
  }
  
  .main-form-card {
    background: #ffffff !important;
  }
  
  .custom-form-item {
    --background: #ffffff !important;
    background: #ffffff !important;
  }
}
</style>