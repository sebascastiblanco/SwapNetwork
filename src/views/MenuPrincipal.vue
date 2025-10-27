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

    <ion-content class="ion-padding custom-content" scroll-y="true">
      <div class="main-container">
        <!-- Sección de bienvenida -->
        <div class="welcome-section">
          <h2>Bienvenida a SwapNetwork</h2>
          <p>Selecciona una opción para continuar con tu experiencia educativa</p>
        </div>

        <!-- Botones del menú -->
        <div class="menu-grid">
          <!-- Conecta y Crea -->
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

          <!-- Zona Swap -->
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

          <!-- Explora -->
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

        <!-- FOOTER COMPLETO con copyright institucional -->
        <div class="institutional-footer">
          <div class="footer-content">
            <div class="footer-text">
              <p class="footer-description"></p>
              <p class="institutional-logo"></p>
              <p class="university-text"></p>
              
              <!-- TEXTO DE COPYRIGHT EN NEGRO SÓLIDO -->
              <p class="copyright-text">©2025 Universidad de Cundinamarca. Todos los derechos reservados.</p>
            </div>
            <div class="university-logo-container">
              <div class="university-logo">
                <div class="logo-symbol"></div>
                <div class="logo-text">
                  <span class="logo-title"></span>
                  <span class="logo-subtitle"></span>
                </div>
              </div>
            </div>
          </div>
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
  school
} from 'ionicons/icons';
</script>

<style scoped>
/*VARIABLES DE COLORES VERDES*/
:root {
  --primary-green: #1a7431;
  --light-green: #2e8b57;
  --dark-green: #145c2c;
  --accent-green: #34a853;
  --white: #FFFFFF;
  --light-gray: #f8faf9;
  --medium-gray: #e8f5e8;
  --dark-gray: #2d3748;
  --text-gray: #4a5568;
  --text-black: #000000;
  --shadow-light: rgba(26, 116, 49, 0.15);
  --shadow-medium: rgba(26, 116, 49, 0.25);
  --shadow-strong: rgba(26, 116, 49, 0.3);
}

/* 
   CABECERA
   */
.custom-toolbar {
  --background: #1a7431;
  --color: white;
  background: #1a7431;
  box-shadow: 0 2px 12px var(--shadow-strong);
  position: relative;
  z-index: 1000;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.logo-icon {
  font-size: 24px;
  margin-right: 5px;
  margin-left: 40px; /* Esto empuja el icono a la derecha */
  color: white;
}

/* CONTENIDO PRINCIPAL */
.custom-content {
  --background: #f8faf9;
  background: #f8faf9;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-y: auto;
  position: relative;
}

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  width: 100%;
  padding: 2rem 0 3rem 0;
  min-height: auto;
}

/* SECCIÓN DE BIENVENIDA */
.welcome-section {
  text-align: center;
  margin: 0 0 3rem 0;
  padding: 0 2rem;
  max-width: 600px;
  width: 100%;
}

.welcome-section h2 {
  color: #1a7431;
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.welcome-section p {
  color: #4a5568;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
}

/*TARJETAS DEL MENÚ */
.menu-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
  max-width: 1100px;
  width: 100%;
  padding: 0 2rem;
}

.menu-card {
  margin: 0;
  border-radius: 16px;
  box-shadow: 0 4px 12px var(--shadow-light);
  transition: all 0.3s ease;
  border: 1px solid var(--medium-gray);
  background: rgb(208, 231, 205);
  height: 380px;
  min-height: 380px;
  display: flex;
  flex-direction: column;
  overflow: visible;
}

.menu-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px var(--shadow-medium);
  border-color: var(--light-green);
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem 2rem;
  text-align: center;
  flex: 1;
  justify-content: flex-start;
  height: 100%;
  gap: 1.5rem;
}

.card-icon-container {
  width: 100px;
  height: 100px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a7431;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.card-icon-container:hover {
  transform: scale(1.05);
}

.card-icon {
  font-size: 3rem;
  color: white;
}

.card-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 150px;
  gap: 1rem;
}

.card-text h3 {
  font-weight: 600;
  margin: 0;
  font-size: 1.4rem;
  color: var(--dark-gray);
  line-height: 1.3;
}

.card-text p {
  color: var(--text-gray);
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
  padding: 0;
}

/* VARIACIONES DE VERDE*/
.connect-card .card-icon-container {
  background: #34a853;
}

.swap-card .card-icon-container {
  background: #1a7431;
}

.explore-card .card-icon-container {
  background: #2e8b57;
}

/*FOOTER COMPLETO CON COPYRIGHT INSTITUCIONAL*/
.institutional-footer {
  padding: 2rem 2rem 1rem 2rem;
  margin-top: auto;
  max-width: 800px;
  width: 100%;
  border-top: 1px solid var(--medium-gray);
  background: var(--white);
  border-radius: 12px 12px 0 0;
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  text-align: center;
}

