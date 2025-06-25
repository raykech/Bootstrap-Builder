<script setup>
import { toRef } from 'vue'

const props = defineProps({
  options: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['update:options'])

// Eski localOptions sistemi kaldırıldı, doğrudan props.options ile çalışıyoruz
const options = toRef(props, 'options')

function updateField(key, value) {
  emit('update:options', { ...options.value, [key]: value })
}
</script>

<template>
  <div>
    <!-- Options Panel -->
    <div class="mb-3">
      <label class="form-label">Buton Metni</label>
      <input type="text" class="form-control" :value="options.label" @input="updateField('label', $event.target.value)" />
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
        <option value="btn-sm">Küçük</option>
        <option value="btn-lg">Büyük</option>
      </select>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="outlineCheck" :checked="options.outline" @change="updateField('outline', $event.target.checked)" />
      <label class="form-check-label" for="outlineCheck">Outline</label>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="blockCheck" :checked="options.block" @change="updateField('block', $event.target.checked)" />
      <label class="form-check-label" for="blockCheck">Tam Genişlik (Block)</label>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="disabledCheck" :checked="options.disabled" @change="updateField('disabled', $event.target.checked)" />
      <label class="form-check-label" for="disabledCheck">Pasif (Disabled)</label>
    </div>
  </div>
</template>

<style scoped>
.mt-4 { margin-top: 1.5rem; }
</style>

<!-- Fonksiyonlar <script setup> dışına export edildi -->
<script>
export function getDefaultOptions() {
  return { label: 'Buton', variant: 'primary', size: '', outline: false, block: false, disabled: false }
}

export function generateHtml(options) {
  const { label = '', variant = 'primary', size = '', outline = false, block = false, disabled = false } = options || {}
  const outlineClass = outline ? `btn-outline-${variant}` : `btn-${variant}`
  return [
    `<button type="button"`,
    `  class="btn ${outlineClass}${size ? ' ' + size : ''}${block ? ' w-100' : ''}"${disabled ? ' disabled' : ''}>`,
    `  ${label}`,
    `</button>`
  ].join('\n')
}
</script>
