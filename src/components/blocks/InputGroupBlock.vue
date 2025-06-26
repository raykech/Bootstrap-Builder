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
      <label class="form-label">Boyut</label>
      <select class="form-select" :value="options.size" @change="updateField('size', $event.target.value)">
        <option value="">Normal</option>
        <option value="sm">Küçük (sm)</option>
        <option value="lg">Büyük (lg)</option>
      </select>
    </div>
    <div class="mb-3">
      <label class="form-label">Başa Eklenecek Metin</label>
      <input type="text" class="form-control" :value="options.prependText" @input="updateField('prependText', $event.target.value)" placeholder="@" />
    </div>
    <div class="mb-3">
      <label class="form-label">Sona Eklenecek Metin</label>
      <input type="text" class="form-control" :value="options.appendText" @input="updateField('appendText', $event.target.value)" placeholder=".com" />
    </div>
    <div class="mb-3">
      <label class="form-label">Input Placeholder</label>
      <input type="text" class="form-control" :value="options.placeholder" @input="updateField('placeholder', $event.target.value)" />
    </div>
    <div class="mb-3">
      <label class="form-label">Input Aria-Label</label>
      <input type="text" class="form-control" :value="options.ariaLabel" @input="updateField('ariaLabel', $event.target.value)" />
    </div>
     <div class="mb-3">
      <label class="form-label">Ekstra Sınıf</label>
      <input type="text" class="form-control" :value="options.extraClass" @input="updateField('extraClass', $event.target.value)" />
    </div>
  </div>
</template>

<script>
export function getDefaultOptions() {
  return {
    size: '',
    prependText: '@',
    appendText: '',
    placeholder: 'Username',
    ariaLabel: 'Username',
    extraClass: ''
  }
}

export function generateHtml(options) {
  const {
    size = '',
    prependText = '',
    appendText = '',
    placeholder = '',
    ariaLabel = '',
    extraClass = ''
  } = options || {}

  const groupClasses = ['input-group', size ? `input-group-${size}` : '', extraClass].filter(Boolean).join(' ')
  const prependHtml = prependText ? `  <span class="input-group-text">${prependText}</span>\n` : ''
  const appendHtml = appendText ? `  <span class="input-group-text">${appendText}</span>\n` : ''
  const inputHtml = `  <input type="text" class="form-control" placeholder="${placeholder}" aria-label="${ariaLabel}">\n`

  return `<div class="${groupClasses}">\n${prependHtml}${inputHtml}${appendHtml}</div>`
}
</script>