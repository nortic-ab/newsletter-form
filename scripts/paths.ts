import path from 'node:path'
import * as url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const repoRoot = path.join(__dirname, '..')
export const packagesDir = path.join(repoRoot, 'packages')

export const norticNewsletterSubscriptionJSRoot = path.join(packagesDir, 'newsletter-subscription')
export const subscriptionJSSrc = path.join(norticNewsletterSubscriptionJSRoot, 'src')

export const norticNewsletterSubscriptionVueRoot = path.join(packagesDir, 'newsletter-subscription-vue')
export const subscriptionVueSrc = path.join(norticNewsletterSubscriptionVueRoot, 'src')
export const subscriptionVueComponentsDir = path.join(norticNewsletterSubscriptionVueRoot, 'src', 'components')
