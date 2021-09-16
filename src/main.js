import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//事件总线
import bus from './bus'
// import VueBus from 'vue-bus';

const app = createApp(App)
// createApp(App).prototype.$bus = new Vue()

app.use(router)
app.mount('#app')
app.config.globalProperties.$bus = bus