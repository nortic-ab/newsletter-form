import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173')
})

test.describe('Subscription form', () => {
  test.beforeEach(async ({ page }) => {
    page.evaluate(() => {
      const instance = new window.EmbeddedSubscriptionForm('#newsletter-form', {
        organizerId: '0',
        newsletterId: '0',
        demo: true,
      })

      window.norticFormInstance = instance
    })
  })

  test('has title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Subscribe to our newsletter' })).toBeVisible()
  })

  test('has email input', async ({ page }) => {
    await expect(page.getByPlaceholder('john.doe@example.com')).toBeVisible()
  })

  test('has first name input', async ({ page }) => {
    await expect(page.getByPlaceholder('John', { exact: true })).toBeVisible()
  })

  test('has last name input', async ({ page }) => {
    await expect(page.getByPlaceholder('Doe', { exact: true })).toBeVisible()
  })

  test('phone is hidden by default', async ({ page }) => {
    await expect(page.getByPlaceholder('+46 70 123 45 67', { exact: true })).not.toBeVisible()
  })

  test('submitting form with invalid email shows error', async ({ page }) => {
    await page.getByPlaceholder('john.doe@example.com').fill('invalid-email@a')
    await page.getByRole('button', { name: 'Subscribe' }).click()
    await expect(page.getByText('Please enter a valid email address')).toBeVisible()
  })

  test('submitting form with valid email shows success page', async ({ page }) => {
    await page.getByPlaceholder('john.doe@example.com').fill('john.doe@example.com')
    await page.getByRole('button', { name: 'Subscribe' }).click()
    await expect(page.getByText('Thank you for subscribing!')).toBeVisible()
  })

  test('updating form data should reflect in form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Subscribe to our newsletter' })).toBeVisible()

    await page.evaluate(() => {
      window.norticFormInstance.update({
        texts: {
          title: 'New title',
        },
      })
    })

    await expect(page.getByRole('heading', { name: 'New title' })).toBeVisible()
  })

  test('updating form should call onUpdated callback', async ({ page }) => {
    await page.evaluate(() => {
      window.norticFormInstance.update({
        onUpdate: () => {
          // Remove onUpdate callback to avoid infinite loop
          // eslint-disable-next-line ts/ban-ts-comment
          // @ts-expect-error
          delete window.norticFormInstance._options.onUpdate

          window.norticFormInstance.update({
            texts: {
              title: 'New title',
            },
          })
        },
      })
    })

    await expect(page.getByRole('heading', { name: 'New title' })).toBeVisible()
  })

  test('resetting form should reset input values', async ({ page }) => {
    await page.getByPlaceholder('john.doe@example.com').fill('testing@testing.com')

    await expect(page.getByPlaceholder('john.doe@example.com')).toHaveValue('testing@testing.com')

    await page.evaluate(() => {
      window.norticFormInstance.reset()
    })

    await expect(page.getByPlaceholder('john.doe@example.com')).toHaveValue('')
  })

  test('destorying instance should remove form', async ({ page }) => {
    await page.evaluate(() => {
      window.norticFormInstance.destroy()
    })

    await expect(page.getByRole('heading', { name: 'Subscribe to our newsletter' })).not.toBeVisible()
  })

  test('error message should be red', async ({ page }) => {
    await page.getByPlaceholder('john.doe@example.com').fill('a@b')

    await page.getByRole('button', { name: 'Subscribe' }).click()

    await expect(page.getByText('Please enter a valid email address')).toHaveCSS('color', 'rgb(255, 0, 0)')
  })
})
