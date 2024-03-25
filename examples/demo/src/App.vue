<script setup lang="ts">
import { SubmissionForm, type SubmissionFormOptions } from '@nortic/newsletter-form-vue'
import '@nortic/newsletter-form-vue/dist/style.css'

const options: SubmissionFormOptions = {
  demo: false,
  showFirstNameInput: true,
  showLastNameInput: true,
  showPhoneInput: true,
  texts: {
    emailInput: {
      hint: 'Your email goes here...',
    },
  },
  tags: ['Demo', 'Sudoku'],
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
    <SubmissionForm newsletter-id="fc270648-9fd2-44ce-a97c-cc22c86986e0" :options="options" />
  </div>
</template>

<style scoped>
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
