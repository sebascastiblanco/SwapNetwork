<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="custom-toolbar">
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>Explora</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding custom-content">
      <!-- Sección de introducción -->
      <div class="intro-section">
        <h2>Explora las tutorías y grupos disponibles</h2>
        <p>Descubre nuevas oportunidades de aprendizaje y colaboración.</p>
      </div>

      <!-- Filtros y búsqueda -->
      <div class="filters-section">
        <ion-searchbar 
          placeholder="Buscar por materia, profesor..." 
          v-model="searchQuery"
          @ionInput="filterActivities"
          class="custom-searchbar"
        ></ion-searchbar>

        <div class="filter-buttons">
          <ion-segment value="all" @ionChange="onFilterChange($event)">
            <ion-segment-button value="all">
              <ion-label>Todos</ion-label>
            </ion-segment-button>
            <ion-segment-button value="tutoring">
              <ion-icon :icon="school"></ion-icon>
              <ion-label>Tutorías</ion-label>
            </ion-segment-button>
            <ion-segment-button value="studyGroup">
              <ion-icon :icon="people"></ion-icon>
              <ion-label>Grupos</ion-label>
            </ion-segment-button>
          </ion-segment>
        </div>

        <!-- Filtros adicionales -->
        <div class="additional-filters">
          <ion-chip 
            v-for="subject in availableSubjects" 
            :key="subject"
            :outline="selectedSubject !== subject"
            @click="toggleSubjectFilter(subject)"
            class="subject-chip"
          >
            {{ getSubjectName(subject) }}
          </ion-chip>
        </div>
      </div>

      <!-- Estado de carga -->
      <div class="loading-section" v-if="loading">
        <ion-spinner name="crescent"></ion-spinner>
        <p>Cargando actividades...</p>
      </div>

      <!-- Lista de actividades -->
      <div class="activities-section" v-else>
        <!-- Mensaje cuando no hay resultados -->
        <div class="empty-state" v-if="filteredActivities.length === 0">
          <ion-icon :icon="search" class="empty-icon"></ion-icon>
          <h3>No se encontraron actividades</h3>
          <p>Intenta ajustar tus filtros de búsqueda</p>
        </div>

        <!-- Lista de actividades -->
        <div class="activities-list" v-else>
          <!-- Tutorías -->
          <div class="activity-category" v-if="showTutoring">
            <h3 class="category-title">
              <ion-icon :icon="school" class="category-icon"></ion-icon>
              Tutorías Disponibles
              <span class="count-badge">{{ tutoringCount }}</span>
            </h3>
            
            <ion-card 
              v-for="activity in filteredTutoring" 
              :key="activity.id"
              class="activity-card tutoring-card"
              @click="viewActivityDetails(activity)"
            >
              <ion-card-content class="card-content">
                <div class="activity-header">
                  <div class="subject-badge" :class="activity.subject">
                    {{ getSubjectName(activity.subject) }}
                  </div>
                  <ion-badge :color="getStatusColor(activity)" class="status-badge">
                    {{ getStatusText(activity) }}
                  </ion-badge>
                </div>

                <h4 class="activity-title">{{ activity.title }}</h4>
                
                <div class="activity-details">
                  <div class="detail-item">
                    <ion-icon :icon="person" class="detail-icon"></ion-icon>
                    <span><strong>Profesor:</strong> {{ activity.teacher }}</span>
                  </div>
                  
                  <div class="detail-item">
                    <ion-icon :icon="calendar" class="detail-icon"></ion-icon>
                    <span><strong>Fecha:</strong> {{ formatDate(activity.date) }}</span>
                  </div>
                  
                  <div class="detail-item">
                    <ion-icon :icon="time" class="detail-icon"></ion-icon>
                    <span><strong>Horario:</strong> {{ formatTime(activity.date) }}</span>
                  </div>
                  
                  <div class="detail-item">
                    <ion-icon :icon="people" class="detail-icon"></ion-icon>
                    <span><strong>Participantes:</strong> {{ activity.participants }}/{{ activity.maxParticipants }}</span>
                  </div>
                </div>

                <p class="activity-description">{{ activity.description }}</p>

                <div class="activity-footer">
                  <div class="participants-avatars">
                    <ion-avatar v-for="n in Math.min(3, activity.participants)" :key="n" class="small-avatar">
                      <img :src="`https://i.pravatar.cc/150?img=${n + 10}`" alt="Participante" />
                    </ion-avatar>
                    <span class="more-participants" v-if="activity.participants > 3">
                      +{{ activity.participants - 3 }} más
                    </span>
                  </div>
                  
                  <ion-button 
                    fill="outline" 
                    size="small" 
                    @click.stop="joinActivity(activity)"
                    :disabled="activity.participants >= activity.maxParticipants"
                  >
                    {{ activity.participants >= activity.maxParticipants ? 'Completo' : 'Unirse' }}
                  </ion-button>
                </div>
              </ion-card-content>
            </ion-card>
          </div>

          <!-- Grupos de Estudio -->
          <div class="activity-category" v-if="showStudyGroups">
            <h3 class="category-title">
              <ion-icon :icon="people" class="category-icon"></ion-icon>
              Grupos de Estudio
              <span class="count-badge">{{ studyGroupCount }}</span>
            </h3>
            
            <ion-card 
              v-for="activity in filteredStudyGroups" 
              :key="activity.id"
              class="activity-card studygroup-card"
              @click="viewActivityDetails(activity)"
            >
              <ion-card-content class="card-content">
                <div class="activity-header">
                  <div class="subject-badge" :class="activity.subject">
                    {{ getSubjectName(activity.subject) }}
                  </div>
                  <ion-badge :color="getStatusColor(activity)" class="status-badge">
                    {{ getStatusText(activity) }}
                  </ion-badge>
                </div>

                <h4 class="activity-title">{{ activity.title }}</h4>
                
                <div class="activity-details">
                  <div class="detail-item">
                    <ion-icon :icon="calendar" class="detail-icon"></ion-icon>
                    <span><strong>Próxima sesión:</strong> {{ formatDate(activity.nextSession) }}</span>
                  </div>
                  
                  <div class="detail-item">
                    <ion-icon :icon="time" class="detail-icon"></ion-icon>
                    <span><strong>Horario:</strong> {{ formatTime(activity.nextSession) }}</span>
                  </div>
                  
                  <div class="detail-item">
                    <ion-icon :icon="people" class="detail-icon"></ion-icon>
                    <span><strong>Miembros:</strong> {{ activity.participants }}/{{ activity.maxParticipants }}</span>
                  </div>
                  
                  <div class="detail-item">
                    <ion-icon :icon="location" class="detail-icon"></ion-icon>
                    <span><strong>Lugar:</strong> {{ activity.location }}</span>
                  </div>
                </div>

                <p class="activity-description">{{ activity.description }}</p>

                <div class="tags-container">
                  <ion-chip v-for="tag in activity.tags" :key="tag" size="small" class="topic-chip">
                    {{ tag }}
                  </ion-chip>
                </div>

                <div class="activity-footer">
                  <div class="frequency-badge">
                    <ion-icon :icon="repeat"></ion-icon>
                    {{ activity.frequency }}
                  </div>
                  
                  <ion-button 
                    fill="outline" 
                    size="small" 
                    @click.stop="joinActivity(activity)"
                    :disabled="activity.participants >= activity.maxParticipants"
                  >
                    {{ activity.participants >= activity.maxParticipants ? 'Completo' : 'Unirse' }}
                  </ion-button>
                </div>
              </ion-card-content>
            </ion-card>
          </div>
        </div>
      </div>

      <!-- Modal de detalles de actividad -->
      <ion-modal 
        :is-open="detailModalOpen" 
        @didDismiss="detailModalOpen = false"
        class="activity-detail-modal"
      >
        <ActivityDetail 
          :activity="selectedActivity"
          @close="detailModalOpen = false"
          @join="handleJoinActivity"
          v-if="selectedActivity"
        />
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup>
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
  IonCardContent,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonIcon,
  IonBadge,
  IonChip,
  IonAvatar,
  IonButton,
  IonSpinner,
  IonModal,
  toastController
} from '@ionic/vue';
import { 
  school, 
  people, 
  calendar, 
  time, 
  person, 
  location, 
  search,
  repeat
} from 'ionicons/icons';

