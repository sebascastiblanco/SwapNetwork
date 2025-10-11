<template>
  <!-- 
    ===============================================
    ESTRUCTURA PRINCIPAL DE LA PÁGINA
    ===============================================
    IonPage: Contenedor principal de la página Ionic
    IonHeader: Cabecera de la aplicación
    IonContent: Área de contenido principal
  -->
  <ion-page>
    
    <!-- 
      CABECERA DE LA APLICACIÓN 
      Contiene el logo y título de la plataforma
    -->
    <ion-header>
      <ion-toolbar class="custom-toolbar">
        <div class="logo-container">
          <!-- Icono de la escuela -->
          <ion-icon :icon="school" class="logo-icon"></ion-icon>
          <!-- Título de la plataforma -->
          <ion-title>SwapNetwork</ion-title>
        </div>
      </ion-toolbar>
    </ion-header>

    <!-- 
      CONTENIDO PRINCIPAL
      Aquí va todo el contenido de la página principal
    -->
    <ion-content class="ion-padding custom-content">
      
      <!-- 
        CONTENEDOR PRINCIPAL CENTRADO
        Este div centra todo el contenido vertical y horizontalmente
      -->
      <div class="main-container">
        
        <!-- 
          SECCIÓN DE BIENVENIDA
          Muestra el mensaje de bienvenida a los usuarios
        -->
        <div class="welcome-section">
          <h2>Bienvenida a SwapNetwork</h2>
          <p>Selecciona una opción para continuar con tu experiencia educativa</p>
        </div>

        <!-- 
          GRID DE TARJETAS/MODULOS PRINCIPALES
          Contiene los 3 módulos principales de la aplicación
        -->
        <div class="menu-grid">
          
          <!-- 
            TARJETA 1: CONECTA Y CREA
            Módulo para conexiones y proyectos colaborativos
          -->
          <ion-card class="menu-card connect-card" button @click="$router.push('/conecta')">
            <ion-card-content class="card-content">
              <!-- Contenedor del icono -->
              <div class="card-icon-container">
                <ion-icon :icon="peopleCircle" class="card-icon"></ion-icon>
              </div>
              <!-- Texto de la tarjeta -->
              <div class="card-text">
                <h3>Conecta y Crea</h3>
                <p>Establece conexiones y desarrolla proyectos colaborativos</p>
              </div>
            </ion-card-content>
          </ion-card>

          <!-- 
            TARJETA 2: ZONA SWAP  
            Módulo principal de intercambio de conocimientos
          -->
          <ion-card class="menu-card swap-card" button @click="$router.push('/zonaswap')">
            <ion-card-content class="card-content">
              <div class="card-icon-container">
                <ion-icon :icon="swapHorizontal" class="card-icon"></ion-icon>
              </div>
              <div class="card-text">
                <h3>Zona Swap</h3>
                <p>Intercambia conocimientos y recursos educativos con otros usuarios</p>
              </div>
            </ion-card-content>
          </ion-card>

          <!-- 
            TARJETA 3: EXPLORA
            Módulo para descubrir contenidos y oportunidades
          -->
          <ion-card class="menu-card explore-card" button @click="$router.push('/explora')">
            <ion-card-content class="card-content">
              <div class="card-icon-container">
                <ion-icon :icon="compass" class="card-icon"></ion-icon>
              </div>
              <div class="card-text">
                <h3>Explora</h3>
                <p>Descubre nuevos contenidos y oportunidades de aprendizaje</p>
              </div>
            </ion-card-content>
          </ion-card>
        </div>

        <!-- 
          FOOTER INSTITUCIONAL
          Información oficial y marca de la plataforma
        -->
        <div class="institutional-footer">
          <p>Plataforma educativa oficial de intercambio de conocimientos</p>
          <p class="institutional-logo">SwapNetwork Educación</p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
/*
===============================================
IMPORTACIONES DE COMPONENTES IONIC
===============================================
Estas son las dependencias necesarias para que funcione la página
*/

// Componentes de Ionic Vue que usamos en esta página
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonCard, 
  IonCardContent, 
  IonIcon 
} from '@ionic/vue';

