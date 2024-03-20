<script lang='ts'>
  import type { ComponentEvents } from 'svelte'
  import type { NorticNewsletterOptions } from './types'
  import SubscriptionForm from './lib/SubscriptionForm.svelte'
  import ThankYou from './lib/ThankYou.svelte'

  export let options: NorticNewsletterOptions

  let formState: ComponentEvents<SubscriptionForm>['submit']['detail'] | undefined
  let form: HTMLFormElement
  let formElementHeight: number
  let formError: Error | undefined

  function submitHandler(event: ComponentEvents<SubscriptionForm>['submit']) {
    formElementHeight = form.offsetHeight
    formError = undefined

    if (event.detail.email === 'test@example.com') {
      formError = new Error('Form submission failed')

      return
    }

    formState = event.detail
  }
</script>

<div>
  {#if formState}
    <ThankYou
      style={formElementHeight ? `height: ${formElementHeight}px` : undefined}
      successTitle={options.texts?.successTitle}
      successDescription={options.texts?.successDescription}
    />
  {:else}
    <SubscriptionForm bind:formElement={form} options={options} formError={formError} on:submit={submitHandler} />
  {/if}

  <p>Powered by <a href='https://nortic.se' target='_blank'>Nortic</a></p>

  {#if formState}<pre><code>{JSON.stringify(formState, null, 2)}</code></pre>{/if}

</div>
