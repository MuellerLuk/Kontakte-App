import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import NewContact from '../views/CreateNewContact.vue';
import contactDetails from '../views/contactDetails.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    props: true
  },
  {
    path: '/contactDetails/:contact',
    name: 'Detail',
    component: contactDetails,
    props: true
  },
  {
      path: '/new',
      name: 'New',
      component: NewContact
    }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
