<template>
  <ion-page>
    <!-- Header con botones de navegación y acciones -->
    <ion-header>
      <ion-toolbar class="custom-toolbar">
        <!-- Botón de regreso -->
        <ion-buttons slot="start">
          <ion-back-button default-href="/" text="Atrás"></ion-back-button>
        </ion-buttons>
        
        <!-- Título de la página -->
        <ion-title>Explorar</ion-title>
        
        <!-- Botón de actualizar en el extremo derecho -->
        <ion-buttons slot="end">
          <ion-button @click="refreshData">
            <ion-icon slot="icon-only" :icon="refresh"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <!-- Contenido principal de la página -->
    <ion-content class="ion-padding custom-content">
      <!-- SECCIÓN DE INTRODUCCIÓN: Muestra estadísticas generales -->
      <div class="intro-section">
        <div class="intro-content">
          <h2>Tutorías y Grupos de Estudio</h2>
          <p>Encuentra y únete a actividades de aprendizaje colaborativo</p>
          
          <!-- Contenedor de estadísticas -->
          <div class="stats-container">
            <!-- Estadística de tutorías -->
            <div class="stat-item">
              <ion-icon :icon="school" class="stat-icon"></ion-icon>
              <span class="stat-number">{{ tutorias.length }}</span>
              <span class="stat-label">Tutorías</span>
            </div>
            
            <!-- Estadística de grupos -->
            <div class="stat-item">
              <ion-icon :icon="people" class="stat-icon"></ion-icon>
              <span class="stat-number">{{ grupos.length }}</span>
              <span class="stat-label">Grupos</span>
            </div>
            
            <!-- Estadística de actividades para hoy -->
            <div class="stat-item">
              <ion-icon :icon="calendar" class="stat-icon"></ion-icon>
              <span class="stat-number">{{ actividadesHoyCount }}</span>
              <span class="stat-label">Hoy</span>
            </div>
          </div>
        </div>
      </div>

      <!-- SECCIÓN DE FILTROS Y BÚSQUEDA -->
      <div class="filters-section">
        <!-- Barra de búsqueda -->
        <ion-searchbar 
          placeholder="Buscar por tema, tutor, materia..." 
          v-model="searchQuery"
          @ionInput="handleSearch"
          class="custom-searchbar"
          animated
          clear-input
        ></ion-searchbar>

        <!-- Filtros por tipo de actividad -->
        <div class="filter-row">
          <ion-segment value="all" @ionChange="onFilterChange($event)" class="type-segment">
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
      </div>

      <!-- ESTADO DE CARGA: Se muestra mientras se obtienen datos -->
      <div class="loading-section" v-if="loading">
        <div class="loading-content">
          <ion-spinner name="crescent" class="loading-spinner"></ion-spinner>
          <p>Cargando actividades...</p>
        </div>
      </div>

      <!-- CONTENIDO PRINCIPAL: Se muestra cuando ya se cargaron los datos -->
      <div class="activities-section" v-else>
        <!-- ESTADO VACÍO: Cuando no hay actividades -->
        <div class="empty-state" v-if="tutorias.length === 0 && grupos.length === 0">
          <div class="empty-content">
            <ion-icon :icon="searchOutline" class="empty-icon"></ion-icon>
            <h3>No hay actividades disponibles</h3>
            <p>No se han encontrado tutorías ni grupos de estudio</p>
            <ion-button fill="solid" color="primary" @click="refreshData">
              <ion-icon :icon="refresh" slot="start"></ion-icon>
              Recargar
            </ion-button>
          </div>
        </div>

        <!-- LISTA DE ACTIVIDADES: Contenido principal con datos reales -->
        <div class="activities-list" v-else>
          <!-- SECCIÓN DE TUTORÍAS REALES -->
          <div class="activity-category" v-if="showTutoring && tutoriasFiltradas.length > 0">
            <div class="category-header">
              <h3 class="category-title">
                <ion-icon :icon="school" class="category-icon"></ion-icon>
                Tutorías Disponibles
                <span class="count-badge">{{ tutoriasFiltradas.length }}</span>
              </h3>
            </div>
            
            <!-- Grid de tarjetas de tutorías -->
            <div class="activities-grid">
              <ion-card 
                v-for="tutoria in tutoriasFiltradas" 
                :key="tutoria.id"
                class="activity-card tutoring-card"
                @click="verDetallesTutoria(tutoria)"
              >
                <ion-card-content class="card-content">
                  <!-- Header de la tarjeta con tipo y estado -->
                  <div class="activity-header">
                    <div class="subject-badge">
                      <ion-icon :icon="school" class="subject-icon"></ion-icon>
                      Tutoría
                    </div>
                    <ion-badge color="success" class="status-badge">
                      Disponible
                    </ion-badge>
                  </div>

                  <!-- Título de la tutoría -->
                  <h4 class="activity-title">{{ tutoria.tema || 'Tutoría' }}</h4>
                  
                  <!-- Metadatos: tutor, fecha, hora, materia -->
                  <div class="activity-meta">
                    <div class="meta-item" v-if="tutoria.tutor">
                      <ion-icon :icon="person" class="meta-icon"></ion-icon>
                      <span class="meta-text"><strong>Tutor:</strong> {{ tutoria.tutor }}</span>
                    </div>
                    
                    <div class="meta-item" v-if="tutoria.timespacep">
                      <ion-icon :icon="calendar" class="meta-icon"></ion-icon>
                      <span class="meta-text">{{ formatFecha(tutoria.timespacep) }}</span>
                    </div>
                    
                    <div class="meta-item" v-if="tutoria.timespacep">
                      <ion-icon :icon="time" class="meta-icon"></ion-icon>
                      <span class="meta-text">{{ formatHora(tutoria.timespacep) }}</span>
                    </div>

                    <div class="meta-item" v-if="tutoria.materia">
                      <ion-icon :icon="book" class="meta-icon"></ion-icon>
                      <span class="meta-text"><strong>Materia:</strong> {{ tutoria.materia }}</span>
                    </div>
                  </div>

                  <!-- Descripción de la tutoría -->
                  <p class="activity-description" v-if="tutoria.descripcion">
                    {{ tutoria.descripcion }}
                  </p>
                  <p class="activity-description" v-else>
                    Tutoría disponible para unirse
                  </p>

                  <!-- Footer con participantes y botón de unirse -->
                  <div class="activity-footer">
                    <div class="participants-info">
                      <!-- Avatares de participantes -->
                      <div class="participants-avatars">
                        <ion-avatar 
                          v-for="n in Math.min(3, tutoria.participantes ? tutoria.participantes.length : 0)" 
                          :key="n" 
                          class="small-avatar"
                        >
                          <img :src="`https://i.pravatar.cc/150?img=${n + 10}`" alt="Participante" />
                        </ion-avatar>
                        <span class="more-participants" v-if="tutoria.participantes && tutoria.participantes.length > 3">
                          +{{ tutoria.participantes.length - 3 }} más
                        </span>
                        <span class="no-participants" v-else-if="!tutoria.participantes || tutoria.participantes.length === 0">
                          Sé el primero en unirte
                        </span>
                      </div>
                      <!-- Contador de participantes -->
                      <div class="participants-count">
                        <ion-icon :icon="people" class="count-icon"></ion-icon>
                        <span>{{ tutoria.participantes ? tutoria.participantes.length : 0 }} participantes</span>
                      </div>
                    </div>
                    
                    <!-- Botón para unirse a la tutoría -->
                    <ion-button 
                      fill="solid" 
                      size="small" 
                      @click.stop="unirseTutoria(tutoria)"
                      :disabled="estaUnido(tutoria)"
                      class="join-btn"
                      :color="estaUnido(tutoria) ? 'success' : 'primary'"
                    >
                      <ion-icon 
                        :icon="estaUnido(tutoria) ? checkmarkCircle : addCircle" 
                        slot="start"
                      ></ion-icon>
                      {{ estaUnido(tutoria) ? 'Unido' : 'Unirse' }}
                    </ion-button>
                  </div>
                </ion-card-content>
              </ion-card>
            </div>
          </div>

          <!-- SECCIÓN DE GRUPOS DE ESTUDIO REALES -->
          <div class="activity-category" v-if="showStudyGroups && gruposFiltrados.length > 0">
            <div class="category-header">
              <h3 class="category-title">
                <ion-icon :icon="people" class="category-icon"></ion-icon>
                Grupos de Estudio
                <span class="count-badge">{{ gruposFiltrados.length }}</span>
              </h3>
            </div>
            
            <!-- Grid de tarjetas de grupos -->
            <div class="activities-grid">
              <ion-card 
                v-for="grupo in gruposFiltrados" 
                :key="grupo.id"
                class="activity-card studygroup-card"
                @click="verDetallesGrupo(grupo)"
              >
                <ion-card-content class="card-content">
                  <!-- Header de la tarjeta con tipo y estado -->
                  <div class="activity-header">
                    <div class="subject-badge">
                      <ion-icon :icon="people" class="subject-icon"></ion-icon>
                      Grupo
                    </div>
                    <ion-badge color="success" class="status-badge">
                      Disponible
                    </ion-badge>
                  </div>

                  <!-- Título del grupo -->
                  <h4 class="activity-title">{{ grupo.nombre || 'Grupo de Estudio' }}</h4>
                  
                  <!-- Metadatos: fecha, horario, materia, ubicación -->
                  <div class="activity-meta">
                    <div class="meta-item" v-if="grupo.timespacep">
                      <ion-icon :icon="calendar" class="meta-icon"></ion-icon>
                      <span class="meta-text">{{ formatFecha(grupo.timespacep) }}</span>
                    </div>
                    
                    <div class="meta-item" v-if="grupo.horario">
                      <ion-icon :icon="time" class="meta-icon"></ion-icon>
                      <span class="meta-text"><strong>Horario:</strong> {{ grupo.horario }}</span>
                    </div>

                    <div class="meta-item" v-if="grupo.materia">
                      <ion-icon :icon="book" class="meta-icon"></ion-icon>
                      <span class="meta-text"><strong>Materia:</strong> {{ grupo.materia }}</span>
                    </div>

                    <div class="meta-item" v-if="grupo.ubicacion">
                      <ion-icon :icon="location" class="meta-icon"></ion-icon>
                      <span class="meta-text"><strong>Lugar:</strong> {{ grupo.ubicacion }}</span>
                    </div>
                  </div>

                  <!-- Descripción del grupo -->
                  <p class="activity-description" v-if="grupo.descripcion">
                    {{ grupo.descripcion }}
                  </p>
                  <p class="activity-description" v-else>
                    Grupo de estudio colaborativo
                  </p>

                  <!-- Footer con miembros y botón de unirse -->
                  <div class="activity-footer">
                    <div class="participants-info">
                      <!-- Avatares de miembros -->
                      <div class="participants-avatars">
                        <ion-avatar 
                          v-for="n in Math.min(3, grupo.miembros ? grupo.miembros.length : 0)" 
                          :key="n" 
                          class="small-avatar"
                        >
                          <img :src="`https://i.pravatar.cc/150?img=${n + 20}`" alt="Miembro" />
                        </ion-avatar>
                        <span class="more-participants" v-if="grupo.miembros && grupo.miembros.length > 3">
                          +{{ grupo.miembros.length - 3 }} más
                        </span>
                        <span class="no-participants" v-else-if="!grupo.miembros || grupo.miembros.length === 0">
                          Sé el primero en unirte
                        </span>
                      </div>
                      <!-- Contador de miembros -->
                      <div class="participants-count">
                        <ion-icon :icon="people" class="count-icon"></ion-icon>
                        <span>{{ grupo.miembros ? grupo.miembros.length : 0 }} miembros</span>
                      </div>
                    </div>
                    
                    <!-- Botón para unirse al grupo -->
                    <ion-button 
                      fill="solid" 
                      size="small" 
                      @click.stop="unirseGrupo(grupo)"
                      :disabled="estaUnidoGrupo(grupo)"
                      class="join-btn"
                      :color="estaUnidoGrupo(grupo) ? 'success' : 'primary'"
                    >
                      <ion-icon 
                        :icon="estaUnidoGrupo(grupo) ? checkmarkCircle : addCircle" 
                        slot="start"
                      ></ion-icon>
                      {{ estaUnidoGrupo(grupo) ? 'Unido' : 'Unirse' }}
                    </ion-button>
                  </div>
                </ion-card-content>
              </ion-card>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
