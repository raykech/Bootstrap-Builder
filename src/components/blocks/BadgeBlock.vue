<script setup>
import { toRef } from 'vue'
const props = defineProps({ options: { type: Object, required: true } })
const emit = defineEmits(['update:options'])
const options = toRef(props, 'options')
function updateField(key, value) { emit('update:options', { ...options.value, [key]: value }) }
</script>
<template>
  <div>
    <div class="mb-3">
      <label class="form-label">Renk</label>
      <select class="form-select" :value="options.variant" @change="updateField('variant', $event.target.value)">
        <option value="primary">Primary</option>
        <option value="secondary">Secondary</option>
        <option value="success">Success</option>
        <option value="danger">Danger</option>
        <option value="warning">Warning</option>
        <option value="info">Info</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="pillCheck" :checked="options.pill" @change="updateField('pill', $event.target.checked)" />
      <label class="form-check-label" for="pillCheck">Pill</label>
    </div>
    <div class="mb-3">
      <label class="form-label">Metin</label>
      <input type="text" class="form-control" :value="options.text" @input="updateField('text', $event.target.value)" />
    </div>
  </div>
</template>
<script>
export function getDefaultOptions() {
  return { text: 'Badge', variant: 'primary', pill: false }
}
export function generateHtml(options) {
  const { text = '', variant = 'primary', pill = false } = options || {}
  return `<span class="badge bg-${variant}${pill ? ' rounded-pill' : ''}">${text}</span>`
}
</script>
