import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faHome, faSignInAlt, faUserPlus, faGraduationCap, 
  faBriefcase, faCalendarCheck, faTrophy, faFileAlt, 
  faComments, faQuestionCircle, faSignOutAlt, faUser 
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faHome, faSignInAlt, faUserPlus, faGraduationCap, 
  faBriefcase, faCalendarCheck, faTrophy, faFileAlt, 
  faComments, faQuestionCircle, faSignOutAlt, faUser
)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(store)
app.mount('#app')