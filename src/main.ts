import { createApp, Plugin } from 'vue'
import App from './App.vue'
import router from './router'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import '../main.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'



const app = createApp(App)
.use(router)
.use(Toast, {position: POSITION.BOTTOM_RIGHT})
.component('VueDatePicker', VueDatePicker)
.mount('#app')
