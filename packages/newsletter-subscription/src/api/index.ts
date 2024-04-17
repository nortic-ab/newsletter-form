import type { FormState, SubmitOptions, SubscribeResult } from '../types'

export class NewsletterSubscriptionError extends Error {
  errorCode: number
  status: number

  constructor(message: string, errorCode: number, status: number) {
    super(message)
    this.name = 'NewsletterSubscriptionError'
    this.errorCode = errorCode
    this.status = status
  }
}

export async function submitSubscription(newsletterId: string, payload: FormState, options?: SubmitOptions) {
  const resolvedOptions: Required<SubmitOptions> = {
    baseUrl: 'https://insight-api.nortic.se',
    ...options,
  }

  const result = await fetch(`${resolvedOptions.baseUrl}/public/newsletter/${newsletterId}/subscribe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((data) => {
        throw new NewsletterSubscriptionError(data.message, data.errorCode, res.status)
      })
    }
    else {
      return res.json() as Promise<SubscribeResult>
    }
  })

  return result
}
