import submitSubscription, { type SubmitOptions, type SubmitOptionsBase } from '../api'

import '../assets/style.css'

interface InputTexts {
  label?: string
  placeholder?: string
  validationError?: string
  hint?: string
}

interface NorticNewsletterOptions extends SubmitOptionsBase {
  showFirstNameInput?: boolean
  showLastNameInput?: boolean
  showPhoneInput?: boolean
  texts?: {
    title?: string
    description?: string
    submit?: string
    emailInput?: InputTexts
    firstNameInput?: InputTexts
    lastNameInput?: InputTexts
    phoneInput?: InputTexts
  }
}

export class EmbeddedSubscriptionForm {
  private _id: string
  private _rootEl: Element
  private _formWrapper: HTMLFormElement
  private _organizerId: number
  private _newsletterId: number
  private _isFormDirty: boolean = false
  private _options: NorticNewsletterOptions

  private static FORM_CLASS_NAME = 'n-newsletter-form'
  private static INPUT_CONTAINER_CLASS_NAME = 'n-newsletter-form__input-container'
  private static EMAIL_INPUT_CONTAINER_CLASS_NAME = 'n-newsletter-form__email-input-container'
  private static FIRST_NAME_INPUT_CONTAINER_CLASS_NAME = 'n-newsletter-form__first-name-input-container'
  private static LAST_NAME_INPUT_CONTAINER_CLASS_NAME = 'n-newsletter-form__last-name-input-container'
  private static PHONE_INPUT_CONTAINER_CLASS_NAME = 'n-newsletter-form__phone-input-container'
  private static INPUT_CONTAINER_HIDDEN_CLASS_NAME = 'n-newsletter-form__input-container--hidden'
  private static INPUT_LABEL_CLASS_NAME = 'n-newsletter-form__input-label'
  private static INPUT_CLASS_NAME = 'n-newsletter-form__input'
  private static INPUT_HINT_CLASS_NAME = 'n-newsletter-form__input-hint'
  private static INPUT_HINT_ERROR_CLASS_NAME = 'n-newsletter-form__input-hint--error'
  private static SUBMIT_BUTTON_CLASS_NAME = 'n-newsletter-form__submit'
  private static TITLE_CLASS_NAME = 'n-newsletter-form__title'
  private static DESCRIPTION_CLASS_NAME = 'n-newsletter-form__description'
  private static EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  public static submit(email: string, options: SubmitOptions) {
    submitSubscription(email, options)
  }

  constructor(el: string | HTMLElement, options: NorticNewsletterOptions) {
    const _el = typeof el === 'string' ? document.querySelector(el) : el

    if (!_el)
      throw new Error(`Element ${el} not found`)

    this._id = `nortic-form-${`${Math.floor(Math.random() * 1000000)}`.padStart(6, '0')}`
    this._options = options
    this._organizerId = options.organizerId
    this._newsletterId = options.newsletterId
    this._rootEl = _el
    this._formWrapper = this._createForm()

    this._rootEl.appendChild(this._formWrapper)

    this.update(options)
  }

