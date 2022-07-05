import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Forum from '../views/Forum.vue'
import Admin from '../views/Administration.vue'
import signup from '../components/Signup.vue'
import update from '../views/Update.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    
  },

  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
  },

  {
    path: '/forum',
    name: 'Forum',
    component: Forum,
   
  },



  {
    path: '/signup',
    name: 'Signup',
    component : signup,
  },
  {
    path:'/update',
    name:'update',
    component: update,
  },
  
  
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
    const publicPages = ["/", "/signup",]
    const authRequired = !publicPages.includes(to.path)
    const logged = localStorage.getItem("userId")
    const token = localStorage.getItem("token")
    if (authRequired && !logged && !token) {
        return next("/")
    }
    next()
})

export default router

