<template>
  <!-- Pagina de Ionic -->
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Registro usuarios SwapNetwork</ion-title>
      </ion-toolbar>
    </ion-header>
  <ion-content>

    <b>Registrese para ingresar a SwapNetwork</b>

    <div>
      <!-- Evita que el navegador haga el envio normal del formulario -->
        <ion-item>
          <ion-input type="text" id="usuario" v-model="usuario" placeholder="Ingrese nombre de usuario" required/>
        </ion-item>
        <ion-item>
          <ion-input type="email" id="correo" v-model="correo" placeholder="Ingrese correo electronico" required/>
        </ion-item>
        <ion-item>
          <ion-select v-model="rol" placeholder="Rol" @ionChange="roles" interface="action-sheet">
            <ion-select-option value="estudiante">Estudiante</ion-select-option>
            <ion-select-option value="maestro">Gestor de Conocimiento</ion-select-option>
          </ion-select>  
        </ion-item>
        <ion-item>
          <ion-input :type="showPassword ? 'text' : 'password'" id="contrasena" v-model="contrasena" placeholder="Ingrese contraseña" required/>
            <ion-button id="button" fill="clear" slot="end" @click="alternar" type="button">
              <ion-icon :icon="showPassword ? eyeOff : eye"></ion-icon>
            </ion-button>
        </ion-item>
        <ion-item>
          <ion-button expand="full" @click="registro_formulario">Registrarse</ion-button>
        </ion-item>
        <ion-item>
          <p>Tienes cuenta</p>
          <router-link to="/inicio" style="color: green; cursor: pointer;">
            Iniciar Sesion
          </router-link>
        </ion-item>
    </div>

  </ion-content>
  </ion-page>
</template>

<script setup>
import {IonPage, IonTitle, IonContent, IonToolbar, IonHeader, IonInput, IonButton, IonIcon, IonItem, IonSelect, IonSelectOption} from '@ionic/vue';
import { ref } from 'vue'
import {registerUser} from '../router/firebaseConfig';
import { eye, eyeOff } from 'ionicons/icons'
import { useRouter } from 'vue-router';

  //Variables del formulario
    const usuario = ref('')
    const correo = ref ('')
    const contrasena = ref ('')
    const rol = ref('')
    const showPassword = ref(false)

    const validacion = (correo) => {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return regex.test(correo);
};

 const registro_formulario = async () => {
  try {
      if (!validacion(correo.value)) {
      alert('Por favor ingresa un correo válido');
      return; // Detener el registro si el correo no es válido
    }
    const userCredential = await registerUser(usuario.value, correo.value, rol.value, contrasena.value);
    router.push('/inicio');
  } catch (error){
    alert("Error en el registro:", error.message);
  }
  
};

// Función para alternar visibilidad
function alternar() {
  showPassword.value = !showPassword.value
}

// función para detectar cambio de rol
function roles(event) {
  if (rol.value === "estudiante"){
    alert('Tu rol es Estudiante')
  } else if (rol.value === "maestro"){
    alert('Tu rol es Gestor de Conocimiento')
  }
}

function registro() {
  console.log(usuario.value, correo.value, contrasena.value, rol.value)
}

  const router = useRouter();

</script>

<style>

</style>