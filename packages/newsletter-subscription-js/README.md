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
Most styles in the imported CSS file uses CSS variables so you are free to assign them to your liking.
You can also opt for defining the CSS classes yourself.

Available CSS Variables and default values:
```css
/* Form Container */
--nortic-form-margin: 0;
--nortic-form-padding: 20px;
--nortic-form-display: inline-block;
--nortic-form-border: 1px solid #777;
--nortic-form-border-radius: 8px;
--nortic-form-background-color: #eee;
--nortic-form-color: #000;
--nortic-form-input-label-text-align: left;

/* Inputs */
--nortic-form-input-container-display: block;
--nortic-form-input-container-margin: 0 0 0 0;

--nortic-form-input-label-display: block;
--nortic-form-input-label-font-size: 0.9rem;

--nortic-form-input-border: 1px solid #777;
--nortic-form-input-border-radius: 4px;
--nortic-form-input-box-sizing: border-box;
--nortic-form-input-background: #fff;
--nortic-form-input-color: #000;
--nortic-form-input-display: block;
--nortic-form-input-font-size: 1rem;
--nortic-form-input-font-weight: 400;
--nortic-form-input-margin: 0;
--nortic-form-input-padding: 4px 8px;
--nortic-form-input-width: 100%;

--nortic-form-input-placeholder-color: #ccc;

--nortic-form-input-hint-error-color: red;
--nortic-form-input-hint-font-size: 0.8rem;
--nortic-form-input-hint-font-weight: 400;
--nortic-form-input-hint-margin: 0 0 0 0;

/* Title */
--nortic-form-title-font-size: 1.5rem;
--nortic-form-title-font-weight: 700;
--nortic-form-title-margin: 0;

/* Description */
--nortic-form-description-font-size: 0.9rem;
--nortic-form-description-font-weight: 400;
--nortic-form-description-margin: 0 0 10px 0;

/* Submit button */
--nortic-form-submit-background-color: #000;
--nortic-form-submit-border: none;
--nortic-form-submit-border-radius: 4px;
--nortic-form-submit-color: #fff;
--nortic-form-submit-cursor: pointer;
--nortic-form-submit-display: block;
--nortic-form-submit-font-size: 1rem;
--nortic-form-submit-font-weight: 400;
--nortic-form-submit-margin: 0 0 10px 0;
--nortic-form-submit-padding: 10px;
--nortic-form-submit-width: 100%;

--nortic-form-submit-hover-background-color: #000;
--nortic-form-submit-hover-color: #fff;

/* Terms */
--nortic-form-terms-font-size: 0.8rem;
--nortic-form-terms-font-weight: 400;
--nortic-form-terms-margin: 0 0 4px 0;
--nortic-form-terms-link-color: #000;
--nortic-form-terms-link-font-weight: 700;
--nortic-form-terms-link-text-decoration: underline;

/* After submission */
--nortic-form-success-wrapper-display: flex;
--nortic-form-success-wrapper-flex-direction: column;
--nortic-form-success-wrapper-align-items: center;
--nortic-form-success-wrapper-justify-content: center;
--nortic-form-success-wrapper-margin: 0 0 0 0;
--nortic-form-success-wrapper-padding: 20px;
--nortic-form-success-wrapper-position: absolute;
--nortic-form-success-wrapper-top: 0;
--nortic-form-success-wrapper-left: 0;
--nortic-form-success-wrapper-bottom: 0;
--nortic-form-success-wrapper-right: 0;
--nortic-form-success-wrapper-text-align: center;
--nortic-form-success-wrapper-background-color: inherit;
--nortic-form-success-wrapper-transition: opacity 0.5s ease-in-out;

--nortic-form-success-title-font-size: 1.5rem;
--nortic-form-success-title-font-weight: 700;
--nortic-form-success-title-margin: 0 0 10px 0;

--nortic-form-success-description-font-size: 0.9rem;
--nortic-form-success-description-font-weight: 400;
--nortic-form-success-description-margin: 0 0 10px 0;

/* Generic error message */
--nortic-form-error-font-size: 0.9rem;
--nortic-form-error-color: red;
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
