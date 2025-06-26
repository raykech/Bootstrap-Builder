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
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="whiteCheck" :checked="options.white" @change="updateField('white', $event.target.checked)" />
      <label class="form-check-label" for="whiteCheck">Beyaz (White)</label>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="disabledCheck" :checked="options.disabled" @change="updateField('disabled', $event.target.checked)" />
      <label class="form-check-label" for="disabledCheck">Pasif (Disabled)</label>
    </div>
  </div>
</template>

<script>
export function getDefaultOptions() {
  return {
    white: false,
    disabled: false
  }
}

export function generateHtml(options) {
  const { white = false, disabled = false } = options || {}
  const btnClasses = ['btn-close']
  if (white) btnClasses.push('btn-close-white')
  const disabledAttr = disabled ? ' disabled' : ''
  
  // Beyaz versiyonun görünür olması için koyu bir arka plan gerekir.
  const wrapperStyle = white ? 'style="background-color: #212529; padding: 1rem;"' : ''

  return `<div ${wrapperStyle}>
  <button type="button" class="${btnClasses.join(' ')}" aria-label="Close"${disabledAttr}></button>
</div>`
}
</script>