  public update(options: NorticNewsletterOptions, reset: boolean = true) {
    this._options = options
    this._organizerId = options.organizerId
    this._newsletterId = options.newsletterId

    this._title.textContent = options.texts?.title ?? 'Subscribe to our newsletter'
    this._description.textContent = options.texts?.description ?? 'Subscribe to our newsletter and get the latest news and updates'
    this._submitButton.textContent = options.texts?.submit ?? 'Subscribe'
    this._emailInput.placeholder = options.texts?.emailInput?.placeholder ?? 'john.doe@example.com'
    this._emailLabel.textContent = options.texts?.emailInput?.label ?? 'Email *'
    this._emailHint.textContent = options.texts?.emailInput?.hint ?? '\u00A0'
    this._firstNameInput.placeholder = options.texts?.firstNameInput?.placeholder ?? 'John'
    this._firstNameLabel.textContent = options.texts?.firstNameInput?.label ?? 'First name'
    this._firstNameHint.textContent = options.texts?.firstNameInput?.hint ?? '\u00A0'
    this._lastNameInput.placeholder = options.texts?.lastNameInput?.placeholder ?? 'Doe'
    this._lastNameLabel.textContent = options.texts?.lastNameInput?.label ?? 'Last name'
    this._lastNameHint.textContent = options.texts?.lastNameInput?.hint ?? '\u00A0'
    this._phoneInput.placeholder = options.texts?.phoneInput?.placeholder ?? '+46 70 123 45 67'
    this._phoneLabel.textContent = options.texts?.phoneInput?.label ?? 'Phone'
    this._phoneHint.textContent = options.texts?.phoneInput?.hint ?? '\u00A0'

    if (options.showFirstNameInput) {
      this._firstNameContainer.classList.remove(EmbeddedSubscriptionForm.INPUT_CONTAINER_HIDDEN_CLASS_NAME)
    }
    else {
      this._firstNameContainer.classList.add(EmbeddedSubscriptionForm.INPUT_CONTAINER_HIDDEN_CLASS_NAME)
      this._firstNameInput.value = ''
    }

    if (options.showLastNameInput) {
      this._lastNameContainer.classList.remove(EmbeddedSubscriptionForm.INPUT_CONTAINER_HIDDEN_CLASS_NAME)
    }
    else {
      this._lastNameContainer.classList.add(EmbeddedSubscriptionForm.INPUT_CONTAINER_HIDDEN_CLASS_NAME)
      this._lastNameInput.value = ''
    }

    if (options.showPhoneInput) {
      this._phoneContainer.classList.remove(EmbeddedSubscriptionForm.INPUT_CONTAINER_HIDDEN_CLASS_NAME)
    }
    else {
      this._phoneContainer.classList.add(EmbeddedSubscriptionForm.INPUT_CONTAINER_HIDDEN_CLASS_NAME)
      this._phoneInput.value = ''
    }

    if (reset)
      this.reset()
  }

  public reset() {
    this._email = ''
    this._isFormDirty = false
    this._setEmailValidationMessage('')
  }

  public destroy() {
    this._rootEl.removeChild(this._formWrapper)
  }

  private _createInput() {
    const input = document.createElement('input')
    const label = document.createElement('label')
    const container = document.createElement('div')
    const hint = document.createElement('p')

    input.classList.add(EmbeddedSubscriptionForm.INPUT_CLASS_NAME)
    label.classList.add(EmbeddedSubscriptionForm.INPUT_LABEL_CLASS_NAME)
    container.classList.add(EmbeddedSubscriptionForm.INPUT_CONTAINER_CLASS_NAME)
    hint.classList.add(EmbeddedSubscriptionForm.INPUT_HINT_CLASS_NAME)

    container.appendChild(label)
    container.appendChild(input)
    container.appendChild(hint)

    return {
      input,
      label,
      container,
      hint,
    }
  }

  private _createForm() {
    const wrapper = document.createElement('form')
    const submitButton = document.createElement('button')
    const title = document.createElement('h2')
    const description = document.createElement('p')
    const {
      input: emailInput,
      container: emailContainer,
      hint: emailHint,
    } = this._createInput()
    const {
      container: firstNameContainer,
      input: firstNameInput,
    } = this._createInput()
    const {
      container: lastNameContainer,
      input: lastNameInput,
    } = this._createInput()
    const {
      container: phoneContainer,
      input: phoneInput,
    } = this._createInput()

    wrapper.classList.add(EmbeddedSubscriptionForm.FORM_CLASS_NAME)
    title.classList.add(EmbeddedSubscriptionForm.TITLE_CLASS_NAME)
    description.classList.add(EmbeddedSubscriptionForm.DESCRIPTION_CLASS_NAME)
    emailContainer.classList.add(EmbeddedSubscriptionForm.EMAIL_INPUT_CONTAINER_CLASS_NAME)
    emailInput.type = 'email'
    submitButton.classList.add(EmbeddedSubscriptionForm.SUBMIT_BUTTON_CLASS_NAME)
    emailHint.classList.add(EmbeddedSubscriptionForm.INPUT_HINT_ERROR_CLASS_NAME)
    firstNameContainer.classList.add(EmbeddedSubscriptionForm.INPUT_CONTAINER_HIDDEN_CLASS_NAME, EmbeddedSubscriptionForm.FIRST_NAME_INPUT_CONTAINER_CLASS_NAME)
    lastNameContainer.classList.add(EmbeddedSubscriptionForm.INPUT_CONTAINER_HIDDEN_CLASS_NAME, EmbeddedSubscriptionForm.LAST_NAME_INPUT_CONTAINER_CLASS_NAME)
    phoneContainer.classList.add(EmbeddedSubscriptionForm.INPUT_CONTAINER_HIDDEN_CLASS_NAME, EmbeddedSubscriptionForm.PHONE_INPUT_CONTAINER_CLASS_NAME)
    phoneInput.type = 'tel'

    wrapper.addEventListener('submit', (e) => {
      this._onSubmit(e)
    })

    emailInput.addEventListener('input', () => {
      this._email = emailInput.value
    })

    firstNameInput.addEventListener('input', () => {
      this._firstName = firstNameInput.value
    })

    lastNameInput.addEventListener('input', () => {
      this._lastName = lastNameInput.value
    })

    wrapper.appendChild(title)
    wrapper.appendChild(description)
    wrapper.appendChild(emailContainer)
    wrapper.appendChild(firstNameContainer)
    wrapper.appendChild(lastNameContainer)
    wrapper.appendChild(phoneContainer)
    wrapper.appendChild(submitButton)

    return wrapper
  }

