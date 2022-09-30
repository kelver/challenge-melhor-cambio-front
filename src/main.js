import { createApp } from 'vue'
import 'bootstrap/scss/bootstrap.scss'
import './style.scss'
import { createPinia } from 'pinia'
import App from './App.vue'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import axios from './plugins/axios'

library.add(fas, far, fab)

const pinia = createPinia()
const app = createApp(App)
app.config.globalProperties.$http = axios;

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(pinia)
app.mount('#app')