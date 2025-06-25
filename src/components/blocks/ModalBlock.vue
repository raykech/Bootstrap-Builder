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
      <label class="form-label">Başlık</label>
      <input type="text" class="form-control" :value="options.title" @input="updateField('title', $event.target.value)" />
    </div>
    <div class="mb-3">
      <label class="form-label">İçerik</label>
      <textarea class="form-control" :value="options.body" @input="updateField('body', $event.target.value)"></textarea>
    </div>
    <div class="mb-3">
      <label class="form-label">Buton Metni</label>
      <input type="text" class="form-control" :value="options.buttonText" @input="updateField('buttonText', $event.target.value)" />
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="centeredCheck" :checked="options.centered" @change="updateField('centered', $event.target.checked)" />
      <label class="form-check-label" for="centeredCheck">Ortalanmış</label>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="scrollableCheck" :checked="options.scrollable" @change="updateField('scrollable', $event.target.checked)" />
      <label class="form-check-label" for="scrollableCheck">Kaydırılabilir</label>
    </div>
  </div>
</template>
<script>
export function getDefaultOptions() {
  return {
    title: 'Modal Başlığı',
    body: 'Modal içeriği buraya gelecek.',
    buttonText: 'Modal Aç',
    centered: false,
    scrollable: false,
    extraClass: ''
  }
}
export function generateHtml(options) {
  const { title = '', body = '', buttonText = 'Modal Aç', centered = false, scrollable = false, extraClass = '' } = options || {}
  const modalId = `modalPreview${options && options.id ? options.id : ''}`
  return [
    `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${modalId}">`,
    `  ${buttonText}`,
    `</button>`,
    `<div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}Label" aria-hidden="true">`,
    `  <div class="modal-dialog${centered ? ' modal-dialog-centered' : ''}${scrollable ? ' modal-dialog-scrollable' : ''}${extraClass ? ' ' + extraClass : ''}">`,
    `    <div class="modal-content">`,
    `      <div class="modal-header">`,
    `        <h5 class="modal-title" id="${modalId}Label">${title}</h5>`,
    `        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`,
    `      </div>`,
    `      <div class="modal-body">${body}</div>`,
    `      <div class="modal-footer">`,
    `        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kapat</button>`,
    `      </div>`,
    `    </div>`,
    `  </div>`,
    `</div>`
  ].join('\n')
}
</script>
