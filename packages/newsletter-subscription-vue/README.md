<p align="center">
  <a target="_blank" href="https://b2b.nortic.se">
  <img alt="nortic logo" src="https://github.com/nortic-ab/newsletter-form/assets/18286634/c2663966-535d-46f9-8a85-a3d4e4300b05" width="400">

  </a>
</p>
<br>

# Nortic Newsletter Subscription - Vue
This is a Vue 3 wrapper for [Nortic Newsletter Subscription](https://github.com/nortic-ab/newsletter-form/tree/main/packages/newsletter-subscription-js)

## Getting started
### Install
```bash
npm install @nortic/newsletter-form-vue
# yarn add @nortic/newsletter-form-vue
# pnpm add @nortic/newsletter-form-vue
```

## Usage
### Component
```vue
<script setup lang="ts">
import { SubmissionForm } from '@nortic/newsletter-form-vue';
import '@nortic/newsletter-form-vue/dist/style.css';
</script>

<template>
   <SubmissionForm organizer-id="<your-organizer-id>" newsletter-id="<your-newsletter-id>" />
</template>
```

#### Props
|Property              |Type                    |Required |
|----------------------|------------------------|---------|
|**organizerId**       |`string, number`        |Yes      |
|**newsletterId**      |`string, number`        |Yes      |
|**options**           |`object`                |No       |

> **_NOTE:_**  For more information about the available options, please refer to the Nortic Newsletter Form [readme](https://github.com/nortic-ab/newsletter-form/blob/main/packages/newsletter-subscription-js/README.md).

#### Events
|Event                 |Argument              |
|----------------------|----------------------|
|**success**           |N/A                   |
|**error**             |Error                 |
|**destroyed**         |N/A                   |
|**reset**             |N/A                   |
|**updated**           |N/A                   |

### Composable
```vue
<script setup lang="ts">
import { SubmissionForm } from '@nortic/newsletter-form-vue';
import '@nortic/newsletter-form-vue/dist/style.css';

const norticSubmissionForm = ref<HTMLElement>();

useNewsletterSubscriptionForm(norticSubmissionForm, {
   organizerId: '<your-organizer-id>',
   newsletterId: '<your-newsletter-id>',
   // options: A third, optional, argument can be passed
})
</script>

<template>
   <div ref="norticSubmissionForm" />
</template>
```