// Importaciones de Vue y Ionic
import { ref, computed, onMounted } from 'vue';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton,
  IonButtons, IonCard, IonCardContent, IonSearchbar, IonSegment,
  IonSegmentButton, IonLabel, IonIcon, IonBadge, IonAvatar, IonButton,
  IonSpinner, toastController
} from '@ionic/vue';
import { 
  school, people, calendar, time, person, location, book,
  searchOutline, refresh, addCircle, checkmarkCircle
} from 'ionicons/icons';

// Importaciones de Firebase
import { collection, onSnapshot, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db, auth } from "@/firebaseDB";
import { onAuthStateChanged } from "firebase/auth";

// VARIABLES REACTIVAS PARA EL ESTADO DE LA APLICACIÓN
const searchQuery = ref('');        // Texto de búsqueda
const filterType = ref('all');      // Tipo de filtro activo
const loading = ref(true);          // Estado de carga
const usuario = ref(null);          // Usuario autenticado

// DATOS REALES DESDE FIREBASE
const tutorias = ref([]);           // Lista de tutorías
const grupos = ref([]);             // Lista de grupos de estudio

// COMPUTED PROPERTIES PARA DATOS FILTRADOS Y CALCULADOS

/**
 * Filtra las tutorías según el texto de búsqueda
 */
