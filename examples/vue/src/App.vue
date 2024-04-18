<script setup lang="ts">
import { SubmissionForm, type SubmissionFormOptions } from '@nortic/newsletter-form-vue'
import '@nortic/newsletter-form-vue/dist/style.css'
import { ref } from 'vue'

const visible = ref(false)

const options: SubmissionFormOptions = {
  demo: false,
  showFirstNameInput: true,
  showLastNameInput: true,
  showPhoneInput: true,
  texts: {
    emailInput: {
      hint: 'Your email goes here...',
    },
    acceptTermsLabel: 'By submitting this form, you agree to our [terms and conditions](https://nortic.io/terms-and-conditions)',
  },
  tags: ['Demo', 'Sudoku', 'Vue', 'Nortic', 'Newsletter', 'Form', 'Component', 'Library', 'Example', 'Demo'],
  requestOptions: {
    baseUrl: 'https://insight-dev-feature.nortic.io/api/insight',
  },
  onError: (e) => {
    console.error(e)
  },
}
</script>

<template>
  <div>
    <SubmissionForm newsletter-id="fc270648-9fd2-44ce-a97c-cc22c86986e0" :options="options" :show-subscribe-completed="visible" />
  </div>

  <button @click="visible = !visible">
    Toggle
  </button>
</template>

<style scoped>
true
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
