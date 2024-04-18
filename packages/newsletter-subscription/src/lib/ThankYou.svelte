<script lang='ts'>
  import { DEFAULT_OPTIONS } from '../constants/defaultOptions'

  export let successTitle = DEFAULT_OPTIONS.texts.successTitle
  export let successDescription = DEFAULT_OPTIONS.texts.successDescription

  $: _successTitle = successTitle || DEFAULT_OPTIONS.texts.successTitle
  $: _successDescription = successDescription || DEFAULT_OPTIONS.texts.successDescription
</script>

<div class='nortic-newsletter--success-wrapper' {...$$props}>
  <div class='nortic-success-container'>
    <h2>{_successTitle}</h2>
    <p>{_successDescription}</p>
  </div>
</div>
