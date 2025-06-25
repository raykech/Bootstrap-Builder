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
      <input class="form-check-input" type="checkbox" id="dismissibleCheck" :checked="options.dismissible" @change="updateField('dismissible', $event.target.checked)" />
      <label class="form-check-label" for="dismissibleCheck">Kapatılabilir</label>
    </div>
    <div class="mb-3">
      <label class="form-label">Başlık</label>
      <input type="text" class="form-control" :value="options.heading" @input="updateField('heading', $event.target.value)" />
    </div>
    <div class="mb-3">
      <label class="form-label">İçerik</label>
      <textarea class="form-control" :value="options.content" @input="updateField('content', $event.target.value)"></textarea>
    </div>
  </div>
</template>

<script>
export function getDefaultOptions() {
  return { variant: 'primary', dismissible: false, heading: 'Uyarı!', content: 'Bu bir Bootstrap alert örneğidir.' }
}
export function generateHtml(options) {
  const { variant = 'primary', dismissible = false, heading = '', content = '' } = options || {}
  return [
    `<div class="alert alert-${variant}${dismissible ? ' alert-dismissible fade show' : ''}" role="alert">`,
    heading ? `  <h4 class='alert-heading'>${heading}</h4>` : '',
    `  ${content}`,
    dismissible ? `  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>` : '',
    `</div>`
  ].filter(Boolean).join('\n')
}
</script>
