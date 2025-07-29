import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { i18n, initLocale } from './i18n'
import { initTelegramWebApp } from './utils/telegram/twa'

// Initialize locale from localStorage if available
initLocale()

// Initialize Telegram Web App if running in Telegram
initTelegramWebApp()

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
