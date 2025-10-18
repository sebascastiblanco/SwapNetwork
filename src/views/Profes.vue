<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="custom-toolbar">
        <ion-buttons slot="start">
          <ion-button fill="clear" @click="volver" color="light">
            <ion-icon :icon="arrowBackOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title class="header-title">Profes</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <!-- Pestañas para cambiar entre Top 5 y Todos los profesores -->
      <div class="tabs">
        <button :class="{ activo: vista === 'top' }" @click="vista = 'top'">
          <ion-icon :icon="trophyOutline"></ion-icon> Top 5
        </button>
        <button :class="{ activo: vista === 'todos' }" @click="vista = 'todos'">
          <ion-icon :icon="peopleOutline"></ion-icon> Todos los Profes
        </button>
      </div>

      <!-- Barra de búsqueda (solo visible en la vista Todos) -->
      <ion-searchbar
        v-if="vista === 'todos'"
        v-model="busqueda"
        placeholder="Buscar por nombre, materia o comentario"
        debounce="300"
      ></ion-searchbar>

      <!-- Sección TOP 5 de profesores -->
      <section v-if="vista === 'top'" class="top-section">
        <div class="top-grid">
          <!-- Tarjeta para cada profesor en el top 5 -->
          <article
            v-for="(p, i) in topProfes"
            :key="p.nombre"
            :class="['top-card', { 'top1': i === 0 }]"
          >
            <div class="top-rank">#{{ i + 1 }}</div>
            <img :src="avatarUrl" alt="avatar" class="top-avatar" />
            <h3 class="top-name">{{ p.nombre }}</h3>

            <!-- Sistema de estrellas para la valoración -->
            <div class="top-stars">
              <ion-icon v-for="n in 5" :key="n" :icon="n <= Math.round(p.promedio) ? star : starOutline" />
              <span class="avg"> {{ p.promedio.toFixed(1) }}/5</span>
            </div>

            <p class="top-porcentaje">{{ p.porcentaje }}% de recomendación</p>
            <p class="top-comentario">"{{ p.comentario }}"</p>
          </article>
        </div>
      </section>

      <!-- Sección TODOS los profesores -->
      <section v-if="vista === 'todos'">
        <!-- Lista de profesores filtrados -->
        <div v-if="profesFiltrados.length" class="lista-kahoot">
          <!-- Tarjeta individual para cada profesor -->
          <div v-for="p in profesFiltrados" :key="p.nombre" class="profe-card">
            <div class="row">
              <img :src="avatarUrl" alt="avatar" class="row-avatar" />
              <div class="row-main">
                <div class="row-top">
                  <div class="row-name">{{ p.nombre }}</div>
                  <!-- Sistema de estrellas -->
                  <div class="row-stars">
                    <ion-icon v-for="n in 5" :key="n" :icon="n <= Math.round(p.promedio) ? star : starOutline" />
                    <span class="row-avg">{{ p.promedio.toFixed(1) }}/5</span>
                  </div>
                </div>
                <div class="row-bottom">
                  <div class="row-porcentaje">{{ p.porcentaje }}% • {{ p.count }} reseña<span v-if="p.count!==1">s</span></div>
                  <div class="row-materia" v-if="p.materia">Materia: {{ p.materia }}</div>
                  <div class="row-comentario">"{{ p.comentario }}"</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mensaje cuando no hay resultados -->
        <p v-else class="sin-resultados">No se encontraron profesores.</p>
      </section>

    </ion-content>
  </ion-page>
</template>

<script setup>
// Importaciones de Ionic Vue
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
  IonContent,
  IonSearchbar
} from '@ionic/vue'

// Importaciones de iconos
import { arrowBackOutline, star, starOutline, trophyOutline, peopleOutline } from 'ionicons/icons'

// Importaciones de Vue y Firebase
import { useRouter } from 'vue-router'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebaseDB'
import { ref, computed, onMounted } from 'vue'

// Router para navegación
const router = useRouter()

// Función para volver a la página anterior
function volver() { router.push('/zonaswap') }

