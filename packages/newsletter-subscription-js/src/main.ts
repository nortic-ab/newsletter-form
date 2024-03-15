import { EmbeddedSubscriptionForm } from './index'

window.EmbeddedSubscriptionForm = EmbeddedSubscriptionForm || {}

if (!navigator.webdriver) {
  setTimeout(() => {
    // eslint-disable-next-line no-new
    new window.EmbeddedSubscriptionForm('#newsletter-form', {
      newsletterId: 'a1eba6d6-c7a1-471e-b83f-52a12a748cd8',
      requestOptions: {
        baseUrl: 'https://d9sggogbgohj6.cloudfront.net',
      },
      showPhoneInput: true,
      texts: {
        successDescription: 'för att du prenumerar på vårt nyhetsbrev!',
        successTitle: 'Tack!',
      },
    })
  }, 100)
}
