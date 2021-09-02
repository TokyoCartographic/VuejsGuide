import { createRouter, createWebHistory } from "vue-router"

import Geographer from "../components/views/Geographer.vue"
import StandingLady from "../components/views/StandingLady.vue"

const routes = [
  { path: "/geographer", component: Geographer },
  { path: "/standinglady", component: StandingLady }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