// Iconos de Ionicons que utilizamos en la interfaz
import { 
  swapHorizontal, 
  peopleCircle, 
  compass, 
  school,
  library
} from 'ionicons/icons';

/*
===============================================
EXPLICACIÓN DE LAS RUTAS:
===============================================
- '/conecta': Página de conexiones y proyectos colaborativos
- '/zonaswap': Página principal de intercambio de conocimientos  
- '/explora': Página para descubrir nuevos contenidos

Para agregar nuevas rutas, debes:
1. Crear el componente en /src/views/
2. Agregar la ruta en /src/router/index.js
3. Actualizar el @click aquí con la nueva ruta
*/
</script>

<style scoped>
/* 
===============================================
VARIABLES GLOBALES Y CONFIGURACIÓN
===============================================
Estas variables definen la paleta de colores y estilos base
*/

:root {
  /* PALETA DE COLORES VERDES */
  --primary-green: #1a7431;        /* Verde principal para elementos importantes */
  --light-green: #2e8b57;          /* Verde claro para hover y efectos */
  --dark-green: #145c2c;           /* Verde oscuro para textos destacados */
  --accent-green: #34a853;         /* Verde de acento para elementos especiales */
  
  /* COLORES NEUTROS */
  --white: #FFFFFF;                /* Blanco puro para textos sobre verde */
  --light-gray: #f8faf9;           /* Fondo principal con tono verdoso sutil */
  --medium-gray: #e8f5e8;          /* Bordes y separadores con tono verde */
  --dark-gray: #2d3748;            /* Texto principal oscuro */
  --text-gray: #4a5568;            /* Texto secundario gris */
  
  /* SOMBRAS CON TONO VERDE */
  --shadow-light: rgba(26, 116, 49, 0.15);    /* Sombra suave para tarjetas */
  --shadow-medium: rgba(26, 116, 49, 0.25);   /* Sombra media para hover */
  --shadow-strong: rgba(26, 116, 49, 0.3);    /* Sombra fuerte para cabecera */
}

/* 
===============================================
CABECERA DE LA APLICACIÓN
===============================================
Estilos para la barra superior con logo y título
*/
.custom-toolbar {
  --background: #1a7431;           /* Color de fondo verde */
  --color: white;                  /* Color del texto blanco */
  background: #1a7431;             /* Backup del color de fondo */
  box-shadow: 0 2px 12px var(--shadow-strong); /* Sombra verde */
  padding: 0 16px;                 /* Espaciado interno horizontal */
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 8px 0;                  /* Espaciado vertical interno */
}

.logo-icon {
  font-size: 24px;
  margin-right: 12px;
  color: white;
}

/* 
===============================================
CONTENIDO PRINCIPAL
===============================================
Estilos para el área de contenido scrollable
*/
.custom-content {
  --background: #f8faf9;           /* Color de fondo de la página */
  background: #f8faf9;             /* Backup del color de fondo */
  display: flex;
  flex-direction: column;
  min-height: 100vh;               /* Altura mínima de toda la pantalla */
}

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;                         /* Ocupa todo el espacio disponible */
  width: 100%;
  padding: 2rem 0;                 /* Espaciado vertical GENEROSO */
  min-height: calc(100vh - 120px); /* Altura mínima menos la cabecera */
}

/* 
===============================================
SECCIÓN DE BIENVENIDA
===============================================
Estilos para el texto de bienvenida bajo la cabecera
*/
.welcome-section {
  text-align: center;
  margin: 0 0 3rem 0;              /* Margen inferior generoso */
  padding: 0 2rem;                 /* Espaciado horizontal INTERNO */
  max-width: 600px;
  width: 100%;
}

.welcome-section h2 {
  color: #1a7431;                  /* Verde para el título */
  font-weight: 600;
  margin-bottom: 1rem;             /* Espacio entre título y párrafo */
  font-size: 1.5rem;
}

.welcome-section p {
  color: #4a5568;                  /* Gris para texto descriptivo */
  font-size: 1rem;
  line-height: 1.6;                /* Interlineado cómodo para lectura */
  margin: 0;
}

