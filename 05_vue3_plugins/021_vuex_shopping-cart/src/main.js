import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import { currency } from './libs/currency.js'
import "./assets/global.css"

const app = createApp(App)
app.use(store)
app.mount('#app')
