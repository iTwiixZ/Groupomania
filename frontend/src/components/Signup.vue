<template>
    <div class="container d-flex justify-content-center align-items-center flex-column">
            <img class="w-50" src="../assets/icon-left-font.svg" alt="Groupomania">
        <h1 class="text-center">Ne perds pas de temps et viens nous rejoindres ! </h1>
        <form>
        <div class="form-group ">
          <input class="form-control" v-model='name' type='name' placeholder="Nom d'utilisateur" size="50" required >
        </div>
        <div class="form-group ">
          <input class="form-control" v-model='email' type='email' placeholder="Email" size="50" required aria-label="Email de connection">
        </div>
        <div class="form-group ">
          <input class="form-control" v-model='password' type='password' placeholder="Mot de passe" size="50" required>
        </div>
      </form>  
      <router-link to="/">
        <button @click="signup()" type="submit" class="btn btn-secondary mt-2" id="login" aria-label="S'inscrire" formaction="" formenctype="application/x-www-form-urlencoded">S'inscrire</button>
      </router-link>
    </div>
</template>

<script>
import '../assets/btn.scss'
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
          fetch("http://localhost:3000/api/users/signup", {
              method: "POST",
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          })
           .then( response => {
        if(response.ok) {
          return response.json()
        } else {
          return response.text()
          .then((text) => {
            throw new Error(text)}
          )
        }
      })  
        
      .then((value) => {
        const userId = JSON.stringify(value.userId);
        localStorage.setItem("userId", userId);
        alert('Vous pouvez maintenant vous connectez !')
  
        
      })
      .catch(alert)
       
      }
  }
}
  
  
</script>