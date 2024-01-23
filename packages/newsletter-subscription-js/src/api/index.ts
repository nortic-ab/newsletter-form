export interface SubmitOptionsBase {
  newsletterId: number | string
}

export interface SubmitOptions extends SubmitOptionsBase {
  firstName?: string
  lastName?: string
  phoneNumber?: string
}

export async function submitSubscription(email: string, options: SubmitOptions) {
  const result = await fetch(`http://192.168.1.129:5000/api/insight/public/newsletter/${options.newsletterId}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify({
      email,
      ...options,
    }),
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
