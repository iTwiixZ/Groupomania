<template>
  <div>
   <div class="post">
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
                  <td>{{name}}</td>
                 <td class="text-center"><button v-on:click.prevent='deletePost(post.id)' v-if="post.userId == userId || isAdmin == true" class="btn_delete_post_admin"> Supprimer </button></td>
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
  
  
  data() {
    
    return {
      isDisplay: false,
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
           comments:[]
      
      
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

   


    // déconnexion
    logout: function () {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('name');
      localStorage.removeItem('isAdmin');
      this.$router.push('/');
      },
    // supprimer un compte utilisateur
    deleteCount: function (userId) {
      axios.delete(`http://localhost:3000/api/users/${userId}`,
      {
          headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + this.token
          }
        })
        .then(() =>{
          localStorage.clear();
          this.$router.push('/');
          alert('Votre compte a été supprimé !')
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
              alert('Votre post a été supprimé !')
              location.reload(true);
            })
            .catch(error => console.log(error));
    },
    // supprimer un commentaire
    deleteComment: function (id) {
          let token =localStorage.getItem('token');
          axios.delete(`http://localhost:3000/api/comments/delete/${id}`,
          {
          headers: {
            'content-type': 'application/json',
            "Accept": "application/json",
            'Authorization': 'Bearer ' + token
          }
        } )
          .then(response => {
              console.log(response.data)
              alert('Votre commentaire a été supprimé !')
              location.reload(true);
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