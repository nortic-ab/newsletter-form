interface DynamicValueMap {
  Boolean: boolean
  String: string
}

export type DynamicValue<K extends keyof DynamicValueMap = keyof DynamicValueMap> = {
  [Key in keyof DynamicValueMap]: {
    type: Key
    value: DynamicValueMap[Key]
  }
}[K]

export interface FetchResult<T> {
  data: T
}

export type SubscribeResult = FetchResult<{
  id: number
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  newsletterId: string
}>

export interface FormState<K extends keyof DynamicValueMap = keyof DynamicValueMap> {
  email: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  supportedDynamicValues: Record<string, DynamicValue<K>>
}

export interface SubmitOptions {
  baseUrl?: string
}

export type DeepRequired<T> = {
  [P in keyof T]-?: T extends Record<string, any> ? DeepRequired<T[P]> : T;
}

export type RequireProperties<T, K extends keyof T> = T & {
  [P in K]-?: T[P];
}

export interface SubmitOptions {
  baseUrl?: string
}

interface InputTexts {
  label?: string
  placeholder?: string
  validationError?: string
  hint?: string
}

export interface SubmitOptionsBase {
  newsletterId: string
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
  tags?: Array<string>
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
    tags?: Record<string, string>
  }
  requestOptions?: SubmitOptions
}
