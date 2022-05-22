<template>
  <div v-if="isAdmin == true">
    <h1 class="text-center mt-5">Bienvenue dans votre interface administrateur {{name}}</h1>
    <p class="text-center mt-3">Vous pouvez supprimez les post non conformes et supprimer les utilisateurs</p>
   <div class="post d-flex justify-content-center">
            <button class="list_post" v-on:click="show" >Afficher les post</button>
           <div id="post_list" v-if="isDisplay" class="container">
            <button class="list_post" v-on:click="hide">Cacher les post</button>
            <div class="table_style container">
           <table class="table table-bordered mt-2" v-for="post in posts" :key="post.id">
             <thead>
               <tr>
                 <th scope="col">Post id</th>
                 <th scope="col">Titre</th>
                 <th scope="col">Contenu</th>
                 <th scope="col">Image</th>
                 <th scope="col">Publié par</th>
               </tr>
             </thead>
             <tbody>
               <tr>
                 <th scope="row">{{ post.id }}</th>
                 <td class="title_width">{{post.title}}</td>
                 <td class="content_width">{{post.content}}</td>
                 <td><img :src=" 'http://localhost:3000/images/' + post.media " alt="Image du post" class="img_posted_admin"></td>
                  <td>{{post.userId}}</td>
                 <td class="text-center"><button v-on:click.prevent='deletePost(post.id)' v-if="post.userId == userId || isAdmin == true" class="btn_delete_post_admin"> Supprimer </button></td>
               </tr>
             </tbody>
           </table>
           </div>
          </div>
        </div>
          <div id="users" class="container d-flex justify-content-center">
            <button class="list_user" v-on:click="showUser">Afficher les utilisateurs</button>
               <div id="user_list" v-if="isUser" class="container">
            <button class="list_user" v-on:click="hideUser">Cacher les utilisateurs</button>
            <div class="table_style container">
           <table class="table table-bordered mt-2" v-for="user in users" :key="user.id">
             <thead>
               <tr>
                 <th scope="col">Nom d'utilisateur</th>
                 <th scope="col">Adresse email</th>
                 <th scope="col">User ID</th>
               </tr>
             </thead>
             <tbody>
               <tr>
                 <td class="user_width">{{user.name}}</td>
                 <td class="email_width">{{user.email}}</td>
                 <td>{{user.id}}</td>
                 
                  
                 <td class="text-center"><button class="text-center" v-if="post.userId == userId || isAdmin == true" v-on:click.prevent='deleteCount(user.id)' type="button" id='delete_btn_admin' >Supprimer l'utilisateur</button></td>
               </tr>
             </tbody>
           </table>
           </div>
          </div>
          </div>

          </div>
</template>


<script>
import axios from 'axios'
import '../assets/btn.scss'
import '../assets/fleche.scss'
import '../assets/mur.scss'
export default {
  name:'admin',
  img:'',
  div: '.post',
  id:  '#user',
  
  
  data() {
    
    return {
      isDisplay: false,
      isUser: false,
      data:JSON.parse(this.$localStorage.get('user')),
      userId: JSON.parse(this.$localStorage.get('userId')),
      isAdmin:JSON.parse(this.$localStorage.get('isAdmin')),
           name:'',
           posts:[],
           title:'',
           content:'',
           dateAdd:'',
           id:'',
           media:'',
           post:'',
           comments:[],
           user:[],
      
      
    }
    
  },
  mounted() {
    if (localStorage.name) {
      this.name = localStorage.name;
    }
    // posts
    axios.get('http://localhost:3000/api/posts/getAll') 
      .then(res => { 
        console.log(res.data)
        this.posts = res.data
        })
      .catch(error => console.log(error));

      // Utilisateurs
       axios.get('http://localhost:3000/api/users/')
       .then(res => {
         console.log(res.data)
         this.users = res.data
       })
        .catch(error => console.log(error));
  },

 
  

  created() {
     
  },
  watch: {
    username(newName) {
      localStorage.name = newName;
      }
    
  },
  methods: {
    show: function () {
      this.isDisplay = true;
    },
   
   
  hide: function () {
      this.isDisplay = false;
    },

   showUser: function () {
      this.isUser = true;
    },
   
   
  hideUser: function () {
      this.isUser = false;
    },
   
  // Afficher tous les utilisateurs



    
    // supprimer un compte utilisateur pour l'admin
    deleteCount: function (userId) {
      axios.delete(`http://localhost:3000/api/users/${userId}`,
      {
          headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + this.token
          }
        })
        .then(() =>{
          this.$swal({
                   position: 'top-center',
                   icon: 'success',
                   title: `L'utilisateur à bien été supprimer !`,
                   showConfirmButton: false,
                   timer: 2200
                 });
          
          window.setTimeout(function(){location.reload()},2500);
        })
        .catch(error => console.log(error))
    },




    // supprimer un post
    deletePost: function (id) {
          let token =localStorage.getItem('token');
          axios.delete(`http://localhost:3000/api/posts/${id}`,
          {
          headers: {
            'content-type': 'application/json',
            "Accept": "application/json",
            'Authorization': 'Bearer ' + token
          }
        } )
          .then(response => {
              console.log(response.data)
                this.$swal({
                   position: 'top-center',
                   icon: 'success',
                   title: `Le post a bien été supprimer !`,
                   showConfirmButton: false,
                   timer: 2200
                 });
          
          window.setTimeout(function(){location.reload()},2500);
            })
            .catch(error => console.log(error));
    },
  
    // les commentaires
    showComment: function(postId) {
      let show_comment = document.getElementById('show_comment');
      if(getComputedStyle(show_comment).display != "block"){
        show_comment.style.display = "none"
        } else {
            show_comment.style.display = "block"
          }
      
      axios.get(`http://localhost:3000/api/comments/getComments/${postId}`)
            .then(response => {
              console.log(response.data)
              this.comments =response.data
            })
            .catch(error => console.log(error));
      
      
      },
    
  }
 
    
 

}


  

</script>