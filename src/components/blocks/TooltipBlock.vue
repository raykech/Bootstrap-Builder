<script setup>
import { toRef, onMounted, nextTick } from 'vue'
// Bootstrap JS importu eklendi
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

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

onMounted(() => {
  nextTick(() => {
    if (typeof window !== 'undefined' && window.bootstrap) {
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
      tooltipTriggerList.forEach(tooltipTriggerEl => {
        new window.bootstrap.Tooltip(tooltipTriggerEl)
      })
    }
  })
})
</script>

<template>
  <div>
    <div class="mb-3">
      <label class="form-label">Metin</label>
      <input type="text" class="form-control" :value="options.text" @input="updateField('text', $event.target.value)" />
    </div>
    <div class="mb-3">
      <label class="form-label">Araç İpucu Metni</label>
      <input type="text" class="form-control" :value="options.tooltipText" @input="updateField('tooltipText', $event.target.value)" />
    </div>
    <div class="mb-3">
      <label class="form-label">Konum</label>
      <select class="form-select" :value="options.placement" @change="updateField('placement', $event.target.value)">
        <option value="top">Üst</option>
        <option value="bottom">Alt</option>
        <option value="left">Sol</option>
        <option value="right">Sağ</option>
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
  return { text: 'Üzerine Gel', tooltipText: 'Bu bir araç ipucudur.', placement: 'top', extraClass: '' }
}

export function generateHtml(options) {
  const { text = '', tooltipText = '', placement = 'top', extraClass = '' } = options || {}
  return `<button type="button" class="btn btn-secondary ${extraClass}" data-bs-toggle="tooltip" data-bs-placement="${placement}" title="${tooltipText}">
  ${text}
</button>`
}
</script>