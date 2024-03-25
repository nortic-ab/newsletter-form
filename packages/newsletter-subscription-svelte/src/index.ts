import { EmbeddedSubscriptionForm } from './main'
import type { NorticNewsletterOptions } from './types'

import './assets/style.css'

const options: NorticNewsletterOptions = {
  newsletterId: '',
  demo: false,
  showPhoneInput: true,
  texts: {
    successDescription: 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    emailInput: {
      hint: 'Hello world',
    },
  },
  tags: ['Svelte', 'Vite', 'TS'],
}

const app = new EmbeddedSubscriptionForm('#app', options)
