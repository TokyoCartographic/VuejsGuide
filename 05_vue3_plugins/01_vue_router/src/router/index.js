import { createRouter, createWebHistory } from "vue-router"

import Geographer from "../components/views/Geographer.vue"
import StandingLady from "../components/views/StandingLady.vue"

const routes = [
  {
    path: "/geographer",
    name: "geographer",
    component: Geographer
  },
  {
    path: "/standinglady",
    name: "standinglady",
    component: StandingLady
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