// Componente de detalles (simplificado)
const ActivityDetail = {
  props: ['activity'],
  template: `
    <div class="detail-modal-content">
      <ion-toolbar>
        <ion-title>Detalles</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="$emit('close')">Cerrar</ion-button>
        </ion-buttons>
      </ion-toolbar>
      <div class="detail-content" v-if="activity">
        <h3>{{ activity.title }}</h3>
        <p>{{ activity.description }}</p>
        <!-- Más detalles aquí -->
      </div>
    </div>
  `
};

// Variables reactivas
const searchQuery = ref('');
const filterType = ref('all');
const selectedSubject = ref('');
const loading = ref(true);
const detailModalOpen = ref(false);
const selectedActivity = ref(null);

// Datos de ejemplo
const activities = ref([
  {
    id: 1,
    type: 'tutoring',
    title: 'Tutoría de Cálculo Diferencial',
    subject: 'matematicas',
    teacher: 'Prof. García',
    date: '2024-01-15T14:00:00',
    description: 'Repaso de límites y derivadas para el examen parcial',
    participants: 3,
    maxParticipants: 5,
    status: 'available'
  },
  {
    id: 2,
    type: 'tutoring',
    title: 'Tutoría de Física Mecánica',
    subject: 'fisica',
    teacher: 'Prof. Martínez',
    date: '2024-01-16T16:00:00',
    description: 'Leyes de Newton y aplicaciones prácticas',
    participants: 5,
    maxParticipants: 6,
    status: 'almost_full'
  },
  {
    id: 3,
    type: 'studyGroup',
    title: 'Grupo de Programación Web',
    subject: 'programacion',
    description: 'Estudio colaborativo de HTML, CSS y JavaScript',
    nextSession: '2024-01-17T10:00:00',
    participants: 4,
    maxParticipants: 8,
    location: 'Biblioteca Central',
    frequency: 'Semanal',
    tags: ['HTML', 'CSS', 'JavaScript', 'Frontend'],
    status: 'available'
  },
  {
    id: 4,
    type: 'studyGroup',
    title: 'Grupo de Literatura Española',
    subject: 'literatura',
    description: 'Análisis de obras del Siglo de Oro',
    nextSession: '2024-01-18T15:00:00',
    participants: 6,
    maxParticipants: 6,
    location: 'Sala de Estudio 3',
    frequency: 'Quincenal',
    tags: ['Literatura', 'Siglo de Oro', 'Análisis'],
    status: 'full'
  }
]);

