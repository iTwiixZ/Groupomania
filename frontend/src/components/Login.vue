<template>
    <div class="mt-4 container d-flex justify-content-center flex-column">
      <form class="container d-flex justify-content-center form_ctrl">
          <div  class="form-group">
            <input class="form-control" v-model='email' type='email' placeholder="Email" size="50" required aria-label="Email de connection">
            <input class="form-control" v-model='password' type='password' placeholder="Mot de passe" size="50" required> 
          </div>
          
      </form> 
            <div class="container  mt-4">
            <div class="container  d-flex justify-content-center gap-5">
          <router-link to="/mur">
          <button  v-on:click.prevent='login()' type="button"  id='login'>Se connecter</button>
          </router-link>
          <router-link to="/signup">
          <button id="login" type="button"><a href="/signup">Inscrit toi et rejoind nous ! </a></button>
          </router-link>
          </div>
          </div>
  </div>
</template>

<script>
import axios from 'axios'
import '../assets/btn.scss'
import '../assets/mediaqueries.scss'
export default {
  
  name: 'login',
  components: {
  },
  
  data() {
  return {
  email:'',
  password:'',
  userId:'',
  isAdmin:'',
  name:'',
  }
  },
  methods: {
    login : function () {
      let token = localStorage.getItem('data');
      axios.post('http://localhost:3000/api/users/login', {
      email: this.email,
      password: this.password,
      name: this.name,
      isAdmin: this.isAdmin,
      },
    {
      headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${token}`
        }
        }).
        then((response) => {
          localStorage.setItem("token",response.data.token);
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("name", response.data.name);
          localStorage.setItem("isAdmin",response.data.isAdmin);
          this.$swal({
            position: 'top-center',
            icon: 'success',
            title: 'Vous êtes maintenant connecté !',
            showConfirmButton: false,
            timer: 1800
            });
            this.$router.push('/forum')
            })
            .catch()
            this.$swal({
            icon: 'error',
            title: 'Mot de passe ou email incorrect !',
            showConfirmButton: false,
            timer: 2800
          });
          }
  }
}
</script>