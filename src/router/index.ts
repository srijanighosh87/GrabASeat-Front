import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Bookings from '../pages/admin/Bookings.vue'
import Reservation from '../pages/admin/Reservation.vue'
import Home from '../pages/admin/Home.vue'
import UpdateReservation from '../pages/admin/UpdateReservation.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/', // Main page
    name: 'Home',
    component: Home
  },
  {
    path: '/bookings',
    name: 'Booking',
    component: Bookings
  },
  {
    path: '/reservation',
    name: 'Reservation',
    component: Reservation
  },
  {
    path: '/updatereservation/:id/edit',
    name: 'UpdateReservation',
    component: UpdateReservation
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
