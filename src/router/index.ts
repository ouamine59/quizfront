import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { useStore } from 'vuex';
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from "../views/RegisterView.vue"
import TableauDeBordAdminView from '../views/TableauDeBordAdminView.vue'
import CreateQuestionAdminView from '../views/CreateQuestionAdminView.vue'
import CreateQuizAdminView from '../views/CreateQuizAdminView.vue'
import ListingQuizView from '@/views/ListingQuizView.vue'
import UpdateQuizView from '@/views/UpdateQuizView.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/s-enregistrer',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/tableau-de-bord',
    name: 'tableau',
    component: TableauDeBordAdminView,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/creer-question',
    name: 'createquestion',
    component: CreateQuestionAdminView
  },
  {
    path: '/creer-quiz',
    name: 'createquiz',
    component: CreateQuizAdminView,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/liste-quiz',
    name: 'listequiz',
    component: ListingQuizView
  },
  {
    path: '/modifier-quiz/:id',
    name: 'updatequiz',
    component: UpdateQuizView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  const store = useStore();
  const isLoggedIn = store.getters.isLoggedIn;
  const isAdmin = store.getters.isAdmin;

  // Vérification si la route nécessite une authentification
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Si l'utilisateur n'est pas connecté
    if (!isLoggedIn) {
      next('/login'); // Redirige vers la page de login si non authentifié
    } else {
      // Si la route nécessite un rôle d'admin
      if (to.matched.some(record => record.meta.requiresAdmin)) {
        // Si l'utilisateur n'est pas admin, redirige vers la page d'accueil
        if (!isAdmin) {
          next('/');
        } else {
          next(); // Autorise la navigation si l'utilisateur est admin
        }
      } else {
        next(); // Autorise la navigation si la route ne nécessite pas de rôle spécifique
      }
    }
  } else {
    next(); // Continue si la route ne nécessite pas d'authentification
  }
});
export default router
