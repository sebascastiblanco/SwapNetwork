<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="custom-toolbar">
        <div class="logo-container">
          <ion-icon :icon="school" class="logo-icon"></ion-icon>
          <ion-title>SwapNetwork</ion-title>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding custom-content">
      <!-- Contenedor principal centrado -->
      <div class="main-container">
        <!-- Sección de bienvenida -->
        <div class="welcome-section">
          <div class="welcome-icon-container">
            <ion-icon :icon="library" class="welcome-icon"></ion-icon>
          </div>
          <h2>Bienvenida a SwapNetwork</h2>
          <p>Selecciona una opción para continuar con tu experiencia educativa</p>
        </div>

        <!-- Botones del menú en disposición horizontal -->
        <div class="menu-grid">
          <!-- Conecta y Crea - PRIMERA POSICIÓN -->
          <ion-card class="menu-card connect-card" button @click="$router.push('/conecta')">
            <ion-card-content class="card-content">
              <div class="card-icon-container">
                <ion-icon :icon="peopleCircle" class="card-icon"></ion-icon>
              </div>
              <div class="card-text">
                <h3>Conecta y Crea</h3>
                <p>Establece conexiones y desarrolla proyectos colaborativos</p>
              </div>
            </ion-card-content>
          </ion-card>

          <!-- Zona Swap - SEGUNDA POSICIÓN (CENTRO) -->
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

          <!-- Explora - TERCERA POSICIÓN -->
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

        <!-- Footer institucional -->
        <div class="institutional-footer">
          <p>Plataforma educativa oficial de intercambio de conocimientos</p>
          <p class="institutional-logo">SwapNetwork Educación</p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
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
import { 
  swapHorizontal, 
  peopleCircle, 
  compass, 
  school,
  library
} from 'ionicons/icons';

</script>

<style scoped>
/* Variables de colores - Verde principal */
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

/* Toolbar personalizado - Verde sólido */
.custom-toolbar {
  --background: var(--primary-green);
  --color: var(--white);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.logo-icon {
  font-size: 24px;
  margin-right: 12px;
  color: var(--white);
}

/* Contenido personalizado */
.custom-content {
  --background: var(--light-gray);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Contenedor principal centrado */
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
  padding: 1rem 0;
}

/* Sección de bienvenida */
.welcome-section {
  text-align: center;
  margin: 0 0 3rem 0;
  padding: 0 1rem;
  max-width: 600px;
  width: 100%;
}

.welcome-icon-container {
  width: 80px;
  height: 80px;
  background: var(--primary-green);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  box-shadow: 0 4px 12px rgba(46, 125, 50, 0.2);
}

.welcome-icon {
  font-size: 2.5rem;
  color: var(--white);
}

.welcome-section h2 {
  color: var(--primary-green);
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.welcome-section p {
  color: var(--text-gray);
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
}

/* Grid de botones - TRES COLUMNAS HORIZONTALES */
.menu-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
  max-width: 900px;
  width: 100%;
  padding: 0 1rem;
  justify-content: center;
  align-items: start;
}

.menu-card {
  margin: 0;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid var(--medium-gray);
  background: var(--white);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.menu-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  border-color: var(--primary-green);
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1.5rem;
  text-align: center;
  flex: 1;
  justify-content: space-between;
}

.card-icon-container {
  width: 70px;
  height: 70px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  background: var(--primary-green);
}

.card-icon {
  font-size: 1.8rem;
  color: var(--white);
}

.card-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-text h3 {
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: var(--dark-gray);
  line-height: 1.3;
}

.card-text p {
  color: var(--text-gray);
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
}

/* Variaciones de color para las tarjetas */
.connect-card .card-icon-container {
  background: var(--accent-green);
}

.swap-card .card-icon-container {
  background: var(--primary-green);
}

.explore-card .card-icon-container {
  background: var(--light-green);
}

/* Footer institucional */
.institutional-footer {
  text-align: center;
  padding: 2rem 1rem 1rem;
  margin-top: auto;
  max-width: 600px;
  width: 100%;
  border-top: 1px solid var(--medium-gray);
}

.institutional-footer p {
  color: var(--text-gray);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.institutional-logo {
  color: var(--primary-green);
  font-weight: 600;
  font-size: 1rem;
  margin-top: 0.5rem;
}

/* Responsive */
@media (max-width: 768px) {
  .menu-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
    max-width: 400px;
  }
  
  .welcome-section {
    margin: 0 0 2rem 0;
  }
  
  .card-content {
    padding: 1.5rem 1rem;
  }
  
  .main-container {
    padding: 0.5rem 0;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .menu-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    max-width: 800px;
  }
  
  .card-content {
    padding: 1.8rem 1.2rem;
  }
  
  .card-icon-container {
    width: 60px;
    height: 60px;
  }
  
  .card-icon {
    font-size: 1.6rem;
  }
}
</style>