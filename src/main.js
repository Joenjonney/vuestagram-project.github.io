import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import mitt from 'mitt'
import store from './store.js'

let emitter = mitt();
let app = createApp(App)
app.config.globalProperties.emitter = emitter;

app.use(createPinia())
app.use(router)

app.use(store).mount('#app')
