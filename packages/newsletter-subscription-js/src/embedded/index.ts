import submitSubscription, { NewsletterSubscriptionError, type SubmitOptions, type SubmitOptionsBase, type SubmitPayload } from '../api'

interface InputTexts {
  label?: string
  placeholder?: string
  validationError?: string
  hint?: string
}

export interface NorticNewsletterOptions extends SubmitOptionsBase {
  onSuccess?: () => void
  onError?: (error: Error) => void
  onReset?: () => void
  onUpdate?: () => void
  onDestroy?: () => void
  demo?: boolean
  showFirstNameInput?: boolean
  showLastNameInput?: boolean
  showPhoneInput?: boolean
  hideSubmissionError?: boolean
  texts?: {
    title?: string
    description?: string
    submit?: string
    emailInput?: InputTexts
    firstNameInput?: InputTexts
    lastNameInput?: InputTexts
    phoneInput?: InputTexts
    acceptTermsLabel?: string
    successTitle?: string
    successDescription?: string
    genericErrorMessage?: string
    tagsTitle?: string
  }
  tags?: Array<{
    value: string
    label?: string
  } | string>
  requestOptions?: SubmitOptions
}

function linkToHTML(text: string) {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g
  return text.replace(regex, '<a href="$2" target="_blank">$1</a>')
}

export class EmbeddedSubscriptionForm {
  private _rootEl: Element
  private _formWrapper: HTMLFormElement
  private _newsletterId: string
  private _isFormDirty: boolean = false
  private _options: NorticNewsletterOptions
  private _tags: NonNullable<NorticNewsletterOptions['tags']>

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
  private static TERMS_CLASS_NAME = 'n-newsletter-form__terms'
  private static TERMS_HIDDEN_CLASS_NAME = 'n-newsletter-form__terms--hidden'
  private static TITLE_CLASS_NAME = 'n-newsletter-form__title'
  private static DESCRIPTION_CLASS_NAME = 'n-newsletter-form__description'
  private static SUCCESS_WRAPPER_CLASS_NAME = 'n-newsletter-form__success-wrapper'
  private static SUCCESS_WRAPPER_HIDDEN_CLASS_NAME = 'n-newsletter-form__success-wrapper--hidden'
  private static SUCCESS_TITLE_CLASS_NAME = 'n-newsletter-form__success-title'
  private static SUCCESS_DESCRIPTION_CLASS_NAME = 'n-newsletter-form__success-description'
  private static AFFILIATION_TAG = 'n-newsletter-form_affiliation'
  private static TAGS_WRAPPER_CLASS_NAME = 'n-newsletter-form__tags'
  private static TAGS_HIDDEN_CLASS_NAME = 'n-newsletter-form__tags--hidden'
  private static TAGS_TITLE_CLASS_NAME = 'n-newsletter-form__tags-title'
  private static TAG_CLASS_NAME = 'n-newsletter-form__tag'
  private static EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  public static submit(id: string, payload: SubmitPayload, options?: SubmitOptions) {
    return submitSubscription(id, payload, options)
  }

  constructor(el: string | HTMLElement, options: NorticNewsletterOptions) {
    const _el = typeof el === 'string' ? document.querySelector(el) : el

    if (!_el)
      throw new Error(`Element ${el} not found`)

    this._options = options
    this._newsletterId = options.newsletterId
    this._rootEl = _el
    this._tags = options.tags ?? []
    this._formWrapper = this._createForm()

    this._rootEl.appendChild(this._formWrapper)

    this.update(options)
  }

  private _createTag(tag: NonNullable<NorticNewsletterOptions['tags']>[number]) {
    const tagEl = document.createElement('div')
    const input = document.createElement('input')
    const label = document.createElement('label')

    tagEl.classList.add(EmbeddedSubscriptionForm.TAG_CLASS_NAME)

    const tagValue = typeof tag === 'string' ? tag : tag.value
    const tagLabel = (typeof tag === 'string' ? tag : tag.label) ?? tagValue

    input.type = 'checkbox'
    input.name = `tag-${tagValue}`
    input.id = `tag-${tagValue}`
    input.value = tagValue
    label.textContent = tagLabel
    label.htmlFor = `tag-${tagValue}`

    tagEl.appendChild(input)
    tagEl.appendChild(label)

    return tagEl
  }