// Variables reactivas
const vista = ref('top') // Controla qué vista se muestra (top/todos)
const busqueda = ref('') // Texto de búsqueda
const profes = ref([]) // Lista de todos los profesores
const avatarUrl = 'https://cdn-icons-png.flaticon.com/128/3899/3899618.png' // Avatar por defecto

// Cargar datos cuando el componente se monta
onMounted(async () => {
  try {
    // Obtener todas las calificaciones de Firebase
    const snap = await getDocs(collection(db, 'calificaciones'))
    const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    const map = {} // Objeto para agrupar datos por profesor

    // Procesar cada documento de calificación
    docs.forEach(item => {
      const nombre = (item.docente || '').trim()
      if (!nombre) return
      
      // Inicializar entrada para profesor si no existe
      if (!map[nombre]) map[nombre] = { 
        nombre, 
        valores: [], 
        comentarios: [], 
        ultimaMateria: '', 
        ultimaFecha: null 
      }

      // Agregar valoración numérica
      const val = Number(item.valoracion || item.valoracion === 0 ? item.valoracion : NaN)
      if (!isNaN(val)) map[nombre].valores.push(val)
      
      // Agregar comentario
      if (item.comentario) map[nombre].comentarios.push({ 
        texto: item.comentario, 
        fecha: item.fecha_comentario || null 
      })
      
      // Guardar materia más reciente
      if (item.materia) map[nombre].ultimaMateria = item.materia
      
      // Actualizar fecha más reciente
      if (item.fecha_comentario) {
        const f = new Date(item.fecha_comentario)
        if (!map[nombre].ultimaFecha || f > map[nombre].ultimaFecha) map[nombre].ultimaFecha = f
      }
    })

    // Transformar datos agrupados en array de profesores
    profes.value = Object.values(map).map(p => {
      const count = p.valores.length
      const promedio = count ? p.valores.reduce((a,b)=>a+b,0)/count : 0
      const porcentaje = Math.round((promedio / 5) * 100)
      
      // Determinar comentario más reciente
      let comentario = 'Sin comentarios'
      if (p.comentarios.length) {
        const withDates = p.comentarios.filter(c => c.fecha)
        if (withDates.length) {
          withDates.sort((a,b)=> new Date(b.fecha) - new Date(a.fecha))
          comentario = withDates[0].texto
        } else {
          comentario = p.comentarios[p.comentarios.length - 1].texto
        }
      }
      
      return { 
        nombre: p.nombre, 
        promedio, 
        porcentaje, 
        count, 
        comentario, 
        materia: p.ultimaMateria || '' 
      }
    })

    // Ordenar profesores alfabéticamente
    profes.value.sort((a,b)=> a.nombre.localeCompare(b.nombre, undefined, { sensitivity: 'base' }))
  } catch (err) {
    console.error('Error cargando calificaciones:', err)
    profes.value = []
  }
})

// Computed: Filtrar profesores según búsqueda
const profesFiltrados = computed(() => {
  const q = (busqueda.value || '').toLowerCase().trim()
  if (!q) return profes.value
  
  return profes.value.filter(p =>
    p.nombre.toLowerCase().includes(q) ||
    (p.materia && p.materia.toLowerCase().includes(q)) ||
    (p.comentario && p.comentario.toLowerCase().includes(q))
  )
})

// Computed: Obtener top 5 profesores por promedio
const topProfes = computed(() => {
  return [...profes.value].sort((a,b)=> b.promedio - a.promedio).slice(0,5)
})
</script>

<style scoped>
/* Estilos para las pestañas de navegación */
.tabs {
  display:flex;
  justify-content:center;
  gap:10px;
  margin-bottom:10px;
}
.tabs button {
  background:#e8f5e9;
  border:2px solid #4caf50;
  color:#1b5e20;
  padding:8px 14px;
  border-radius:12px;
  font-weight:600;
  cursor:pointer;
  display:flex;
  align-items:center;
  gap:6px;
}
.tabs button.activo {
  background:#4caf50;
  color:white;
  box-shadow:0 4px 10px rgba(76,175,80,0.3);
}

