<template>
    <div class="container d-flex justify-content-center align-items-center flex-column">
            <img class="w-50" src="../assets/icon-left-font.svg" alt="Groupomania">
        <h1 class="text-center mt-3">Ne perds pas de temps et viens nous rejoindres ! </h1>
        <form class="container mt-5">
        <div class="form-group">
          <input class="form-control" v-model='name' type='name' placeholder="Nom d'utilisateur: entre 3 et 15 caractères" size="50" required >
          </div>
        <div class="form-group mt-2">
          <input class="form-control" v-model='email' type='email' placeholder="Email" size="50" required aria-label="Email de connection">
        </div>
        <div class="form-group align-items-center mt-2">
          <input class="form-control" v-model='password' type='password' placeholder="Mot de passe" size="50" required>
         </div>
          <span class="form-text">
            Doit contenir 8 caractères minimum, une majuscule, une minuscule et un caractère spéciale (ex: !, @, #, etc.)
        </span>
      </form>  
      <router-link to="/">
        <button @click="signup()" type="submit" class="btn  mt-5" id="login" aria-label="S'inscrire" formaction="" formenctype="application/x-www-form-urlencoded">S'inscrire</button>
      </router-link>
    </div>
</template>

<script>

import '../assets/btn.scss'
import Swal from 'sweetalert2'
import router from '../router'
import axios from 'axios'
export default {
  name: 'signup',
  
  data() {
      return {
          name:'',
          email:'',
          password:'',
      }
  },
  methods: {
    signup() {
      const data = {
      name: this.name,
      email: this.email,
      password: this.password
      };
      axios.post("http://localhost:3000/api/users/signup", {
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
      })
        .then( response => {
        if(response.ok) {
        return response.json()
        }else {
        return response.text()
        // .then((text) => {
        // throw new Error(text)}
          // )
        }
      })  
        .then(function (value) {
        const userId = JSON.stringify(value.userId);
        localStorage.setItem("userId", userId);
        Swal.fire({
        icon: 'success',
        title: 'Votre compte à été créer avec succès',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        willClose: () => {router.push('/')}
        })
       })
      .catch(function(error) {
        const codeError  = error.message.split("code")[1]
        let messageError = ""
        switch(codeError) {
          case '400' : messageError = "Formulaire incomplet ou mal remplis"; break
        }
        Swal.fire({
      icon: 'error',
      title: 'Le formulaire est pas correctement remplis !',
      text : messageError || error.message,
      showConfirmButton: false,
      timer: 3500,
      timerProgressBar: true

      })
      })
    
      }

  }
}
</script>