<template>
  <div>
    <header class="container">
      <div class="container">
        <div class="gap-1 d-flex justify-content-center">
          <!-- Bouton admin -->
          <router-link v-if="isAdmin == true" to="/admin">
            <button id="admin_btn" v-if="isAdmin == true" type="button">
              Administration
            </button>
          </router-link>
          <!-- Bouton de déconnection -->
          <button v-on:click.prevent="logout()" type="button" id="logout_btn">
            Déconnexion
          </button>
          <!-- Suppression du compte  -->
          <button
            v-on:click.prevent="deleteCount(userId)"
            type="button"
            id="delete_btn"
          >
            Supprimer le compte
          </button>
        </div>
        <div
          class="
            container
            d-flex
            justify-content-center
            align-items-center
            flex-column
          "
        >
          <img class="w-50" src="../assets/icon-above-font.svg" alt="Logo" />
          <h1 class="text-center">Bienvenue sur votre réseau {{ name }} !</h1>
          <p v-if="isAdmin == true">
            Vous êtes administrateur, vous pouvez supprimer les post et
            commentaires non conventionnels
          </p>
          <p class="h3 text-muted">
            Créer votre post, voir les publications et +.
          </p>
          <span id="fleche"></span>
        </div>
      </div>
    </header>

    <!-- Création d'un post -->
    <div class="container" id="post_form top">
      <form method="POST" enctype="multipart/form-data" id="form">
        <div class="form-group">
          <input
            id="input_size"
            class="form-control mb-1"
            v-model="title"
            type="title"
            placeholder="Le titre de votre post "
            required
            aria-label="Titre du post "
          />
        </div>
        <div class="form-group">
          <input
            id="input_size"
            v-model="content"
            type="text"
            placeholder="Que se passe t-il ?"
            class="form-control mb-1"
          />
        </div>
        <div>
          <div v-if="media">
            <img :src="media" alt="Image du post" id="img_post" class="file" />
          </div>
          <div class="form-group">
            <input
              type="file"
              accept=".jpeg, .jpg, .png, .gif, .webp"
              v-on:change="uploadFile"
              id="file"
              class="input-file"
            />
          </div>
        </div>
        <button v-on:click="newPost()" type="button" id="btn_post">
          Envoyer
        </button>
      </form>
    </div>
    <div id="btn" @click="scrollToTop()">
      <img
        class="arrow_up"
        src="../assets/up-arrow-svgrepo-com.svg"
        alt="Fleche"
      />
    </div>
    <div class="container mt-3" id="post">
      <h2 class="text-center">
        Voici les dernières acutalités de votre communauté
      </h2>
      <!-- les posts -->
      <div class="row">
        <div
          id="post-div"
          class="col-sm-12 mb-3 post_div"
          v-for="post in posts"
          :key="post.id"
        >
          <h3 class="pt-3 mb-0">{{ post.title }}</h3>
          <p class="pt-3 h5 mb-1">{{ post.content }}</p>
          <p>Publié le {{ post.createdAt }}</p>
          <div class="form-group">
            <img
              :src="'http://localhost:3000/images/' + post.media"
              class="img_posted mb-2"
              alt="image du post"
            />
          </div>
          <!--  supprimer le post -->
          <button
            v-on:click.prevent="deletePost(post.id)"
            v-if="post.userId == userId || isAdmin == true"
            class="btn_delete_post"
          >
            Supprimer
          </button>
          <!--  commentaires -->
          <button
            @click="showComment(post.id)"
            type="button"
            class="btn_show mb-2"
          >
            Voir les commentaires
          </button>
          <div v-show="showComment" id="show_comment">
            <div
              id="commentdiv"
              class="comment mt-2 mb-2"
              v-for="comment in comments"
              :key="comment.id"
            >
              <div v-if="comment.postId == post.id">
                <p class="content">{{ comment.content }}</p>
                <small class="text-start pe-0 text-secondary"
                  >publié par
                  <span class="fw-bold"
                    >{{ comment.userId }} le {{ comment.createdAt }}</span
                  ></small
                >

                <!-- bouton supprimer le commentaire -->
                <button
                  v-on:click.prevent="deleteComment(comment.id)"
                  v-if="comment.userId == userId || isAdmin == true"
                  class="delete_comment"
                >
                  Supprimer le commentaire
                </button>
              </div>
            </div>
            <div id="noComment"></div>
          </div>
          <!-- répondre au post -->
          <form>
            <input
              class="form-control mb-2"
              v-model="content"
              type="text"
              id="content"
              name="content"
              placeholder="Ecris ton commentaire !"
            />
            <button
              v-on:click="newComment(post.id)"
              type="button"
              id="btn_post_comment"
              class="mb-1"
            >
              Envoyer ma réponse !
            </button>
          </form>
        </div>
      </div>
      <!-- fin des posts -->
    </div>
  </div>