/* Estilos para la sección TOP 5 */
.top-section { margin-top:10px; }
.top-grid {
  display:grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap:14px;
}
.top-card {
  background:#ffffff;
  border:2px solid #c8e6c9;
  border-radius:16px;
  padding:16px;
  text-align:center;
  box-shadow:0 6px 16px rgba(16,24,40,0.08);
  min-height:300px;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  position:relative;
  transition:transform 0.2s ease, box-shadow 0.2s ease;
}
.top-card:hover { transform:scale(1.03); box-shadow:0 6px 20px rgba(76,175,80,0.25); }
.top1 {
  background:linear-gradient(180deg, #4caf50, #2e7d32);
  border:2px solid gold;
  color:white;
  box-shadow:0 8px 20px rgba(76,175,80,0.45);
}
.top1 .top-name, .top1 .top-porcentaje, .top1 .avg, .top1 .top-comentario {
  color:white !important;
}
.top-rank {
  position:absolute;
  top:10px;
  left:10px;
  background:#4caf50;
  color:#fff;
  padding:4px 8px;
  border-radius:8px;
  font-weight:700;
  font-size:0.85rem;
}
.top1 .top-rank { background:gold; color:#2e7d32; }
.top-avatar {
  width:80px;
  height:80px;
  border-radius:50%;
  object-fit:cover;
  margin:12px auto 8px;
  border:3px solid #4caf50;
}
.top1 .top-avatar { border:3px solid gold; }
.top-name { color:#1b5e20; font-weight:700; margin:4px 0; font-size:1.1rem; }
.top-stars { display:flex; justify-content:center; gap:5px; color:#f6c34a; align-items:center; }
.top-stars .avg { margin-left:6px; color:#2e7d32; font-weight:600; font-size:0.95rem; }
.top-porcentaje { color:#1b5e20; font-weight:600; margin-top:6px; }
.top-comentario { color:#374151; font-style:italic; margin-top:8px; font-size:0.9rem; }

/* Estilos para la sección TODOS los profesores */
.lista-kahoot { margin-top:12px; display:flex; flex-direction:column; gap:10px; }
.profe-card {
  background:#ffffff;
  border:1.8px solid #a5d6a7;
  border-radius:14px;
  box-shadow:0 4px 10px rgba(16,24,40,0.05);
  padding:10px;
}
.row {
  display:flex;
  gap:12px;
  align-items:flex-start;
}
.row-avatar { width:48px; height:48px; border-radius:50%; object-fit:cover; border:2px solid #4caf50; }
.row-main { flex:1; display:flex; flex-direction:column; gap:6px; }
.row-top { display:flex; justify-content:space-between; align-items:center; gap:10px; }
.row-name { font-weight:700; color:#1b5e20; }
.row-stars { display:flex; align-items:center; gap:4px; color:#f6c34a; }
.row-avg { margin-left:4px; color:#2e7d32; font-weight:600; font-size:0.9rem; }
.row-bottom { display:flex; flex-direction:column; gap:2px; color:#374151; font-size:0.9rem; }
.row-porcentaje { color:#1b5e20; font-weight:600; }
.row-materia { font-style:italic; color:#2e7d32; }
.row-comentario { color:#374151; font-style:italic; }

/* Estilo para mensaje sin resultados */
.sin-resultados { text-align:center; color:#6b7280; margin-top:14px; }

/* Estilos para el toolbar personalizado con color #1a7431 */
.custom-toolbar {
  --background: #1a7431;
  --color: white;
}

.header-title {
  color: white;
  font-weight: 700;
  letter-spacing: 0.5px;
}

/* Estilos específicos para el ícono de volver */
ion-button[fill="clear"] ion-icon {
  color: white !important;
  font-size: 1.5rem;
}

ion-button[color="light"] ion-icon {
  color: white !important;
}

ion-button {
  --color: white;
  --ionicon-stroke-width: 32px;
}

.custom-toolbar ion-button {
  --color: white;
}

/* Responsive para pantallas pequeñas */
@media (max-width:520px) {
  .top-grid { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }
}
</style>