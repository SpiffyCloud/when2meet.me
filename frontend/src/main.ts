import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import router from './router'
import Vue3TouchEvents from 'vue3-touch-events'
import * as Sentry from '@sentry/vue'
import { Integrations } from '@sentry/tracing'
import ToastService from 'primevue/toastservice'

import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

const app = createApp(App)

Sentry.init({
    app,
    dsn: 'https://c77177ce59ac40709faf65b0435847aa@o1033756.ingest.sentry.io/6000515',
    integrations: [
        new Integrations.BrowserTracing({
            routingInstrumentation: Sentry.vueRouterInstrumentation(router),
            tracingOrigins: [
                'localhost',
                'staging.when2meet.me',
                'when2meet.me',
                /^\//
            ]
        })
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0
})

app.use(router)
app.use(PrimeVue)
app.use(ToastService)
app.use(Vue3TouchEvents)

app.mount('#app')
