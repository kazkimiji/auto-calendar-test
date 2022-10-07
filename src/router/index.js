import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AutoCalendar from "@/views/AutoCalendar";
import AddContact from "@/views/AddContact";
import EditCalendar from "@/views/EditCalendar";
import ViewContact from "@/views/ViewContact";
import PageNotFound from "@/views/PageNotFound";

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: "/autocalendar",
    component: HomeView
  },
  {
    path: '/autocalendar',
    name: 'AutoCalendar',
    component: AutoCalendar
  },
  {
    path: '/contacts/add',
    name: 'AddContact',
    component: AddContact
  },
  {
    path: '/calendars/edit/:contactId',
    name: 'EditCalendar',
    component: EditCalendar
  },
  {
    path: '/contacts/view/:contactId',
    name: 'ViewContact',
    component: ViewContact
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    component: PageNotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
