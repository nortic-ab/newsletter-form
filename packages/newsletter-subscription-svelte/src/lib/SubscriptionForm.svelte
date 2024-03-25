<script lang='ts'>
  import { createEventDispatcher } from 'svelte'
  import { DEFAULT_OPTIONS } from '../constants/defaultOptions'
  import type { FormState, NorticNewsletterOptions } from '../types'
  import FormInput from './FormInput.svelte'

  const dispatch = createEventDispatcher<{
    submit: FormState
  }>()

  export let formElement: HTMLFormElement
  export let options: NorticNewsletterOptions
  export let formError: Error | null = null
  export let isLoading = false

  let emailError: string | undefined

  $: title = options?.texts?.title || DEFAULT_OPTIONS.texts.title
  $: description = options?.texts?.description || DEFAULT_OPTIONS.texts.description
  $: emailTexts = {
    ...DEFAULT_OPTIONS.texts.emailInput,
    ...options?.texts?.emailInput,
  }
  $: firstNameTexts = {
    ...DEFAULT_OPTIONS.texts.firstNameInput,
    ...options?.texts?.firstNameInput,
  }
  $: lastNameTexts = {
    ...DEFAULT_OPTIONS.texts.lastNameInput,
    ...options?.texts?.lastNameInput,
  }
  $: phoneTexts = {
    ...DEFAULT_OPTIONS.texts.phoneInput,
    ...options?.texts?.phoneInput,
  }
  $: isFirstNameVisible = options?.showFirstNameInput ?? DEFAULT_OPTIONS.showFirstNameInput
  $: isLastNameVisible = options?.showLastNameInput ?? DEFAULT_OPTIONS.showLastNameInput
  $: isPhoneVisible = options?.showPhoneInput ?? DEFAULT_OPTIONS.showPhoneInput

  $: tags = (options?.tags || DEFAULT_OPTIONS.tags)
  $: tagsTitle = options?.texts?.tagsTitle || DEFAULT_OPTIONS.texts.tagsTitle
  $: tagsCaptions = options?.texts?.tags || DEFAULT_OPTIONS.texts.tags

  $: submitText = options?.texts?.submit || DEFAULT_OPTIONS.texts.submit

  const formState: Required<FormState> = {
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    tags: {},
  }

  // A reactive statement to ensure formState.tags updates reactively
  $: formState.tags = tags.reduce((acc, tag) => {
    // Use the current value if it exists to avoid resetting the checkbox state
    acc[tag] = { type: 'boolean', value: acc[tag]?.value || false }

    return acc
  }, formState.tags)

  function validateEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    return emailRegex.test(formState.email)
  }

  function validateAndResetEmailError() {
    if (validateEmail())
      emailError = undefined
  }

  function submitHandler(event: Event) {
    event.preventDefault()

    if (!validateEmail()) {
      emailError = emailTexts.validationError

      return
    }

    dispatch('submit', {
      email: formState.email,
      firstName: formState.firstName || undefined,
      lastName: formState.lastName || undefined,
      phoneNumber: formState.phoneNumber || undefined,
      tags: formState.tags,
    })
  }
</script>

<form on:submit={submitHandler} bind:this={formElement}>
  <h2 class='nortic--title'>{title}</h2>
  <p class='nortic--subtitle'>{description}</p>

  <div>
    <FormInput
      bind:value={formState.email}
      placeholder={emailTexts.placeholder}
      label={emailTexts.label}
      hint={emailTexts.hint}
      errorMessage={emailError}
      required={true}
      id='nortic-form-email'
      on:input={validateAndResetEmailError}
    />

    {#if isFirstNameVisible}
      <FormInput
        bind:value={formState.firstName}
        placeholder={firstNameTexts.placeholder}
        label={firstNameTexts.label}
        hint={firstNameTexts.hint}
        required={false}
        id='nortic-form-first-name'
      />
    {/if}

    {#if isLastNameVisible}
      <FormInput
        bind:value={formState.lastName}
        placeholder={lastNameTexts.placeholder}
        label={lastNameTexts.label}
        hint={lastNameTexts.hint}
        required={false}
        id='nortic-form-last-name'
      />
    {/if}

    {#if isPhoneVisible}
      <FormInput
        bind:value={formState.phoneNumber}
        placeholder={phoneTexts.placeholder}
        label={phoneTexts.label}
        hint={phoneTexts.hint}
        required={false}
        id='nortic-form-phone'
      />
    {/if}
  </div>

  {#if tags.length > 0}
    <div class='nortic--tag-wrapper'>
      <p class='nortic--tag-title'>{tagsTitle}</p>

      {#each tags as tag}
        <div>
          <label>
            <input type='checkbox' bind:checked={formState.tags[tag].value} />
            {tagsCaptions[tag] || tag}
          </label>
        </div>
      {/each}
    </div>
  {/if}

  <div>
    <button class='nortic--subscribe-btn' disabled={isLoading}><span>{submitText}</span>{#if isLoading}<span class='nortic--loading-spinner' />{/if}</button>
  </div>

  {#if formError}
    <div class='nortic--form-error-wrapper'>
      <p>{options.texts?.genericErrorMessage || DEFAULT_OPTIONS.texts.genericErrorMessage}</p>
    </div>
  {/if}
</form>
