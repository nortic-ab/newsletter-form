import { EmbeddedSubscriptionForm, type NorticNewsletterOptions } from '@nortic/newsletter-form'
import type { MaybeRef } from 'vue'
import { computed, onBeforeUnmount, ref, unref, watch } from 'vue'
import '@nortic/newsletter-form/dist/index.css'

export function useNewsletterSubscriptionForm(element: MaybeRef<HTMLElement | undefined | null>, options: MaybeRef<NorticNewsletterOptions>) {
  const formInstance = ref<EmbeddedSubscriptionForm>()
  const submitted = ref(false)
  const error = ref<Error | null>(null)

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

  function onSuccess() {
    submitted.value = true
    error.value = null

    unref(options).onSuccess?.()
  }

  function onError(err: Error) {
    submitted.value = false
    error.value = err

    unref(options).onError?.(err)
  }

  function onReset() {
    submitted.value = false
    error.value = null

    unref(options).onReset?.()
  }

  function _toggleSubscribeCompleted(value?: boolean) {
    if (formInstance.value)
      formInstance.value._toggleSubscribeCompleted(value)
  }

  const resolvedOptions = computed(() => ({
    ...unref(options),
    onSuccess,
    onError,
    onReset,
  }))

  watch(() => unref(element), (el) => {
    if (el)
      formInstance.value = new EmbeddedSubscriptionForm(el, unref(resolvedOptions))
    else if (formInstance.value)
      destroy()
  }, {
    immediate: true,
  })

  watch(() => unref(options), (opts) => {
    if (formInstance.value)
      formInstance.value.update(opts)
  })

  onBeforeUnmount(() => {
    destroy()
  })

  return {
    formInstance,
    submitted,
    error,
    update,
    destroy,
    reset,
    _toggleSubscribeCompleted,
  }
}

export default useNewsletterSubscriptionForm