/* 
===============================================
GRID DE TARJETAS/MÓDULOS
===============================================
Estilos para las 3 tarjetas principales de la aplicación
*/
.menu-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columnas en desktop */
  gap: 2rem;                         /* Espacio ENTRE tarjetas aumentado */
  margin-bottom: 3rem;               /* Margen inferior generoso */
  max-width: 1100px;                 /* Ancho máximo del grid */
  width: 100%;
  padding: 0 2rem;                   /* Espaciado horizontal INTERNO */
}

/* 
  TARJETA BASE - Estilos comunes para todas las tarjetas
  Cada tarjeta representa un módulo de la aplicación
*/
.menu-card {
  margin: 0;
  border-radius: 16px;              /* Bordes redondeados modernos */
  box-shadow: 0 4px 12px var(--shadow-light); /* Sombra suave verde */
  transition: all 0.3s ease;        /* Transición suave para hover */
  border: 1px solid var(--medium-gray); /* Borde sutil verde claro */
  background: white;
  height: 280px;                    /* Altura FIJA para consistencia */
  display: flex;
  flex-direction: column;
  min-height: 280px;                /* Altura mínima garantizada */
}

/* Efecto hover - cuando el usuario pasa el mouse sobre la tarjeta */
.menu-card:hover {
  transform: translateY(-5px);      /* Efecto de levitación */
  box-shadow: 0 8px 20px var(--shadow-medium); /* Sombra más pronunciada */
  border-color: var(--light-green); /* Borde verde en hover */
}

/* 
  CONTENIDO INTERNO DE LAS TARJETAS
  Organización vertical: icono + título + descripción
*/
.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem 2rem;             /* Espaciado interno GENEROSO */
  text-align: center;
  flex: 1;
  justify-content: center;          /* Centrado vertical del contenido */
  height: 100%;
}

/* 
  CONTENEDOR DE ICONOS
  Círculo verde que contiene el icono de cada módulo
*/
.card-icon-container {
  width: 100px;                     /* Tamaño del contenedor del icono */
  height: 100px;
  border-radius: 16px;              /* Bordes redondeados */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;              /* Espacio debajo del icono */
  background: #1a7431;              /* Fondo verde */
  transition: all 0.3s ease;        /* Transición para efectos hover */
}

/* Efecto hover en el contenedor del icono */
.card-icon-container:hover {
  transform: scale(1.05);           /* Ligero agrandamiento al hover */
}

/* Iconos dentro de los contenedores */
.card-icon {
  font-size: 3rem;                  /* Tamaño grande para buena visibilidad */
  color: white;
}

/* 
  ÁREA DE TEXTO DE LAS TARJETAS
  Contiene el título y descripción de cada módulo
*/
.card-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}

.card-text h3 {
  font-weight: 600;
  margin-bottom: 1rem;              /* Espacio entre título y descripción */
  font-size: 1.4rem;                /* Tamaño de fuente legible */
  color: var(--dark-gray);          /* Color oscuro para buen contraste */
  line-height: 1.3;
}

.card-text p {
  color: var(--text-gray);          /* Gris para texto descriptivo */
  font-size: 1rem;                  /* Tamaño comfortable para lectura */
  line-height: 1.5;                 /* Interlineado adecuado */
  margin: 0;
  padding: 0 0.5rem;                /* Pequeño padding horizontal para texto */
}

/* 
===============================================
VARIACIONES DE COLOR POR TARJETA
===============================================
Diferentes tonos de verde para distinguir cada módulo
*/

/* Tarjeta Conecta y Crea - Verde vibrante */
.connect-card .card-icon-container {
  background: #34a853;
}

/* Tarjeta Zona Swap - Verde principal (más destacado) */
.swap-card .card-icon-container {
  background: #1a7431;
}

/* Tarjeta Explora - Verde intermedio */
.explore-card .card-icon-container {
  background: #2e8b57;
}

