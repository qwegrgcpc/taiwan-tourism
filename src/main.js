import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import router from './router'
import store from './store'
import breakpoints from './plugins/breakpoints'

createApp(App).use(store).use(router).use(breakpoints).mount('#app')