  private get _email() {
    return this._emailInput.value
  }

  private set _email(value: string) {
    this._emailInput.value = value

    if (this._isFormDirty)
      this._validateEmailInput()
  }

  private get _firstName(): string | undefined {
    return this._firstNameInput.value || undefined
  }

  private set _firstName(value: string | undefined) {
    this._firstNameInput.value = value
  }

  private get _lastName(): string | undefined {
    return this._lastNameInput.value || undefined
  }

  private set _lastName(value: string | undefined) {
    this._lastNameInput.value = value
  }

  private get _phone(): string | undefined {
    return this._phoneInput.value || undefined
  }

  private set _phone(value: string | undefined) {
    this._phoneInput.value = value
  }

  private _setEmailValidationMessage(message?: string) {
    if (message) {
      this._emailHint.classList.add('n-newsletter-form__error--active')
      this._emailHint.textContent = message
    }
    else {
      this._emailHint.classList.remove('n-newsletter-form__error--active')
      this._emailHint.textContent = '\u00A0'
    }
  }

  private _validateEmailInput() {
    const isValid = EmbeddedSubscriptionForm.EMAIL_REGEX.test(this._email)

    if (!isValid)
      this._setEmailValidationMessage(this._options.texts?.emailInput.validationError || 'Please enter a valid email address')

    else
      this._setEmailValidationMessage()

    return isValid
  }

  private _onSubmit(e: Event) {
    e.preventDefault()

    this._isFormDirty = true

    const isValid = this._validateEmailInput()

    if (isValid) {
      EmbeddedSubscriptionForm.submit(this._email, {
        organizerId: this._organizerId,
        newsletterId: this._newsletterId,
        firstName: this._firstName,
        lastName: this._lastName,
        phone: this._phone,
      })
    }
  }

  private get _submitButton() {
    const submitButton = this._formWrapper?.querySelector(`.${EmbeddedSubscriptionForm.SUBMIT_BUTTON_CLASS_NAME}`)

    if (submitButton instanceof HTMLButtonElement)
      return submitButton

    throw new Error('Submit button not found')
  }

  private get _title() {
    const title = this._formWrapper.querySelector(`.${EmbeddedSubscriptionForm.TITLE_CLASS_NAME}`)

    if (title instanceof HTMLHeadingElement)
      return title

    throw new Error('Title not found')
  }

  private get _description() {
    const description = this._formWrapper?.querySelector(`.${EmbeddedSubscriptionForm.DESCRIPTION_CLASS_NAME}`)

    if (description instanceof HTMLParagraphElement)
      return description

    throw new Error('Description not found')
  }

  private get _emailContainer() {
    const emailContainer = this._formWrapper?.querySelector(`.${EmbeddedSubscriptionForm.EMAIL_INPUT_CONTAINER_CLASS_NAME}`)

    if (emailContainer instanceof HTMLDivElement)
      return emailContainer

    throw new Error('Email container not found')
  }

  private get _emailInput() {
    const emailInput = this._emailContainer?.querySelector('input')

    if (emailInput instanceof HTMLInputElement)
      return emailInput

    throw new Error('Email input not found')
  }

