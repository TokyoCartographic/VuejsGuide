import { createApp } from 'vue'
import App from './App.vue'
// import App from './App.vue.org'
import store from './store'
// import { currency } from './libs/currency.js'
import "./assets/global.css"

createApp(App).use(store).mount('#app')