// Materias disponibles
const availableSubjects = ['matematicas', 'fisica', 'quimica', 'programacion', 'literatura'];

// Computed properties
const filteredActivities = computed(() => {
  let filtered = activities.value;

  // Filtrar por tipo
  if (filterType.value !== 'all') {
    filtered = filtered.filter(activity => activity.type === filterType.value);
  }

  // Filtrar por materia
  if (selectedSubject.value) {
    filtered = filtered.filter(activity => activity.subject === selectedSubject.value);
  }

  // Filtrar por búsqueda
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(activity => 
      activity.title.toLowerCase().includes(query) ||
      activity.description.toLowerCase().includes(query) ||
      (activity.teacher && activity.teacher.toLowerCase().includes(query)) ||
      getSubjectName(activity.subject).toLowerCase().includes(query)
    );
  }

  return filtered;
});

const filteredTutoring = computed(() => 
  filteredActivities.value.filter(activity => activity.type === 'tutoring')
);

const filteredStudyGroups = computed(() => 
  filteredActivities.value.filter(activity => activity.type === 'studyGroup')
);

const tutoringCount = computed(() => filteredTutoring.value.length);
const studyGroupCount = computed(() => filteredStudyGroups.value.length);

const showTutoring = computed(() => 
  filterType.value === 'all' || filterType.value === 'tutoring'
);

const showStudyGroups = computed(() => 
  filterType.value === 'all' || filterType.value === 'studyGroup'
);

// Métodos
const onFilterChange = (ev) => {
  filterType.value = ev.detail.value;
};

const toggleSubjectFilter = (subject) => {
  selectedSubject.value = selectedSubject.value === subject ? '' : subject;
};

const filterActivities = () => {
  // La búsqueda se maneja automáticamente por el computed property
};

