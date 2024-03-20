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
      props: { options },
    })
  }

  update(newOptions: Partial<NorticNewsletterOptions>) {
    this.app.$set({ options: mergeOptionsDeep(this.options, newOptions) })
  }

  destroy() {
    this.app.$destroy()
  }

  reset() {
    this.app.$set({ options: this.options })
  }
}

export default EmbeddedSubscriptionForm
