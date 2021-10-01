import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import router from './router'
import Vue3TouchEvents from 'vue3-touch-events'

import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import ToastService from 'primevue/toastservice'
const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.use(ToastService)
app.use(Vue3TouchEvents)

app.mount('#app')