.footer-text {
  flex: 1;
  text-align: center;
}

/* TEXTOS DEL FOOTER*/
.footer-description {
  color: #000000 !important;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  line-height: 1.4;
  opacity: 1 !important;
}

.institutional-logo {
  color: #000000 !important;
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  opacity: 1 !important;
}

.university-text {
  color: #000000 !important;
  font-weight: 500;
  font-size: 0.9rem;
  font-style: italic;
  margin-bottom: 0.5rem;
  opacity: 1 !important;
}

/*
   TEXTO DE COPYRIGHT */
.copyright-text {
  color: #000000 !important;
  font-size: 0.8rem;
  font-weight: 400;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--medium-gray);
  font-style: normal;
  opacity: 1 !important;
  text-align: center; 
  display: block;
  width: 100%;
  margin-left: 120px;
  margin-right: 120px;
}

/*DISEÑO RESPONSIVE */

/* MÓVILES */
@media (max-width: 768px) {
  .menu-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    max-width: 500px;
    padding: 0 1.5rem;
  }
  
  .menu-card {
    height: 320px;
    min-height: 320px;
  }
  
  .welcome-section {
    margin: 0 0 2rem 0;
    padding: 0 1.5rem;
  }
  
  .card-content {
    padding: 2rem 1.5rem;
    gap: 1.2rem;
  }
  
  .card-icon-container {
    width: 90px;
    height: 90px;
  }
  
  .card-icon {
    font-size: 2.5rem;
  }
  
  .card-text {
    min-height: 130px;
    gap: 0.8rem;
  }
  
  .main-container {
    padding: 1.5rem 0 2.5rem 0;
  }
  
  .institutional-footer {
    padding: 1.5rem 1.5rem 0.5rem 1.5rem;
    max-width: 500px;
  }
  
  .footer-content {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
  
  .footer-text {
    text-align: center;
  }
  
  /* TEXTOS EN NEGRO PARA MÓVIL */
  .footer-description,
  .institutional-logo,
  .university-text,
  .copyright-text {
    color: #000000 !important;
    opacity: 1 !important;
    text-align: center;
  }
  
  .copyright-text {
    font-size: 0.75rem;
    margin-top: 0.8rem;
    padding-top: 0.8rem;
  }
  
  .university-logo {
    padding: 0.6rem 1rem;
  }
  
  .logo-symbol {
    width: 35px;
    height: 35px;
    font-size: 0.9rem;
  }
  
  .logo-title {
    font-size: 0.75rem;
  }
  
  .logo-subtitle {
    font-size: 0.65rem;
  }
}

/* TABLETS */
@media (min-width: 769px) and (max-width: 1024px) {
  .menu-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    max-width: 900px;
    padding: 0 1.5rem;
  }
  
  .menu-card {
    height: 350px;
    min-height: 350px;
  }
  
  .card-content {
    padding: 2.2rem 1.5rem;
    gap: 1.3rem;
  }
  
  .card-icon-container {
    width: 90px;
    height: 90px;
  }
  
  .card-icon {
    font-size: 2.8rem;
  }
  
  .card-text {
    min-height: 140px;
  }
  
  .institutional-footer {
    max-width: 700px;
  }
}

/* DESKTOP GRANDE */
@media (min-width: 1200px) {
  .menu-grid {
    max-width: 1100px;
    gap: 2.5rem;
  }
  
  .menu-card {
    height: 400px;
    min-height: 400px;
  }
  
  .card-content {
    padding: 3rem 2rem;
    gap: 2rem;
  }
  
  .card-icon-container {
    width: 110px;
    height: 110px;
  }
  
  .card-icon {
    font-size: 3.5rem;
  }
  
  .card-text {
    min-height: 160px;
    gap: 1.2rem;
  }
  
  .card-text h3 {
    font-size: 1.5rem;
  }
  
  .card-text p {
    font-size: 1.1rem;
  }
  
  .institutional-footer {
    max-width: 900px;
  }
}

/*GARANTIZAR SCROLL*/
@media (max-height: 800px) {
  .main-container {
    min-height: 120vh;
  }
  
  .menu-card {
    height: 360px;
    min-height: 360px;
  }
}

@media (max-height: 600px) {
  .main-container {
    min-height: 140vh;
  }
  
  .menu-card {
    height: 340px;
    min-height: 340px;
  }
  
  .welcome-section {
    margin: 0 0 1.5rem 0;
  }
}

/* Accesibilidad */
@media (prefers-reduced-motion: reduce) {
  .menu-card,
  .card-icon-container {
    transition: none;
  }
  
  .menu-card:hover {
    transform: none;
  }
}

.menu-card:focus {
  outline: 2px solid var(--accent-green);
  outline-offset: 2px;
}

ion-content {
  --overflow: auto;
}
</style>