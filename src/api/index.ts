export interface SubmitOptionsBase {
  newsletterId: number
  organizerId: number
}

export interface SubmitOptions extends SubmitOptionsBase {
  firstName?: string
  lastName?: string
  phone?: string
}

export function submitSubscription(email: string, options: SubmitOptions) {
  // TODO: Implement
  console.info(`Submitting ${email} with options ${options}`)
}

export default submitSubscription
