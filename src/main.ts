import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// PrimeVue Imports
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

// PrimeVue Components Imports
import Button from 'primevue/button'
import ToggleButton from 'primevue/togglebutton'
import FloatLabel from 'primevue/floatlabel'
import InputNumber from 'primevue/inputnumber'

// CSS Imports
import './assets/styles.css'
import 'primeicons/primeicons.css'

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.use(createPinia())
app.use(router)

app.component('Button', Button)
app.component('ToggleButton', ToggleButton)
app.component('FloatLabel', FloatLabel)
app.component('InputNumber', InputNumber)

app.mount('#app')