const tutoriasFiltradas = computed(() => {
  let filtered = tutorias.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(tutoria => 
      (tutoria.tema && tutoria.tema.toLowerCase().includes(query)) ||
      (tutoria.tutor && tutoria.tutor.toLowerCase().includes(query)) ||
      (tutoria.materia && tutoria.materia.toLowerCase().includes(query)) ||
      (tutoria.descripcion && tutoria.descripcion.toLowerCase().includes(query))
    );
  }

  return filtered;
});

/**
 * Filtra los grupos según el texto de búsqueda
 */
const gruposFiltrados = computed(() => {
  let filtered = grupos.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(grupo => 
      (grupo.nombre && grupo.nombre.toLowerCase().includes(query)) ||
      (grupo.materia && grupo.materia.toLowerCase().includes(query)) ||
      (grupo.descripcion && grupo.descripcion.toLowerCase().includes(query)) ||
      (grupo.ubicacion && grupo.ubicacion.toLowerCase().includes(query))
    );
  }

  return filtered;
});

/**
 * Calcula el número de actividades programadas para hoy
 */
const actividadesHoyCount = computed(() => {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  
  const tutoriasHoy = tutorias.value.filter(tutoria => {
    if (!tutoria.timespacep) return false;
    const fechaTutoria = tutoria.timespacep.toDate ? tutoria.timespacep.toDate() : new Date(tutoria.timespacep);
    return fechaTutoria.toDateString() === hoy.toDateString();
  });

  const gruposHoy = grupos.value.filter(grupo => {
    if (!grupo.timespacep) return false;
    const fechaGrupo = grupo.timespacep.toDate ? grupo.timespacep.toDate() : new Date(grupo.timespacep);
    return fechaGrupo.toDateString() === hoy.toDateString();
  });

  return tutoriasHoy.length + gruposHoy.length;
});

