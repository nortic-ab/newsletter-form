import type { EmbeddedSubscriptionForm } from './src/main'

declare global {
  interface Window {
    EmbeddedSubscriptionForm: typeof EmbeddedSubscriptionForm
    norticFormInstance: EmbeddedSubscriptionForm
    usingPlaywright?: boolean
  }
}
