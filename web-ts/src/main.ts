import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import zh from './zh'


const app = createApp(App) 
app.use(router)
app.use(zh)
app.mount('#app')
