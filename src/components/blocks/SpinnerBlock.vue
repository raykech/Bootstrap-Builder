<script setup>
import { toRef } from 'vue'

const props = defineProps({
  options: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['update:options'])
const options = toRef(props, 'options')

function updateField(key, value) {
  emit('update:options', { ...options.value, [key]: value })
}
</script>

<template>
  <div>
    <div class="mb-3">
      <label class="form-label">Tip</label>
      <select class="form-select" :value="options.type" @change="updateField('type', $event.target.value)">
        <option value="border">Border</option>
        <option value="grow">Grow</option>
      </select>
    </div>
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
    <div class="mb-3">
      <label class="form-label">Boyut</label>
      <select class="form-select" :value="options.size" @change="updateField('size', $event.target.value)">
        <option value="">Normal</option>
        <option value="sm">Küçük</option>
      </select>
    </div>
    <div class="mb-3">
      <label class="form-label">Ekstra Sınıf</label>
      <input type="text" class="form-control" :value="options.extraClass" @input="updateField('extraClass', $event.target.value)" />
    </div>
  </div>
</template>

<script>
export function getDefaultOptions() {
  return { type: 'border', variant: 'primary', size: '', extraClass: '' }
}

export function generateHtml(options) {
  const { type = 'border', variant = 'primary', size = '', extraClass = '' } = options || {}
  const spinnerClasses = [`spinner-${type}`, `text-${variant}`, size ? `spinner-${type}-${size}` : '', extraClass].filter(Boolean).join(' ')
  return `<div class="${spinnerClasses}" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`
}
</script>