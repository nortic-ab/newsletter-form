<p align="center">
  <a target="_blank" href="https://b2b.nortic.se">
  <img alt="nortic logo" src="https://github.com/nortic-ab/newsletter-form/assets/18286634/c2663966-535d-46f9-8a85-a3d4e4300b05" width="400">

  </a>
</p>
<br>

# Nortic Newsletter Form :love_letter:
This javascript module allows you to embed a subscription form for your newsletters created with [Nortic Insight](https://insight.nortic.se)!

## Getting started
There are two ways to use this package, CDN or as a Node Package.

### CDN
#### Add CSS
```xml
<html>
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@nortic/newsletter-form@latest/dist/index.css"></link>
  </head>
</html>
```

#### Initialize form
```html
<div id="newsletter-form" />

<script src="https://cdn.jsdelivr.net/npm/@nortic/newsletter-form@latest/dist/index.global.js"></script>

<script>
/* Embed our form on your web page */
new NorticNewsletter.EmbeddedSubscriptionForm('#newsletter-form', {
  newsletterId: '<your-newsletter-id-here>',
});

/* Or use ajax request if you want to create your own form */
function submit() {
  NorticNewsletter.submitSubscription('<email>', {
    /* These are optional */
    firstName: '<first-name>',
    lastName: '<last-name>',
    phone: '<phone-number>',
  })
}
</script>
```

### NPM package
#### Install the package
```bash
npm i @nortic/newsletter-form
# yarn add @nortic/newsletter-form
# pnpm add @nortic/newsletter-form
```

#### Usage
```js
import { EmbeddedSubscriptionForm, submitSubscription } from '@nortic/newsletter-from'
import '@nortic/newsletter-form/dist/index.css'

/* Embed our form on your web page */
const formInstance = new EmbeddedSubscriptionForm('<element-query-selector>', {
  newsletterId: '<your-newsletter-id-here>',
})

/* Or use ajax request if you want to create your own form */
function submit() {
  submitSubscription('<email>', {
    /* These are optional */
    firstName: '<first-name>',
    lastName: '<last-name>',
    phone: '<phone-number>',
  })
}
```

## Options
It is possible to customize the content of the form by passing an optional *options* argument to the constructor:
```js
const instance = new EmbeddedSubscriptionForm('<element-query-selector>', {
  newsletterId: '<your-newsletter-id-here>',
  options: {
    // Options go here
  }
})
```

#### Options
> **_NOTE:_**  All options are optional.

| Property                             | Description                                                                                                                                     | Default value                                                     |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------|
| **showFirstNameInput**               | Show the first name input field                                                                                                                 | true                                                              |
| **showLastNameInput**                | Show the last name input field                                                                                                                  | true                                                             |
| **showPhoneInput**                   | Show the phone number input field                                                                                                               | false                                                             |
| **hideSubmissionError**              | Hide the generic error message                                                                                                                      | false |
| **texts.title**                      | The title of the form                                                                                                                           | "Subscribe to our newsletter"                                     |
| **texts.description**                | A sub title of the form                                                                                                                         | "Subscribe to our newsletter and get the latest news and updates" |
| **texts.submit**                     | The submit button text                                                                                                                          | "Subscribe"                                                       |
| **texts.acceptTermsLabel**           | Adds terms texts above the subscribe button. Can also include links, example "By pressing the button I accept the [terms](https://example.com)" | ""                                                                |
| **texts.emailInput.label**           | The label of the email input field                                                                                                              | "Email"                                                           |
| **texts.emailInput.placeholder**     | The placeholder of the email input field                                                                                                        | "john.doe@example.com"                                            |
| **texts.emailInput.validationError** | The error message of the email input field                                                                                                      | "Please enter a valid email address"                              |
| **texts.emailInput.hint**            | A hint message of the email input field                                                                                                         | ""                                                                |
| **texts.firstNameInput.label**       | The label of the first name input field                                                                                                         | "First name"                                                      |
| **texts.firstNameInput.placeholder** | The placeholder of the first name input field                                                                                                   | "John"                                                            |
| **texts.lastNameInput.label**        | The label of the last name input field                                                                                                          | "Last name"                                                       |
| **texts.lastNameInput.placeholder**  | The placeholder of the last name input field                                                                                                    | "Doe"                                                             |
| **texts.phoneInput.label**           | The label of the phone input field                                                                                                              | "Phone"                                                           |
| **texts.phoneInput.placeholder**     | The placeholder of the phone input field                                                                                                        | "+46 70 123 45 67"                                                |
| **texts.genericErrorMessage**        | The error message displayed when form submission fails                                                                                          | "Ett fel uppstod. Vänligen försök igen senare."                                           |

#### Callbacks
> **_NOTE:_**  All callbacks are optional.

**onSuccess:** Called on successful subscription request

**onError:** Called if the subscription request fails (the error is available as an argument)

**onReset:** Called when the form is reset

**onUpdate:** Called when the form is updated

**onDestroy:** Called when the form is destroyed

## Styling
There are a few CSS variables that you can modify to customize the look of the form.
If you need more customization, simply create your own CSS definitions and override classes as needed.

Available CSS Variables and default values:
```css
--nortic-form-error: 239, 68, 68;
--nortic-background: 243, 244, 246;
--nortic-border: 213, 215, 219;
--nortic-text: 0, 0, 0;
--nortic-sub: 25, 25, 25;
--nortic-input: 255, 255, 255;
--nortic-placeholder: 127, 127, 127;
--nortic-link: 55, 70, 164;
```

## Type definitions
```typescript
declare class EmbeddedSubscriptionForm {
    static submit(email: string, options: SubmitOptions): Promise<void>;

    constructor(el: string | HTMLElement, options: NorticNewsletterOptions);

    update(options: NorticNewsletterOptions, reset?: boolean): void;
    reset(): void;
    destroy(): void;
}

interface SubmitOptionsBase {
    newsletterId: number;
}

interface SubmitOptions extends SubmitOptionsBase {
    firstName?: string;
    lastName?: string;
    phone?: string;
}

interface InputTexts {
    label?: string;
    placeholder?: string;
    validationError?: string;
    hint?: string;
}

interface NorticNewsletterOptions extends SubmitOptionsBase {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
    onReset?: () => void;
    onUpdate?: () => void;
    onDestroy?: () => void;
    showFirstNameInput?: boolean;
    showLastNameInput?: boolean;
    showPhoneInput?: boolean;
    texts?: {
        title?: string;
        description?: string;
        submit?: string;
        emailInput?: InputTexts;
        firstNameInput?: InputTexts;
        lastNameInput?: InputTexts;
        phoneInput?: InputTexts;
        acceptTermsLabel?: string;
    };
}
```
