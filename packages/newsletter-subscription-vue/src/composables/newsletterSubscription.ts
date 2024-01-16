import { EmbeddedSubscriptionForm, type NorticNewsletterOptions } from '@nortic/newsletter-form'
import type { MaybeRef } from 'vue'
import { ref, unref, watch } from 'vue'
import '@nortic/newsletter-form/dist/index.css'

export function useNewsletterSubscriptionForm(element: MaybeRef<HTMLElement | undefined | null>, options: MaybeRef<NorticNewsletterOptions>) {
  const formInstance = ref<EmbeddedSubscriptionForm>()

  function update(opts: NorticNewsletterOptions = unref(options)) {
    if (formInstance.value)
      formInstance.value.update(opts)
  }

  function destroy() {
    if (formInstance.value)
      formInstance.value.destroy()

    formInstance.value = undefined
  }

  function reset() {
    if (formInstance.value)
      formInstance.value.reset()
  }

  watch(() => unref(element), (el) => {
    if (el)
      formInstance.value = new EmbeddedSubscriptionForm(el, unref(options))
    else if (formInstance.value)
      destroy()
  }, {
    immediate: true,
  })

  watch(() => unref(options), (opts) => {
    if (formInstance.value)
      formInstance.value.update(opts)
  })

  return {
    update,
    destroy,
    reset,
    formInstance,
  }
}

export default useNewsletterSubscriptionForm
