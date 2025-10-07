<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Inicio sesion usuarios SwapNetwork</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <b>Inicia sesion para ver el contenido principal de SwapNetwork</b>
            <div> 
            <ion-item>
                <ion-item>
                <ion-input type="text" id="correo" v-model="correo" placeholder="Ingrese correo electronico" required/>
                </ion-item>
                <ion-item>
                <ion-input :type="showPassword ? 'text' : 'password'" id="contrasena" v-model="contrasena" placeholder="Ingrese contraseña" required/>
                <ion-button id="button" fill="clear" slot="end" @click="alternar" type="button">
                    <ion-icon :icon="showPassword ? eyeOff : eye"></ion-icon>
                </ion-button>
                </ion-item>
                <ion-item>
                    <ion-button expand="full" @click="iniciar_sesion">Iniciar Sesion</ion-button>
                </ion-item>
            </ion-item>
            </div>
        <ion-item>
        <p>No tienes cuenta?</p>
        <router-link to="/login" style="color: green; cursor: pointer;">
            Crear cuenta
        </router-link>
        </ion-item>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {IonPage, IonTitle, IonContent, IonToolbar, IonHeader, IonItem, IonInput, IonButton, IonIcon} from '@ionic/vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue'
import { eye, eyeOff } from 'ionicons/icons'
import { auth } from '../router/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

    const correo = ref ('')
    const contrasena = ref ('')
    const showPassword = ref(false)
    const errorMessage = ref('')
    const router = useRouter();
    
    function alternar() {
        showPassword.value = !showPassword.value
}

//Funcion para iniciar sesion
 const iniciar_sesion = async () => {
  try {
    await signInWithEmailAndPassword(auth, correo.value, contrasena.value);
    alert("Sesion iniciada con exito");
    router.push('/zonaswap');
  } catch (error) {
    alert("Correo o contraseña invalidos")
    errorMessage.value = error.message;
  }

      return {
        email,
        contrasena
    };
};

    function volver(){
     router.push('/login');
    }
</script>