const getSubjectName = (subjectKey) => {
  const subjects = {
    matematicas: 'Matemáticas',
    fisica: 'Física',
    quimica: 'Química',
    biologia: 'Biología',
    historia: 'Historia',
    literatura: 'Literatura',
    ingles: 'Inglés',
    programacion: 'Programación'
  };
  return subjects[subjectKey] || subjectKey;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getStatusColor = (activity) => {
  if (activity.status === 'full') return 'danger';
  if (activity.status === 'almost_full') return 'warning';
  return 'success';
};

const getStatusText = (activity) => {
  if (activity.participants >= activity.maxParticipants) return 'Completo';
  if (activity.participants >= activity.maxParticipants - 1) return 'Casi lleno';
  return 'Disponible';
};

const viewActivityDetails = (activity) => {
  selectedActivity.value = activity;
  detailModalOpen.value = true;
};

const joinActivity = async (activity) => {
  if (activity.participants < activity.maxParticipants) {
    activity.participants++;
    
    const toast = await toastController.create({
      message: `Te has unido a "${activity.title}"`,
      duration: 2000,
      color: 'success',
      position: 'top'
    });
    await toast.present();
  }
};

const handleJoinActivity = (activity) => {
  joinActivity(activity);
  detailModalOpen.value = false;
};

// Simular carga de datos
onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 1000);
});
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
  margin-bottom: 1.5rem;
  padding: 0 1rem;
}

.intro-section h2 {
  color: var(--primary-green);
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 1.4rem;
}

.intro-section p {
  color: var(--text-gray);
  line-height: 1.5;
  font-size: 0.95rem;
}

/* Filtros */
.filters-section {
  margin-bottom: 1.5rem;
}

.custom-searchbar {
  --background: var(--white);
  --border-radius: 8px;
  --box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  margin-bottom: 1rem;
}

.filter-buttons {
  margin-bottom: 1rem;
}

.additional-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.subject-chip {
  --background: var(--white);
  --color: var(--primary-green);
  --background-activated: var(--primary-green);
  --color-activated: var(--white);
}

/* Estado de carga */
.loading-section {
  text-align: center;
  padding: 3rem 1rem;
}

.loading-section p {
  color: var(--text-gray);
  margin-top: 1rem;
}

/* Estado vacío */
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--text-gray);
}

.empty-icon {
  font-size: 3rem;
  color: var(--medium-gray);
  margin-bottom: 1rem;
}

/* Lista de actividades */
.activities-section {
  max-width: 800px;
  margin: 0 auto;
}

.activity-category {
  margin-bottom: 2rem;
}

.category-title {
  display: flex;
  align-items: center;
  color: var(--dark-gray);
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.category-icon {
  margin-right: 0.5rem;
  color: var(--primary-green);
}

.count-badge {
  background: var(--primary-green);
  color: var(--white);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  margin-left: 0.5rem;
}

/* Tarjetas de actividad */
.activity-card {
  margin-bottom: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border-left: 4px solid var(--primary-green);
}

.activity-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card-content {
  padding: 1.5rem;
}

.activity-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.subject-badge {
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--white);
}

.subject-badge.matematicas { background: #FF6B6B; }
.subject-badge.fisica { background: #4ECDC4; }
.subject-badge.quimica { background: #45B7D1; }
.subject-badge.programacion { background: #96CEB4; }
.subject-badge.literatura { background: #FFBE0B; }

.status-badge {
  font-size: 0.7rem;
}

.activity-title {
  color: var(--dark-gray);
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
}

.activity-details {
  margin-bottom: 1rem;
}

.detail-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-gray);
}

.detail-icon {
  margin-right: 0.5rem;
  color: var(--primary-green);
  font-size: 0.9rem;
}

.activity-description {
  color: var(--text-gray);
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.topic-chip {
  --background: var(--light-gray);
  --color: var(--dark-gray);
  font-size: 0.7rem;
}

.activity-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--medium-gray);
}

.participants-avatars {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.small-avatar {
  width: 28px;
  height: 28px;
  border: 2px solid var(--white);
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}

.more-participants {
  font-size: 0.8rem;
  color: var(--text-gray);
  margin-left: 0.5rem;
}

.frequency-badge {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: var(--light-gray);
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.8rem;
  color: var(--text-gray);
}

/* Modal */
.detail-modal-content {
  background: var(--white);
  height: 100%;
}

/* Responsive */
@media (max-width: 768px) {
  .intro-section {
    margin-bottom: 1rem;
  }
  
  .card-content {
    padding: 1rem;
  }
  
  .activity-footer {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .additional-filters {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 0.5rem;
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
</style>