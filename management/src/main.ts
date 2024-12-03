import './assets/main.css'
import '@/assets/global.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import elementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(elementPlus)

app.mount('#app')