  private get _emailHint() {
    const emailHint = this._emailContainer?.querySelector(`.${EmbeddedSubscriptionForm.INPUT_HINT_CLASS_NAME}`)

    if (emailHint instanceof HTMLParagraphElement)
      return emailHint

    throw new Error('Email hint not found')
  }

  private get _emailLabel() {
    const emailLabel = this._emailContainer?.querySelector(`.${EmbeddedSubscriptionForm.INPUT_LABEL_CLASS_NAME}`)

    if (emailLabel instanceof HTMLLabelElement)
      return emailLabel

    throw new Error('Email label not found')
  }

  private get _firstNameContainer() {
    const firstNameContainer = this._formWrapper?.querySelector(`.${EmbeddedSubscriptionForm.FIRST_NAME_INPUT_CONTAINER_CLASS_NAME}`)

    if (firstNameContainer instanceof HTMLDivElement)
      return firstNameContainer

    throw new Error('First name container not found')
  }

  private get _firstNameInput() {
    const firstNameInput = this._firstNameContainer?.querySelector('input')

    if (firstNameInput instanceof HTMLInputElement)
      return firstNameInput

    throw new Error('First name input not found')
  }

  private get _firstNameHint() {
    const firstNameHint = this._firstNameContainer?.querySelector(`.${EmbeddedSubscriptionForm.INPUT_HINT_CLASS_NAME}`)

    if (firstNameHint instanceof HTMLParagraphElement)
      return firstNameHint

    throw new Error('First name hint not found')
  }

  private get _firstNameLabel() {
    const firstNameLabel = this._firstNameContainer?.querySelector(`.${EmbeddedSubscriptionForm.INPUT_LABEL_CLASS_NAME}`)

    if (firstNameLabel instanceof HTMLLabelElement)
      return firstNameLabel

    throw new Error('First name label not found')
  }

  private get _lastNameContainer() {
    const lastNameContainer = this._formWrapper?.querySelector(`.${EmbeddedSubscriptionForm.LAST_NAME_INPUT_CONTAINER_CLASS_NAME}`)

    if (lastNameContainer instanceof HTMLDivElement)
      return lastNameContainer

    throw new Error('Last name container not found')
  }

  private get _lastNameInput() {
    const lastNameInput = this._lastNameContainer?.querySelector('input')

    if (lastNameInput instanceof HTMLInputElement)
      return lastNameInput

    throw new Error('Last name input not found')
  }

  private get _lastNameHint() {
    const lastNameHint = this._lastNameContainer?.querySelector(`.${EmbeddedSubscriptionForm.INPUT_HINT_CLASS_NAME}`)

    if (lastNameHint instanceof HTMLParagraphElement)
      return lastNameHint

    throw new Error('Last name hint not found')
  }

  private get _lastNameLabel() {
    const lastNameLabel = this._lastNameContainer?.querySelector(`.${EmbeddedSubscriptionForm.INPUT_LABEL_CLASS_NAME}`)

    if (lastNameLabel instanceof HTMLLabelElement)
      return lastNameLabel

    throw new Error('Last name label not found')
  }

  private get _phoneContainer() {
    const phoneContainer = this._formWrapper?.querySelector(`.${EmbeddedSubscriptionForm.PHONE_INPUT_CONTAINER_CLASS_NAME}`)

    if (phoneContainer instanceof HTMLDivElement)
      return phoneContainer

    throw new Error('Phone container not found')
  }

  private get _phoneInput() {
    const phoneInput = this._phoneContainer?.querySelector('input')

    if (phoneInput instanceof HTMLInputElement)
      return phoneInput

    throw new Error('Phone input not found')
  }

  private get _phoneHint() {
    const phoneHint = this._phoneContainer?.querySelector(`.${EmbeddedSubscriptionForm.INPUT_HINT_CLASS_NAME}`)

    if (phoneHint instanceof HTMLParagraphElement)
      return phoneHint

    throw new Error('Phone hint not found')
  }

  private get _phoneLabel() {
    const phoneLabel = this._phoneContainer?.querySelector(`.${EmbeddedSubscriptionForm.INPUT_LABEL_CLASS_NAME}`)

    if (phoneLabel instanceof HTMLLabelElement)
      return phoneLabel

    throw new Error('Phone label not found')
  }
}