</template>


<script>
import axios from "axios";
import "../assets/btn.scss";
import "../assets/fleche.scss";
import "../assets/mur.scss";
import Swal from "sweetalert2";

export default {
  name: "mur",
  img: "",
  div: ".post",

  data() {
    return {
      name: this.$localStorage.get("user"),
      userId: this.$localStorage.get("userId"),
      isAdmin: JSON.parse(this.$localStorage.get("isAdmin")),
      token: this.$localStorage.get("token"),
      posts: [],
      title: "",
      content: "",
      createdAt: "",
      id: "",
      media: "",
      post: "",
      comments: [],
    };
  },

  mounted() {
    if (localStorage.name) {
      this.name = localStorage.name;
      this.token = localStorage.token;
    }
    // posts
    axios
      .get("http://localhost:3000/api/posts/getAll", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + this.token,
        },
      })
      .then((res) => {
        this.posts = res.data;
      })
      .catch((error) => console.log(error));
  },

  created() {},

  watch: {
    username(newName) {
      localStorage.name = newName;
    },
  },
  methods: {
    // déconnexion
    logout: function () {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("name");
      localStorage.removeItem("isAdmin");
      this.$router.push("/");
    },
    // supprimer un compte utilisateur
    deleteCount: function (userId) {
      axios
        .delete(`http://localhost:3000/api/users/${userId}`, {
          headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + this.token,
          },
        })
        .then(() => {
          localStorage.clear();
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Votre compte a bien été supprimer !",
            showConfirmButton: false,
            timer: 2300,
          });
          this.$router.push("/");
        })
        .catch((error) => console.log(error));
    },
    // supprimer un post
    deletePost: function (id) {
      let token = localStorage.getItem("token");
      axios
        .delete(`http://localhost:3000/api/posts/${id}`, {
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then(() => {
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Votre post a bien été supprimer !",
            showConfirmButton: false,
            timer: 2200,
          });
          window.setTimeout(function () {
            location.reload();
          }, 2500);
        })
        .catch((error) => console.log(error));
    },
    // supprimer un commentaire
    deleteComment: function (id) {
      let token = localStorage.getItem("token");
      axios
        .delete(`http://localhost:3000/api/comments/delete/${id}`, {
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then(() => {
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Votre commentaire a bien été supprimer !",
            showConfirmButton: false,
            timer: 2200,
          });
          window.setTimeout(function () {
            location.reload();
          }, 2500);
        })
        .catch((error) => console.log(error));
    },
    // les commentaires
    showComment: function (postId) {
      let token = localStorage.getItem("token");
      let show_comment = document.getElementById("show_comment");
      if (getComputedStyle(show_comment).display != "block") {
        show_comment.style.display = "none";
      } else {
        show_comment.style.display = "block";
      }

      axios
        .get(`http://localhost:3000/api/comments/getComments/${postId}`, {
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          this.comments = res.data;
        })
        .catch((error) => console.log(error));
    },
    // creation nouveau post
    newPost: function () {
      let token = localStorage.getItem("token");
      const post = {
        title: this.title,
        content: this.content,
        media: this.img,
        userId: this.userId,
      };
      var formData = new FormData();
      formData.append("media", this.img);
      formData.append("post", JSON.stringify(post));
      axios
        .post("http://localhost:3000/api/posts/new", formData, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then(() => {
          this.post === "";
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Votre post a bien été envoyé !",
            showConfirmButton: false,
            timer: 2300,
          });
          window.setTimeout(function () {
            location.reload();
          }, 2500);
        })
        .catch((error) => {
          console.log(error);
          console.log("Votre message n'a pas pu etre posté !");
        });
    },
    // Ajouter un commentaire
    newComment: function (postId) {
      let token = localStorage.getItem("token");
      console.log(postId);
      const comment = {
        postId: postId,
        content: this.content,
        userId: this.userId,
      };
      let formData = new FormData();
      formData.append("comment", JSON.stringify(comment));
      console.log(formData);
      axios
        .post(`http://localhost:3000/api/comments/new`, formData, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then(() => {
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Votre commentaire a bien été envoyé !",
            showConfirmButton: false,
            timer: 2300,
          });
          window.setTimeout(function () {
            location.reload();
          }, 3000);
        })
        .catch((error) => {
          console.log(error);
          console.log("Votre message n'a pas pu etre posté !");
        });
    },
    uploadFile(e) {
      this.img = e.target.files[0];
      const file = e.target.files[0];
      if (file) {
        let reader = new FileReader();
        reader.addEventListener("load", function () {
          let preview = document.getElementById("file");
          preview.setAttribute("src", this.result);
        });
        reader.onload = (event) => {
          this.preview = event.target.result;
          this.media = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    scrollToTop: function () {
      const btn = document.getElementById("btn");
      btn.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      });
    },
  },
};
</script>