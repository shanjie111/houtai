import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import pinia from './stores'

const app = createApp(App)
app.use(pinia)

app.use(createPinia())
app.use(router)

app.mount('#app')
