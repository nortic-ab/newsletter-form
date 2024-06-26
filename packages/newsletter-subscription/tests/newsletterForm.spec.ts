import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test.describe('Subscription form', () => {
  test.beforeEach(async ({ page }) => {
    page.evaluate(() => {
      const instance = new window.EmbeddedSubscriptionForm('#newsletter-form', {
        newsletterId: '0',
        demo: true,
      })

      window.norticFormInstance = instance
    })
  })

  test('has title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Prenumerera på vårt nyhetsbrev' })).toBeVisible()
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
    await page.getByRole('button', { name: 'Prenumerera' }).click()
    await expect(page.getByText('Du har inte angett en giltig e-postadress.')).toBeVisible()
  })

  test('submitting form with valid email shows success page', async ({ page }) => {
    await page.getByPlaceholder('john.doe@example.com').fill('john.doe@example.com')
    await page.getByRole('button', { name: 'Prenumerera' }).click()
    await expect(page.getByText('Tack för att du prenumererar!')).toBeVisible()
  })

  test('updating form data should reflect in form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Prenumerera på vårt nyhetsbrev' })).toBeVisible()

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
          delete window.norticFormInstance.options.onUpdate

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

    await expect(page.getByRole('heading', { name: 'Prenumerera på vårt nyhetsbrev' })).not.toBeVisible()
  })

  test('error message should be red', async ({ page }) => {
    await page.getByPlaceholder('john.doe@example.com').fill('a@b')

    await page.getByRole('button', { name: 'Prenumerera' }).click()

    await expect(page.getByText('Du har inte angett en giltig e-postadress.')).toHaveCSS('color', 'rgb(239, 68, 68)')
  })

  test('Adding tag to options should add checkbox elements to the form', async ({ page }) => {
    await page.evaluate(() => {
      window.norticFormInstance.update({
        tags: ['a', 'b', 'c'],
      })
    })

    await expect(page.getByRole('checkbox', { name: 'a' })).toBeVisible()
    await expect(page.getByRole('checkbox', { name: 'b' })).toBeVisible()
    await expect(page.getByRole('checkbox', { name: 'c' })).toBeVisible()
  })

  test('Adding tag to options with labels should add checkbox elements to the form with correct labels', async ({ page }) => {
    await page.evaluate(() => {
      window.norticFormInstance.update({
        texts: {
          tags: {
            a: 'A',
            b: 'B',
          },
        },
        tags: ['a', 'b', 'c'],
      })
    })

    await expect(page.getByLabel('A', { exact: true })).toHaveValue('a')
    await expect(page.getByLabel('B', { exact: true })).toHaveValue('b')
    await expect(page.getByLabel('c', { exact: true })).toHaveValue('c')
  })
})
