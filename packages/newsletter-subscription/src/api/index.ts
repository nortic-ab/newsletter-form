import type { FormState, SubmitOptions, SubscribeResult } from '../types'

export const NewsletterErrorCode = {
  /** The email address is already subscribed to the newsletter */
  ALREADY_SUBSCRIBED: 'ALREADY_SUBSCRIBED',
  /** The request was malformed, e.g. a missing email or an invalid newsletter id */
  INVALID_REQUEST: 'INVALID_REQUEST',
  /** The page origin is not in the newsletter's list of allowed domains */
  ORIGIN_NOT_ALLOWED: 'ORIGIN_NOT_ALLOWED',
  /** No newsletter exists with the given id */
  NEWSLETTER_NOT_FOUND: 'NEWSLETTER_NOT_FOUND',
  /** Any other error, e.g. a server or network error */
  UNKNOWN: 'UNKNOWN',
} as const

// eslint-disable-next-line ts/no-redeclare
export type NewsletterErrorCode = typeof NewsletterErrorCode[keyof typeof NewsletterErrorCode]

// Numeric error code the API uses for "entity is not unique"
const API_ERROR_NOT_UNIQUE = 8

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function resolveErrorCode(status: number, errorCode: number): NewsletterErrorCode {
  if (status === 400 && errorCode === API_ERROR_NOT_UNIQUE)
    return NewsletterErrorCode.ALREADY_SUBSCRIBED
  if (status === 400)
    return NewsletterErrorCode.INVALID_REQUEST
  if (status === 403)
    return NewsletterErrorCode.ORIGIN_NOT_ALLOWED
  if (status === 404)
    return NewsletterErrorCode.NEWSLETTER_NOT_FOUND

  return NewsletterErrorCode.UNKNOWN
}

export class NewsletterSubscriptionError extends Error {
  /** Numeric error code from the API, -1 if none was given */
  errorCode: number
  /** HTTP status of the response, 0 if the request was rejected before it was sent */
  status: number
  code: NewsletterErrorCode

  constructor(message: string, errorCode: number, status: number, code: NewsletterErrorCode = resolveErrorCode(status, errorCode)) {
    super(message)
    this.name = 'NewsletterSubscriptionError'
    this.errorCode = errorCode
    this.status = status
    this.code = code
  }

  get isAlreadySubscribed() {
    return this.code === NewsletterErrorCode.ALREADY_SUBSCRIBED
  }
}

export function isAlreadySubscribedError(error: unknown): error is NewsletterSubscriptionError {
  return error instanceof NewsletterSubscriptionError && error.isAlreadySubscribed
}

function validateRequest(newsletterId: string, payload: FormState) {
  if (typeof newsletterId !== 'string' || !UUID_PATTERN.test(newsletterId))
    throw new NewsletterSubscriptionError(`Invalid newsletter id "${newsletterId}", expected a UUID`, -1, 0, NewsletterErrorCode.INVALID_REQUEST)

  if (!payload || typeof payload.email !== 'string' || !payload.email.trim())
    throw new NewsletterSubscriptionError('The payload must contain an email', -1, 0, NewsletterErrorCode.INVALID_REQUEST)
}

async function toSubscriptionError(res: Response) {
  const data = await res.json().catch(() => null)
  const message = data?.error || data?.message || `Subscription failed with status ${res.status}`
  const errorCode = typeof data?.errorCode === 'number' ? data.errorCode : -1

  return new NewsletterSubscriptionError(message, errorCode, res.status)
}

export async function submitSubscription(newsletterId: string, payload: FormState, options?: SubmitOptions) {
  validateRequest(newsletterId, payload)

  const resolvedOptions: Required<SubmitOptions> = {
    baseUrl: 'https://services.nortic.se/api/insight',
    ...options,
  }

  const res = await fetch(`${resolvedOptions.baseUrl}/public/newsletter/${newsletterId}/subscribe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok)
    throw await toSubscriptionError(res)

  return res.json() as Promise<SubscribeResult>
}
