import { EmbeddedSubscriptionForm } from './main'
import type { NorticNewsletterOptions } from './types'

const options: NorticNewsletterOptions = {
  newsletterId: '',
  texts: {
    title: 'nope',
    successTitle: 'Tackar tackar!',
    successDescription: 'Vi har skickat ett mail till dig. Kolla din inkorg och bekräfta prenumerationen.',
  },
  tags: ['svelte', 'nortic', 'newsletter', 'typescript'],
}

const app = new EmbeddedSubscriptionForm('#app', options)

setTimeout(() => {
  app.update({
    texts: {
      title: 'yep',
    },
  })
}, 5000)
