import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// PrimeVue Imports
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

// PrimeVue Components Imports
import Button from 'primevue/button'
import SelectButton from 'primevue/selectbutton'
import FloatLabel from 'primevue/floatlabel'
import InputNumber from 'primevue/inputnumber'
import Message from 'primevue/message'
import FileUpload from 'primevue/fileupload'
import DataTable from 'primevue/datatable'

import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';


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
app.component('SelectButton', SelectButton)
app.component('FloatLabel', FloatLabel)
app.component('InputNumber', InputNumber)
app.component('Message', Message)
app.component('FileUpload', FileUpload)
app.component('DataTable', DataTable)
app.component('Accordion', Accordion)
app.component('AccordionPanel', AccordionPanel)
app.component('AccordionHeader', AccordionHeader)
app.component('AccordionContent', AccordionContent)

app.mount('#app')
