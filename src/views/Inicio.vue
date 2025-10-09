<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Inicio sesion usuarios SwapNetwork</ion-title>
      </ion-toolbar>
    </ion-header>


    <ion-content id="inicio">
      <img id="imagen" src="\universidad_imagen.jpg"></img>

      <div id="formulario_inicio"> 
          <ion-list>  

                <h1 id="subtitulo_inicio">Inicia sesion para ver el contenido principal de SwapNetwork</h1>   

                <!-- Correo -->
                <ion-item>
                   <ion-input class="campo" type="text" id="correo" v-model="correo" placeholder="Ingrese correo electronico" required/>
                </ion-item>

                <!-- Contraseña -->
                <ion-item>
                    <ion-input class="campo" :type="showPassword ? 'text' : 'password'" id="contrasena" v-model="contrasena" placeholder="Ingrese contraseña" required/>
                <ion-button id="boton1" fill="clear" slot="end" @click="alternar" type="button">
                    <ion-icon :icon="showPassword ? eyeOff : eye"></ion-icon>
                </ion-button>
                </ion-item>

                <!-- Inicio Sesion -->
                <ion-item>
                    <ion-button id="boton" expand="full" @click="iniciar_sesion">Iniciar Sesion</ion-button>
                </ion-item>


        <!-- Hipervinculo -->
        <ion-item class="enlace">
            <ion-text>No tienes cuenta?</ion-text>
            <router-link id="ruta" to="/login" style="color: green; cursor: pointer;">
              Crear cuenta
            </router-link>
        </ion-item>

        </ion-list> 

      </div>

    </ion-content>
  </ion-page>
</template>

<script setup>
import {IonPage, IonTitle, IonContent, IonToolbar, IonHeader, IonItem, IonInput, IonButton, IonIcon, IonList, IonText} from '@ionic/vue';
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
    router.push('/MenuPrincipal');
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

<style>

#inicio {
  --background: linear-gradient(90deg, #7cc383, #3ad649);           /*color del fondo*/
  justify-content: center;              /*centrado horizontalmente */
  align-items: center;                  /*centrado verticalmente */
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;        /*tipo de letra contenido*/
  text-align: center;                   /*centrado de texto*/
  height: 100vh;                        /*altura exacta de la pantalla*/
}

#formulario_inicio {
  --ion-background-color: white;                /*remplaza el color por defecto de ionic*/
  width: 30%;                                     /*ancho del formulario*/
  height: auto;                                   /*alto del formulario*/
  margin: 10%;                                    /*margen del formulario*/
  margin-right: 60%;                              /*permite ajustar centrada mente la imagen*/
  border-radius: 25px;                            /*borde redondeado*/
  box-shadow: 0 4px 15px rgb(0, 0, 0, 0.3);     /*sombra del formulario*/
  overflow: hidden;                               /*recorta borde sobresaliente*/
}

#subtitulo_inicio {
  padding: 10px 0 20px;           /*espacio del elemento*/
}

#boton {
  --background: #7cc383;        /*color del boton*/
  color: black;                 /*color de letra*/
  width: 25%;                     /*ancho del boton*/
  height: 60%;                    /*altura del boton*/
  margin-left: 37%;               /*margen del boton*/
  margin-top: 30px;               /*margen superior del boton*/
  position: relative;             /*posision boton*/
  border-radius: 10px;            /*borde redondeado*/ 
  overflow: hidden;               /*recorta el borde sobresaliente*/
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;          /*tipo de letra para el contenido*/
}

.enlace {
  text-align: center;         /*centra el contenido del formulario*/
  justify-content: center;          /*centra horizontalmente el contenido*/
  margin-left: 25%;         /*espacio izquierdo con el otro elemento*/
  padding-top: 10px;          /*espacio superior del elemento*/
}

</style>