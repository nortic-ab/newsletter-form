import type { NorticNewsletterOptions, SubmitOptions, SubmitOptionsBase } from '@nortic/newsletter-form'

import { SubmissionForm } from './components'

export type { SubmissionFormOptions } from './components'

export { EmbeddedSubscriptionForm, submitSubscription } from '@nortic/newsletter-form'

export * from './composables'
export { SubmissionForm, SubmitOptions, SubmitOptionsBase, NorticNewsletterOptions }

export default SubmissionForm
