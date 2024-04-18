// import './app.css'
import App from './App.svelte'
import type * as Types from './types'
import { mergeOptionsDeep } from './utils/mergeOptions'

export { NewsletterSubscriptionError, submitSubscription } from './api'

export type NorticNewsletterOptions = Types.NorticNewsletterOptions
export type SubmitOptions = Types.SubmitOptions
export type SubmitOptionsBase = Types.SubmitOptionsBase

export class EmbeddedSubscriptionForm {
  private app: App
  private options: Types.NorticNewsletterOptions

  constructor(target: string | HTMLElement, options: Types.NorticNewsletterOptions) {
    this.options = options
    const el = typeof target === 'string' ? document.querySelector(target) : target

    if (!el)
      throw new Error('Target not found')

    if (!(el instanceof HTMLElement))
      throw new Error('Target must be an HTMLElement')

    this.app = new App({
      target: el,
      props: { options: this.options },
    })
  }

  update(newOptions: Partial<Types.NorticNewsletterOptions>) {
    this.options = mergeOptionsDeep(this.options, newOptions)
    this.app.$set({ options: this.options })
    this.options.onUpdate?.()
  }

  destroy() {
    this.options.onDestroy?.()
    this.app.$destroy()
  }

  reset() {
    this.options.onReset?.()
    this.app.$set({ options: this.options })
    this.app.resetForm()
  }

  _toggleSubscribeCompleted(value?: boolean) {
    this.app.toggleSubscribeCompleted(value)
  }
}
