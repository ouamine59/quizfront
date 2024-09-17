import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
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
    component: TableauDeBordAdminView
  },
  {
    path: '/creer-question',
    name: 'createquestion',
    component: CreateQuestionAdminView
  },
  {
    path: '/creer-quiz',
    name: 'createquiz',
    component: CreateQuizAdminView
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

export default router
