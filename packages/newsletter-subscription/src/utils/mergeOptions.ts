import type { NorticNewsletterOptions } from '../types'

// The deep merge should support both arrays and objects.
export function mergeOptionsDeep(defaultOptions: NorticNewsletterOptions, options: Partial<NorticNewsletterOptions>) {
  const result: NorticNewsletterOptions = {
    ...defaultOptions,
    ...options,
    texts: {
      ...defaultOptions.texts,
      ...options.texts,
      emailInput: {
        ...defaultOptions.texts?.emailInput,
        ...options.texts?.emailInput,
      },
      firstNameInput: {
        ...defaultOptions.texts?.firstNameInput,
        ...options.texts?.firstNameInput,
      },
      lastNameInput: {
        ...defaultOptions.texts?.lastNameInput,
        ...options.texts?.lastNameInput,
      },
      phoneInput: {
        ...defaultOptions.texts?.phoneInput,
        ...options.texts?.phoneInput,
      },
    },
    requestOptions: {
      ...defaultOptions.requestOptions,
      ...options.requestOptions,
    },
    tags: (options.tags || []).length ? options.tags : defaultOptions.tags,
  }

  return result
}
