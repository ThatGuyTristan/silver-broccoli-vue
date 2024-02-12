import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

const vuetify = createVuetify({ theme: { defaultTheme: 'dark' }});
const app = createApp(App)

app
    .use(createPinia())
    .use(VueAxios, axios)
    .use(vuetify)

app.mount('#app')
