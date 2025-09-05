// Used for tests only

import { EmbeddedSubscriptionForm } from '.'

window.EmbeddedSubscriptionForm = EmbeddedSubscriptionForm || {}

const test = new window.EmbeddedSubscriptionForm('#newsletter-form', {
  hideAffiliation: false,
  newsletterId: 'test-newsletter',
})
