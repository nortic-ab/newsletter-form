import type { EmbeddedSubscriptionForm } from './src/embedded'

declare global {
  interface Window {
    EmbeddedSubscriptionForm: typeof EmbeddedSubscriptionForm
    norticFormInstance: EmbeddedSubscriptionForm
  }
}