  public update(options: Partial<NorticNewsletterOptions>) {
    this._options = {
      newsletterId: this._newsletterId,
      demo: this._options.demo,
      ...options,
    }

    this._newsletterId = this._options.newsletterId

    this._title.textContent = this._options.texts?.title ?? 'Prenumerera på vårt nyhetsbrev'
    this._description.textContent = this._options.texts?.description ?? 'Prenumerera på vårt nyhetsbrev för att få information om kommande evenemang och erbjudanden.'
    this._submitButton.textContent = this._options.texts?.submit ?? 'Prenumerera'
    this._emailInput.placeholder = this._options.texts?.emailInput?.placeholder ?? 'john.doe@example.com'
    this._emailLabel.textContent = `${this._options.texts?.emailInput?.label ?? 'E-post'} *`
    this._emailHint.textContent = this._options.texts?.emailInput?.hint ?? '\u00A0'
    this._firstNameInput.placeholder = this._options.texts?.firstNameInput?.placeholder ?? 'John'
    this._firstNameLabel.textContent = this._options.texts?.firstNameInput?.label ?? 'Förnamn'
    this._firstNameHint.textContent = this._options.texts?.firstNameInput?.hint ?? '\u00A0'
    this._lastNameInput.placeholder = this._options.texts?.lastNameInput?.placeholder ?? 'Doe'
    this._lastNameLabel.textContent = this._options.texts?.lastNameInput?.label ?? 'Efternamn'
    this._lastNameHint.textContent = this._options.texts?.lastNameInput?.hint ?? '\u00A0'
    this._phoneInput.placeholder = this._options.texts?.phoneInput?.placeholder ?? '+46 70 123 45 67'
    this._phoneLabel.textContent = this._options.texts?.phoneInput?.label ?? 'Telefonnummer'
    this._successTitle.textContent = this._options.texts?.successTitle ?? 'Tack för att du prenumererar!'
    this._successDescription.textContent = this._options.texts?.successDescription ?? ''
    this._phoneHint.textContent = this._options.texts?.phoneInput?.hint ?? '\u00A0'
    this._terms.innerHTML = linkToHTML(this._options.texts?.acceptTermsLabel ?? '')

    if (options.showFirstNameInput ?? true) {
      this._firstNameContainer.classList.remove(EmbeddedSubscriptionForm.INPUT_CONTAINER_HIDDEN_CLASS_NAME)
    }
    else {
      this._firstNameContainer.classList.add(EmbeddedSubscriptionForm.INPUT_CONTAINER_HIDDEN_CLASS_NAME)
      this._firstNameInput.value = ''
    }

    if (options.showLastNameInput ?? true) {
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

    if (this._terms.innerHTML === '')
      this._terms.classList.add(EmbeddedSubscriptionForm.TERMS_HIDDEN_CLASS_NAME)
    else
      this._terms.classList.remove(EmbeddedSubscriptionForm.TERMS_HIDDEN_CLASS_NAME)

    if (this._options.onUpdate)
      this._options.onUpdate()

    this._tagsWrapper.innerHTML = ''
    const tagElements = this._tags.map(tag => this._createTag(tag))

    if (tagElements.length > 0) {
      const title = document.createElement('h3')
      title.classList.add(EmbeddedSubscriptionForm.TAGS_TITLE_CLASS_NAME)
      title.textContent = this._options.texts?.tagsTitle ?? 'Välj dina intressen:'

      this._tagsWrapper.appendChild(title)

      tagElements.forEach((tagEl) => {
        this._tagsWrapper.appendChild(tagEl)
      })

      this._tagsWrapper.classList.remove(EmbeddedSubscriptionForm.TAGS_HIDDEN_CLASS_NAME)
    }
    else {
      this._tagsWrapper.classList.add(EmbeddedSubscriptionForm.TAGS_HIDDEN_CLASS_NAME)
    }
  }

  public reset() {
    this._email = ''
    this._firstName = ''
    this._lastName = ''
    this._phone = ''
    this._isFormDirty = false
    this._setEmailValidationMessage('')
    this._successWrapper.classList.add(EmbeddedSubscriptionForm.SUCCESS_WRAPPER_HIDDEN_CLASS_NAME)

    if (this._options.onReset)
      this._options.onReset()

    this.update(this._options)
  }

  public destroy() {
    this._rootEl.removeChild(this._formWrapper)

    if (this._options.onDestroy)
      this._options.onDestroy()
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
    const terms = document.createElement('p')
    const submitButton = document.createElement('button')
    const title = document.createElement('h2')
    const description = document.createElement('p')
    const {
      input: emailInput,
      container: emailContainer,
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
    const successWrapper = document.createElement('div')
    const successTitle = document.createElement('h2')
    const successDescription = document.createElement('p')
    const affiliationTag = document.createElement('p')
    const tagsWrapper = document.createElement('div')

    wrapper.classList.add(EmbeddedSubscriptionForm.FORM_CLASS_NAME)
    title.classList.add(EmbeddedSubscriptionForm.TITLE_CLASS_NAME)
    description.classList.add(EmbeddedSubscriptionForm.DESCRIPTION_CLASS_NAME)
    emailContainer.classList.add(EmbeddedSubscriptionForm.EMAIL_INPUT_CONTAINER_CLASS_NAME)
    emailInput.type = 'email'
    submitButton.classList.add(EmbeddedSubscriptionForm.SUBMIT_BUTTON_CLASS_NAME)
    submitButton.type = 'submit'
    firstNameContainer.classList.add(EmbeddedSubscriptionForm.INPUT_CONTAINER_HIDDEN_CLASS_NAME, EmbeddedSubscriptionForm.FIRST_NAME_INPUT_CONTAINER_CLASS_NAME)
    lastNameContainer.classList.add(EmbeddedSubscriptionForm.INPUT_CONTAINER_HIDDEN_CLASS_NAME, EmbeddedSubscriptionForm.LAST_NAME_INPUT_CONTAINER_CLASS_NAME)
    phoneContainer.classList.add(EmbeddedSubscriptionForm.INPUT_CONTAINER_HIDDEN_CLASS_NAME, EmbeddedSubscriptionForm.PHONE_INPUT_CONTAINER_CLASS_NAME)
    successWrapper.classList.add(EmbeddedSubscriptionForm.SUCCESS_WRAPPER_CLASS_NAME, EmbeddedSubscriptionForm.SUCCESS_WRAPPER_HIDDEN_CLASS_NAME)
    successTitle.classList.add(EmbeddedSubscriptionForm.SUCCESS_TITLE_CLASS_NAME)
    successDescription.classList.add(EmbeddedSubscriptionForm.SUCCESS_DESCRIPTION_CLASS_NAME)
    phoneInput.type = 'tel'
    terms.classList.add(EmbeddedSubscriptionForm.TERMS_CLASS_NAME)
    affiliationTag.classList.add(EmbeddedSubscriptionForm.AFFILIATION_TAG)
    affiliationTag.innerHTML = 'Powered by <a href="https://nortic.se" target="_blank">Nortic</a>'
    tagsWrapper.classList.add(EmbeddedSubscriptionForm.TAGS_WRAPPER_CLASS_NAME, EmbeddedSubscriptionForm.TAGS_HIDDEN_CLASS_NAME)

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
    wrapper.appendChild(tagsWrapper)
    wrapper.appendChild(terms)
    wrapper.appendChild(submitButton)
    successWrapper.appendChild(successTitle)
    successWrapper.appendChild(successDescription)
    wrapper.appendChild(successWrapper)
    wrapper.appendChild(affiliationTag)

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
    this._firstNameInput.value = value ?? ''
  }

  private get _lastName(): string | undefined {
    return this._lastNameInput.value || undefined
  }

  private set _lastName(value: string | undefined) {
    this._lastNameInput.value = value ?? ''
  }

  private get _phone(): string | undefined {
    return this._phoneInput.value || undefined
  }

  private set _phone(value: string | undefined) {
    this._phoneInput.value = value ?? ''
  }

  private _setEmailValidationMessage(message?: string) {
    if (message) {
      this._emailHint.classList.add(EmbeddedSubscriptionForm.INPUT_HINT_ERROR_CLASS_NAME)
      this._emailHint.textContent = message
    }
    else {
      this._emailHint.classList.remove(EmbeddedSubscriptionForm.INPUT_HINT_ERROR_CLASS_NAME)
      this._emailHint.textContent = '\u00A0'
    }
  }

  private _validateEmailInput() {
    const isValid = EmbeddedSubscriptionForm.EMAIL_REGEX.test(this._email)

    if (!isValid)
      this._setEmailValidationMessage(this._options.texts?.emailInput?.validationError ?? 'Vänligen ange en giltig e-postadress')

    else
      this._setEmailValidationMessage()

    return isValid
  }

  private _doRequest() {
    return this._options.demo
      ? Promise.resolve()
      : EmbeddedSubscriptionForm.submit(this._newsletterId, {
        email: this._email,
        firstName: this._firstName,
        lastName: this._lastName,
        phoneNumber: this._phone,
      }, this._options.requestOptions)
  }

  private _onSuccessfulSubmit(that: EmbeddedSubscriptionForm) {
    that._successWrapper.style.opacity = '0'

    if (that._options.onSuccess)
      that._options.onSuccess()

    window.requestAnimationFrame(() => {
      that._successWrapper.classList.remove(EmbeddedSubscriptionForm.SUCCESS_WRAPPER_HIDDEN_CLASS_NAME)

      window.requestAnimationFrame(() => {
        that._successWrapper.style.removeProperty('opacity')
      })
    })
  }

  private _onSubmit(e: Event) {
    e.preventDefault()

    const ERROR_CLASS = 'n-newsletter-form__error'

    // Remove previous errors
    const errors = this._formWrapper.querySelectorAll(`.${ERROR_CLASS}`)

    errors.forEach((el) => {
      el.parentNode?.removeChild(el)
    })

    this._isFormDirty = true

    const isValid = this._validateEmailInput()

    const tags = this._tagsWrapper.querySelectorAll(`.${EmbeddedSubscriptionForm.TAG_CLASS_NAME} input`)

    console.log(tags)

    const tagValues = Array.from(tags).filter((tag): tag is HTMLInputElement => {
      return tag instanceof HTMLInputElement
    }).reduce((agg, el): Record<string, { value: boolean, type: 'Boolean' }> => {
      const isSelected = el.checked
      const value = el.value

      return {
        ...agg,
        [value]: {
          value: isSelected,
          type: 'Boolean',
        },
      }
    }, {})

    console.log(JSON.stringify(tagValues, null, 2))

    if (isValid) {
      this._doRequest().then(() => this._onSuccessfulSubmit(this)).catch((e: NewsletterSubscriptionError | Error) => {
        if (e instanceof NewsletterSubscriptionError && e.errorCode === 8) {
          this._onSuccessfulSubmit(this)
        }
        else if (!this._options.hideSubmissionError) {
          const error = document.createElement('p')
          error.classList.add(ERROR_CLASS)
          error.textContent = this._options.texts?.genericErrorMessage ?? 'Ett fel uppstod. Vänligen försök igen senare.'

          this._submitButton.parentNode?.insertBefore(error, this._submitButton.nextSibling)
        }

        if (this._options.onError)
          this._options.onError(e)
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

  private get _terms() {
    const terms = this._formWrapper?.querySelector(`.${EmbeddedSubscriptionForm.TERMS_CLASS_NAME}`)

    if (terms instanceof HTMLParagraphElement)
      return terms

    throw new Error('Terms not found')
  }

  private get _successWrapper() {
    const successWrapper = this._formWrapper?.querySelector(`.${EmbeddedSubscriptionForm.SUCCESS_WRAPPER_CLASS_NAME}`)

    if (successWrapper instanceof HTMLDivElement)
      return successWrapper

    throw new Error('Success wrapper not found')
  }

  private get _successTitle() {
    const successTitle = this._successWrapper?.querySelector(`.${EmbeddedSubscriptionForm.SUCCESS_TITLE_CLASS_NAME}`)

    if (successTitle instanceof HTMLHeadingElement)
      return successTitle

    throw new Error('Success title not found')
  }

  private get _successDescription() {
    const successDescription = this._successWrapper?.querySelector(`.${EmbeddedSubscriptionForm.SUCCESS_DESCRIPTION_CLASS_NAME}`)

    if (successDescription instanceof HTMLParagraphElement)
      return successDescription

    throw new Error('Success description not found')
  }

  private get _tagsWrapper() {
    const tagsWrapper = this._formWrapper?.querySelector(`.${EmbeddedSubscriptionForm.TAGS_WRAPPER_CLASS_NAME}`)

    if (tagsWrapper instanceof HTMLDivElement)
      return tagsWrapper

    throw new Error('Tags wrapper not found')
  }
}
