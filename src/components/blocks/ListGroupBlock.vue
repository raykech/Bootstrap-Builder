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
      <label class="form-label">Öğe Listesi</label>
      <textarea class="form-control" :value="options.items ? options.items.map(i => i.text).join('\n') : ''" @input="updateField('items', $event.target.value.split('\n').map(t => ({ text: t })) )"></textarea>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="flushCheck" :checked="options.flush" @change="updateField('flush', $event.target.checked)" />
      <label class="form-check-label" for="flushCheck">Flush</label>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="numberedCheck" :checked="options.numbered" @change="updateField('numbered', $event.target.checked)" />
      <label class="form-check-label" for="numberedCheck">Numaralı</label>
    </div>
  </div>
</template>
<script>
export function getDefaultOptions() {
  return {
    items: [
      { text: 'Öğe 1', variant: '', active: false, disabled: false, link: false, checkbox: false, checked: false },
      { text: 'Öğe 2', variant: '', active: false, disabled: false, link: false, checkbox: false, checked: false },
      { text: 'Öğe 3', variant: '', active: false, disabled: false, link: false, checkbox: false, checked: false }
    ],
    flush: false,
    numbered: false,
    horizontal: false,
    showCheckbox: false
  }
}
export function generateHtml(options) {
  let { items, flush = false, numbered = false, horizontal = false, showCheckbox = false } = options || {}
  if (!Array.isArray(items) || items.length === 0) {
    items = [
      { text: 'Öğe 1', variant: '', active: false, disabled: false, link: false, checkbox: false, checked: false },
      { text: 'Öğe 2', variant: '', active: false, disabled: false, link: false, checkbox: false, checked: false },
      { text: 'Öğe 3', variant: '', active: false, disabled: false, link: false, checkbox: false, checked: false }
    ]
  }
  const ulClass = [
    'list-group',
    flush ? 'list-group-flush' : '',
    numbered ? 'list-group-numbered' : '',
    horizontal ? 'list-group-horizontal' : ''
  ].filter(Boolean).join(' ')
  return [
    `<ul class="${ulClass}">`,
    ...items.map((item, idx) => {
      const liClass = [
        'list-group-item',
        item.variant ? `list-group-item-${item.variant}` : '',
        item.active ? 'active' : '',
        item.disabled ? 'disabled' : ''
      ].filter(Boolean).join(' ')
      let content = item.text
      if (showCheckbox) {
        content = `<input class='form-check-input me-2' type='checkbox'${item.checked ? ' checked' : ''} id='listCheck${idx}'>` + content
      }
      if (item.badge && item.badge.trim() !== '') {
        content += ` <span class='badge bg-secondary float-end'>${item.badge}</span>`
      }
      if (item.link) {
        return `  <li><a href="#" class="${liClass}">${content}</a></li>`
      } else {
        return `  <li class="${liClass}">${content}</li>`
      }
    }),
    `</ul>`
  ].join('\n')
}
</script>
