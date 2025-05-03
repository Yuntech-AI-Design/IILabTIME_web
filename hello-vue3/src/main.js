import '@/assets/tailwind.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faHome, faSignInAlt, faUserPlus, faGraduationCap, 
  faBriefcase, faCalendarCheck, faTrophy, faFileAlt, 
  faComments, faQuestionCircle, faSignOutAlt, faUser,
  fas
} from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import { typeWriterLoop } from './directives/typeWriter'
import { typingAnimation } from './directives/typingAnimation'
import { CharBounce } from './directives/AllCharBounce'

library.add(
  faHome, faSignInAlt, faUserPlus, faGraduationCap, 
  faBriefcase, faCalendarCheck, faTrophy, faFileAlt, 
  faComments, faQuestionCircle, faSignOutAlt, faUser,
  fab, fas
)


const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.directive('typeWriterLoop', typingAnimation)
app.directive('allCharBounce', CharBounce)
app.use(router)
app.use(store)
app.mount('#app')