/**
 * Determina si se deben mostrar las tutorías según el filtro activo
 */
const showTutoring = computed(() => 
  filterType.value === 'all' || filterType.value === 'tutoring'
);

/**
 * Determina si se deben mostrar los grupos según el filtro activo
 */
const showStudyGroups = computed(() => 
  filterType.value === 'all' || filterType.value === 'studyGroup'
);

// MÉTODOS DE LA APLICACIÓN

/**
 * Maneja el cambio de filtro en el segment control
 */
const onFilterChange = (ev) => {
  filterType.value = ev.detail.value;
};

/**
 * Maneja la búsqueda en tiempo real
 */
const handleSearch = () => {
  // La búsqueda se maneja automáticamente por los computed properties
};

/**
 * Formatea una fecha timestamp a formato legible
 */
const formatFecha = (timestamp) => {
  if (!timestamp) return "Fecha por definir";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString("es-CO", { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

/**
 * Formatea una hora timestamp a formato legible
 */
const formatHora = (timestamp) => {
  if (!timestamp) return "Hora por definir";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleTimeString("es-CO", { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

/**
 * Verifica si el usuario actual está unido a una tutoría
 */
const estaUnido = (tutoria) => {
  if (!usuario.value || !tutoria.participantes) return false;
  return tutoria.participantes.some(p => p.uid === usuario.value.uid);
};

/**
 * Verifica si el usuario actual está unido a un grupo
 */
const estaUnidoGrupo = (grupo) => {
  if (!usuario.value || !grupo.miembros) return false;
  return grupo.miembros.some(m => m.uid === usuario.value.uid);
};

// MÉTODOS DE FIREBASE

/**
 * Carga las tutorías desde Firebase en tiempo real
 */
const cargarTutorias = () => {
  const refTut = collection(db, "tutoria");
  onSnapshot(refTut, (snapshot) => {
    tutorias.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log('Tutorías cargadas:', tutorias.value.length);
  });
};

/**
 * Carga los grupos de estudio desde Firebase en tiempo real
 */
const cargarGrupos = () => {
  const refGrupo = collection(db, "grupoestudio");
  onSnapshot(refGrupo, (snapshot) => {
    grupos.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log('Grupos cargados:', grupos.value.length);
  });
};

/**
 * Permite al usuario unirse a una tutoría
 */
const unirseTutoria = async (tutoria) => {
  try {
    // Verificar autenticación
    if (!usuario.value) {
      const toast = await toastController.create({
        message: "Debes iniciar sesión para unirte a una tutoría",
        duration: 3000,
        color: 'warning',
        position: 'top'
      });
      await toast.present();
      return;
    }

    // Verificar si ya está unido
    if (estaUnido(tutoria)) {
      const toast = await toastController.create({
        message: "Ya estás unido a esta tutoría",
        duration: 2000,
        color: 'success',
        position: 'top'
      });
      await toast.present();
      return;
    }

    // Actualizar documento en Firebase
    const docRef = doc(db, "tutoria", tutoria.id);
    await updateDoc(docRef, {
      participantes: arrayUnion({
        uid: usuario.value.uid,
        email: usuario.value.email,
        nombre: usuario.value.displayName || usuario.value.email.split('@')[0]
      })
    });

    // Mostrar confirmación
    const toast = await toastController.create({
      message: `¡Te uniste a la tutoría: ${tutoria.tema || 'Tutoría'}!`,
      duration: 3000,
      color: 'success',
      position: 'top'
    });
    await toast.present();

  } catch (error) {
    console.error("Error al unirse a la tutoría:", error);
    const toast = await toastController.create({
      message: "Error al unirse a la tutoría",
      duration: 3000,
      color: 'danger',
      position: 'top'
    });
    await toast.present();
  }
};

/**
 * Permite al usuario unirse a un grupo de estudio
 */
const unirseGrupo = async (grupo) => {
  try {
    // Verificar autenticación
    if (!usuario.value) {
      const toast = await toastController.create({
        message: "Debes iniciar sesión para unirte a un grupo",
        duration: 3000,
        color: 'warning',
        position: 'top'
      });
      await toast.present();
      return;
    }

    // Verificar si ya está unido
    if (estaUnidoGrupo(grupo)) {
      const toast = await toastController.create({
        message: "Ya estás unido a este grupo",
        duration: 2000,
        color: 'success',
        position: 'top'
      });
      await toast.present();
      return;
    }

    // Actualizar documento en Firebase
    const docRef = doc(db, "grupoestudio", grupo.id);
    await updateDoc(docRef, {
      miembros: arrayUnion({
        uid: usuario.value.uid,
        email: usuario.value.email,
        nombre: usuario.value.displayName || usuario.value.email.split('@')[0]
      })
    });

    // Mostrar confirmación
    const toast = await toastController.create({
      message: `¡Te uniste al grupo: ${grupo.nombre || 'Grupo de estudio'}!`,
      duration: 3000,
      color: 'success',
      position: 'top'
    });
    await toast.present();

  } catch (error) {
    console.error("Error al unirse al grupo:", error);
    const toast = await toastController.create({
      message: "Error al unirse al grupo",
      duration: 3000,
      color: 'danger',
      position: 'top'
    });
    await toast.present();
  }
};

/**
 * Navega a los detalles de una tutoría (por implementar)
 */
const verDetallesTutoria = (tutoria) => {
  // Implementar navegación a detalles de tutoría
  console.log('Ver detalles tutoría:', tutoria);
};

/**
 * Navega a los detalles de un grupo (por implementar)
 */
const verDetallesGrupo = (grupo) => {
  // Implementar navegación a detalles de grupo
  console.log('Ver detalles grupo:', grupo);
};

/**
 * Recarga los datos de la aplicación
 */
const refreshData = async () => {
  loading.value = true;
  // Recargar datos
  setTimeout(() => {
    loading.value = false;
    toastController.create({
      message: 'Datos actualizados',
      duration: 1000,
      color: 'success',
      position: 'top'
    }).then(toast => toast.present());
  }, 500);
};

// INICIALIZACIÓN DE LA APLICACIÓN
onMounted(() => {
  // Cargar datos reales de Firebase
  cargarTutorias();
  cargarGrupos();
  
  // Detectar usuario autenticado
  onAuthStateChanged(auth, (user) => {
    usuario.value = user;
    if (user) {
      console.log("Usuario activo:", user.email);
    }
  });

  // Ocultar loading después de cargar
  setTimeout(() => {
    loading.value = false;
  }, 2000);
});
</script>

<style scoped>
/* ESTILOS GENERALES DE LA APLICACIÓN */

/* Toolbar personalizado con gradiente */
.custom-toolbar {
  --background: linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%);
  --color: white;
}

/* Sección de introducción con estadísticas */
.intro-section {
  background: linear-gradient(135deg, #E8F5E8 0%, #F1F8E9 100%);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.intro-content h2 {
  color: #2E7D32;
  font-weight: 700;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.intro-content p {
  color: #616161;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

/* Contenedor de estadísticas */
.stats-container {
  display: flex;
  justify-content: space-around;
  max-width: 400px;
  margin: 0 auto;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-icon {
  font-size: 1.5rem;
  color: #2E7D32;
  margin-bottom: 0.5rem;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2E7D32;
  line-height: 1;
}

.stat-label {
  font-size: 0.8rem;
  color: #616161;
  margin-top: 0.25rem;
}

/* Fila de filtros */
.filter-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.type-segment {
  flex: 1;
}

/* Sección de carga */
.loading-section {
  text-align: center;
  padding: 3rem 1rem;
}

.loading-content p {
  color: #616161;
  margin-top: 1rem;
}

/* Estado vacío */
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #616161;
}

.empty-icon {
  font-size: 3rem;
  color: #E0E0E0;
  margin-bottom: 1rem;
}

/* Grid de actividades */
.activities-grid {
  display: grid;
  gap: 1rem;
}

/* Header de categoría */
.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.category-title {
  display: flex;
  align-items: center;
  color: #424242;
  font-size: 1.2rem;
}

.category-icon {
  margin-right: 0.5rem;
  color: #2E7D32;
}

/* Badge de contador */
.count-badge {
  background: #2E7D32;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  margin-left: 0.5rem;
}

/* Tarjetas de actividades */
.activity-card {
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.activity-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.card-content {
  padding: 1.5rem;
}

/* Header de la tarjeta */
.activity-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.subject-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
  background: #2E7D32;
}

.subject-icon {
  font-size: 0.9rem;
}

/* Título de la actividad */
.activity-title {
  color: #212121;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.4;
}

/* Metadatos de la actividad */
.activity-meta {
  margin-bottom: 1rem;
}

.meta-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
  color: #616161;
}

.meta-icon {
  margin-right: 0.5rem;
  color: #2E7D32;
  font-size: 0.9rem;
  min-width: 16px;
}

/* Descripción de la actividad */
.activity-description {
  color: #616161;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

/* Footer de la actividad */
.activity-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #E0E0E0;
}

.participants-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.participants-avatars {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.small-avatar {
  width: 28px;
  height: 28px;
  border: 2px solid white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}

.more-participants,
.no-participants {
  font-size: 0.8rem;
  color: #616161;
  margin-left: 0.5rem;
}

.participants-count {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #616161;
}

.count-icon {
  font-size: 1rem;
  color: #2E7D32;
}

/* Botón de unirse */
.join-btn {
  --border-radius: 8px;
}

/* RESPONSIVE DESIGN */
@media (max-width: 768px) {
  .activity-footer {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .join-btn {
    width: 100%;
  }
}
</style>