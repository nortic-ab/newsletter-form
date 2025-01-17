import type { EmbeddedSubscriptionForm } from './src/index'

declare global {
  interface Window {
    EmbeddedSubscriptionForm: typeof EmbeddedSubscriptionForm
    norticFormInstance: EmbeddedSubscriptionForm
    usingPlaywright?: boolean
  }
}
