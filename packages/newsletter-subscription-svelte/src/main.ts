// import './app.css'
import App from './App.svelte'
import type { NorticNewsletterOptions } from './types'
import { mergeOptionsDeep } from './utils/mergeOptions'

export class EmbeddedSubscriptionForm {
  private app: App
  private options: NorticNewsletterOptions

  constructor(target: string | HTMLElement, options: NorticNewsletterOptions) {
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

  update(newOptions: Partial<NorticNewsletterOptions>) {
    this.options = mergeOptionsDeep(this.options, newOptions)
    this.app.$set({ options: this.options })
  }

  destroy() {
    this.options.onDestroy?.()
    this.app.$destroy()
  }

  reset() {
    this.options.onReset?.()
    this.app.$set({ options: this.options })
  }
}

export default EmbeddedSubscriptionForm
