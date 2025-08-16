import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import AboutPage from '../pages/AboutPage.vue'
import ProjectsPage from '../pages/ProjectsPage.vue'
import ContactPage from '../pages/ContactPage.vue'

const routes = [
  { path: '/', name: 'HomePage', component: HomePage },
  { path: '/about', name: 'AboutPage', component: AboutPage },
  { path: '/projects', name: 'ProjectsPage', component: ProjectsPage },
  { path: '/contact', name: 'ContactPage', component: ContactPage },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
