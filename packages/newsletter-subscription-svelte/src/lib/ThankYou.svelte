<script lang='ts'>
  import { DEFAULT_OPTIONS } from '../constants/defaultOptions'

  export let successTitle = DEFAULT_OPTIONS.texts.successTitle
  export let successDescription = DEFAULT_OPTIONS.texts.successDescription
</script>

<div {...$$props}>
  <h2>{successTitle}</h2>
  <p>{successDescription}</p>
</div>
