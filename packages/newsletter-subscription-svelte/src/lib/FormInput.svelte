<script lang='ts'>
  export let value: string
  export let placeholder: string
  export let label: string
  export let hint: string = '\u00A0'
  export let id: string = Math.random().toString(36).substring(2)
  export let required = false
  export let errorMessage: string = ''
  export const type: 'text' | 'email' | 'password' = 'text'

  $: _label = `${label}${required ? ' *' : ''}`
  $: _hint = errorMessage || hint || '\u00A0'
  $: inputProperties = {
    id,
    type,
    value,
    placeholder,
    required,
    errorMessage,
  }
</script>

<div>
  <label for={id}>{_label}</label>
  <input {...inputProperties} bind:value on:input />
  <small>{_hint}</small>
</div>
