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

export async function submitSubscription(newsletterId: string, payload: SubmitPayload, options?: SubmitOptions) {
  const resolvedOptions: Required<SubmitOptions> = {
    baseUrl: 'https://insight-api.nortic.se',
    ...options,
  }

  const result = await fetch(`${resolvedOptions.baseUrl}/newsletter/${newsletterId}/subscribe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(payload),
  }).then((res) => {
    if (!res.ok)
      throw new Error(res.statusText)

    return res.json() as Promise<{ data: {
      id: number
      email: string
      firstName: string
      lastName: string
      phoneNumber: string
      newsletterId: string
    } }>
  })

  return result
}

export default submitSubscription