/* 
===============================================
FOOTER INSTITUCIONAL
===============================================
Estilos para el pie de página con información oficial
*/
.institutional-footer {
  text-align: center;
  padding: 2.5rem 2rem 1.5rem;      /* Espaciado interno generoso */
  margin-top: auto;                 /* Empuja el footer hacia abajo */
  max-width: 600px;
  width: 100%;
  border-top: 1px solid var(--medium-gray); /* Línea separadora sutil */
}

.institutional-footer p {
  color: var(--text-gray);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.institutional-logo {
  color: var(--primary-green);      /* Verde para el nombre de la plataforma */
  font-weight: 600;
  font-size: 1rem;
  margin-top: 0.5rem;
}

/* 
===============================================
DISEÑO RESPONSIVE - MOBILE FIRST
===============================================
Ajustes para diferentes tamaños de pantalla
*/

/* 
  MÓVILES - Pantallas menores a 768px
  Una sola columna para mejor usabilidad táctil
*/
@media (max-width: 768px) {
  .menu-grid {
    grid-template-columns: 1fr;     /* Una sola columna */
    gap: 1.5rem;
    max-width: 500px;
    padding: 0 1.5rem;              /* Espaciado lateral reducido */
  }
  
  .menu-card {
    height: 250px;                  /* Altura ligeramente menor en móvil */
    min-height: 250px;
  }
  
  .welcome-section {
    margin: 0 0 2rem 0;
    padding: 0 1.5rem;
  }
  
  .card-content {
    padding: 2rem 1.5rem;           /* Espaciado interno ajustado */
  }
  
  .card-icon-container {
    width: 90px;
    height: 90px;
    margin-bottom: 1.5rem;
  }
  
  .card-icon {
    font-size: 2.5rem;
  }
  
  .main-container {
    padding: 1.5rem 0;              /* Espaciado vertical ajustado */
  }
  
  .institutional-footer {
    padding: 2rem 1.5rem 1rem;
  }
}

/* 
  TABLETS - Pantallas entre 769px y 1024px
  Tres columnas pero con espaciado ajustado
*/
@media (min-width: 769px) and (max-width: 1024px) {
  .menu-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    max-width: 900px;
    padding: 0 1.5rem;
  }
  
  .menu-card {
    height: 260px;
    min-height: 260px;
  }
  
  .card-content {
    padding: 2.2rem 1.5rem;
  }
  
  .card-icon-container {
    width: 90px;
    height: 90px;
  }
  
  .card-icon {
    font-size: 2.8rem;
  }
}

/* 
  DESKTOP GRANDE - Pantallas mayores a 1200px
  Más espacio para aprovechar pantallas grandes
*/
@media (min-width: 1200px) {
  .menu-grid {
    max-width: 1100px;
    gap: 2.5rem;                    /* Más espacio entre tarjetas */
  }
  
  .menu-card {
    height: 300px;                  /* Tarjetas aún más grandes */
    min-height: 300px;
  }
  
  .card-content {
    padding: 3rem 2rem;             /* Más espacio interno */
  }
  
  .card-icon-container {
    width: 110px;
    height: 110px;
    margin-bottom: 2.5rem;
  }
  
  .card-icon {
    font-size: 3.5rem;              /* Iconos más grandes */
  }
  
  .card-text h3 {
    font-size: 1.5rem;              /* Textos más grandes */
  }
  
  .card-text p {
    font-size: 1.1rem;
  }
}

/* 
  ACCESIBILIDAD - Soporte para preferencias de movimiento reducido
  Para usuarios que prefieren menos animaciones
*/
@media (prefers-reduced-motion: reduce) {
  .menu-card,
  .card-icon-container {
    transition: none;               /* Elimina transiciones */
  }
  
  .menu-card:hover {
    transform: none;                /* Elimina efectos de hover */
  }
}

/* 
  ENFOQUE VISIBLE - Mejora accesibilidad para navegación con teclado
  Cuando un usuario navega con TAB, se ve claramente qué elemento está seleccionado
*/
.menu-card:focus {
  outline: 2px solid var(--accent-green); /* Borde verde visible */
  outline-offset: 2px;              /* Separación del borde */
}
</style>