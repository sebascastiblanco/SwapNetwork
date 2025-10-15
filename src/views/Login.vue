<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Registro usuarios SwapNetwork</ion-title>
      </ion-toolbar>
    </ion-header>


  <ion-content id="registro">
    <img id="imagen" src="\universidad_imagen.jpg"/>

      <div id="formulario">
        <ion-list>

          <h1 id="subtitulo">Registrese para ingresar a SwapNetwork</h1>
        
            <!-- Ingreso de usuario -->
           <ion-item>
              <ion-input class="campo" type="text" v-model="usuario" placeholder="Ingrese nombre de usuario" required/>
            </ion-item>

         <!-- Ingreso de correo -->
            <ion-item>
                <ion-input class="campo" type="email" v-model="correo" placeholder="Ingrese correo electronico" required/>
            </ion-item>

          <!-- Ingreso de rol - usuario -->
            <ion-item>
              <ion-select class="campo" v-model="rol" placeholder="Rol" @ionChange="roles" interface="action-sheet">
                  <ion-select-option value="estudiante">Estudiante</ion-select-option>
                  <ion-select-option value="maestro">Gestor de Conocimiento</ion-select-option>
              </ion-select>  
            </ion-item>

          <!-- Ingreso de contraseña -->
            <ion-item>
              <ion-input class="campo" :type="showPassword ? 'text' : 'password'" v-model="contrasena" placeholder="Ingrese contraseña" required/>
                <ion-button id="boton1" fill="clear" slot="end" @click="alternar" type="button">
                  <ion-icon :icon="showPassword ? eyeOff : eye"></ion-icon>
                </ion-button>
            </ion-item>

          <!-- Boton de registro -->
              <ion-button id="boton2" expand="full" @click="registro_formulario">Registrarse</ion-button>

          <!-- Hipervinculo -->
            <ion-item class="link">
              <ion-text>Si ya tienes cuenta,</ion-text>
                <router-link id="ruta" to="/inicio" style="color: green; cursor: pointer;">
                Iniciar Sesion
              </router-link>
            </ion-item>
        </ion-list>
      </div>



  </ion-content>
  </ion-page>
</template>

<script setup>
import {IonPage, IonTitle, IonContent, IonToolbar, IonHeader, IonInput, IonButton, IonIcon, IonItem, IonSelect, IonSelectOption, IonList, IonText} from '@ionic/vue';
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

#imagen {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 50%;
}

#registro {
  --background: linear-gradient(90deg, #7cc383, #3ad649);     /*color fondo todo el contenido*/
  text-align: center;     /*centra el texto del contenido*/
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;       /*tipo de letra para el contenido*/
  justify-content: center;      /*centra horizontalmente el contenido*/
  align-items: center;        /*centra verticalmente el contenido*/
  height: 100dvh;          /*fija la altura de la pantalla*/
  overflow: hidden;
}

#subtitulo {
  padding: 10px 0 20px;           /* top | right-left | bottom */
}

#formulario {
  --ion-background-color: white;     /*sobreescribir color de ionic*/
  text-align: center;         /*centra el contenido del formulario*/
  margin: 10%;                /*centra el formulario*/
  margin-left: 10%;           /*permite ajustar centrada mente la imagen*/
  height: auto;               /*altura del formulario*/
  width: 30%;                 /*ancho de formulario en pantalla*/
  border: 1px solid #4caf50;     /*visualizacion del borde*/
  border-radius: 25px;          /*borde redondeado*/
  box-shadow: 0 4px 15px rgb(0, 0, 0, 0.3);          /*sombra del formulario*/
  overflow: hidden;           /*recorta el borde sobresaliente*/
}

ion-item {
  --inner-border-width: 0;      /*eliminar linea formulario*/
  --highlight-height: 0;        /*eliminar linea de foco*/
  margin-bottom: 12px;          /*espaciado entre campos*/
}

.campo {
  text-align: left;         /*ajusta el contenido del formulario a la izquierda*/
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;            /*tipo de letra para el contenido*/
}

#boton1 {
  --background: #7cc383;            /*color fondo todo el contenido*/
  color: black;               /*color interno del boton*/
  border-radius: 10px;            /*borde redondeado*/
  overflow: hidden;             /*recorta el borde sobresaliente*/
}

#boton2 {
  --background: #7cc383;        /*color del boton*/
  color: black;                 /*color de letra*/
  width: 25%;                     /*ancho del boton*/
  margin-left: 37%;               /*margen del boton*/
  margin-top: 30px;               /*margen superior del boton*/
  position: relative;             /*posision boton*/
  border-radius: 10px;            /*borde redondeado*/ 
  overflow: hidden;               /*recorta el borde sobresaliente*/
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;          /*tipo de letra para el contenido*/
}

.link {
  --background: white;
  text-align: center;         /*centra el contenido del formulario*/
  justify-content: center;          /*centra horizontalmente el contenido*/
  margin-left: 25%;         /*espacio izquierdo con el otro elemento*/
  padding-top: 10px;          /*espacio superior del elemento*/
}

.link > ion-text {
  padding-left: 8%;
}

#ruta {
  padding: 5px;         /*espacio entre elementos*/
}


@media (min-width: 500px){

#imagen {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 50%;
}

 #registro {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    height: 100vh;
    overflow: hidden;
  }

  #formulario {
    margin-top: 6%;
  }

  #boton2 {
    width: 40%;
    margin-left: 30%;
  }

  .link {
    flex-direction: row;
    text-align: center;
    justify-content: center;
    margin-left: 10%;
    padding-left: 10%;
  }

  .link > ion-text {
  padding-left: 8%;
}
}

</style>