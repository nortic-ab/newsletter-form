<script lang='ts'>
  import type { ComponentEvents } from 'svelte'
  import type { NorticNewsletterOptions } from './types'
  import SubscriptionForm from './lib/SubscriptionForm.svelte'
  import ThankYou from './lib/ThankYou.svelte'
  import { NewsletterSubscriptionError, submitSubscription } from './api'

  export let options: NorticNewsletterOptions

  let subscriptionFormInstance: SubscriptionForm
  let form: HTMLFormElement
  let formElementHeight: number
  let formElementWidth: number
  let formError: NewsletterSubscriptionError | Error | undefined
  let subscribeCompleted = false
  let isLoading = false

  export function toggleSubscribeCompleted(value = !subscribeCompleted) {
    if (!subscribeCompleted) {
      formElementHeight = form.offsetHeight
      formElementWidth = form.offsetWidth
    }

    subscribeCompleted = value
  }

  export function resetForm() {
    subscriptionFormInstance.resetFormState()
  }

  function _onSuccessfulSubmit() {
    options.onSuccess?.()
    toggleSubscribeCompleted(true)
  }

  function submit(...args: Parameters<typeof submitSubscription>) {
    if (options.demo)
      return new Promise(resolve => setTimeout(resolve, 1000))

    return submitSubscription(...args)
  }

  function submitHandler(event: ComponentEvents<SubscriptionForm>['submit']) {
    isLoading = true
    formError = undefined

    submit(options.newsletterId, event.detail, options.requestOptions)
      .then(_onSuccessfulSubmit)
      .catch((error: Error | NewsletterSubscriptionError) => {
        if (error instanceof NewsletterSubscriptionError && error.errorCode === 8) {
          _onSuccessfulSubmit()
        }
        else {
          options.onError?.(error)
          formError = error
        }
      })
      .finally(() => {
        isLoading = false
      })
  }
</script>

<div class='nortic-newsletter--wrapper'>
  {#if subscribeCompleted}
    <ThankYou
      style={formElementHeight ? `min-height: ${formElementHeight}px; width: ${formElementWidth}px;` : undefined}
      successTitle={options.texts?.successTitle}
      successDescription={options.texts?.successDescription}
    />
  {:else}
    <SubscriptionForm bind:formElement={form} bind:this={subscriptionFormInstance} {options} {formError} {isLoading} on:submit={submitHandler} />
  {/if}

  <p class='nortic-newsletter--affiliation'>Powered by <a href='https://nortic.se' target='_blank'><span class='nortic-newsletter--affiliation-logo' /></a></p>
</div>
