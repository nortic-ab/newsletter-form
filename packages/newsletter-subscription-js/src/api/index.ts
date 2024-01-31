export interface SubmitOptionsBase {
  newsletterId: string
}

export interface SubmitPayload {
  email: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
}

export interface SubmitOptions {
  baseUrl?: string
}

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

export async function submitSubscription(newsletterId: string, payload: SubmitPayload, options?: SubmitOptions) {
  const resolvedOptions: Required<SubmitOptions> = {
    baseUrl: 'https://insight-api.nortic.se',
    ...options,
  }

  const result = await fetch(`${resolvedOptions.baseUrl}/public/newsletter/${newsletterId}/subscribe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(payload),
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((data) => {
        throw new NewsletterSubscriptionError(data.message, data.errorCode, res.status)
      })
    }
    else {
      return res.json() as Promise<{ data: {
        id: number
        email: string
        firstName: string
        lastName: string
        phoneNumber: string
        newsletterId: string
      } }>
    }
  })

  return result
}

export default submitSubscription
