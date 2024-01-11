export interface SubmitOptionsBase {
  newsletterId: number
  organizerId: number
}

export interface SubmitOptions extends SubmitOptionsBase {
  firstName?: string
  lastName?: string
  phone?: string
}

export async function submitSubscription(email: string, options: SubmitOptions) {
  // TODO: Implement
  await Promise.resolve().then(() => {
    console.info(`Submitting ${email} with options ${options}`)

    return true
  })
}

export default submitSubscription
