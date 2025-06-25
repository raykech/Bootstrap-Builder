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
      <label class="form-label">Label</label>
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
  </div>
</template>
<script>
export function getDefaultOptions() {
  return {
    label: 'Dropdown',
    variant: 'primary',
    dropDirection: '',
    items: [
      { text: 'Birinci', active: false, disabled: false, divider: false },
      { text: 'İkinci', active: false, disabled: false, divider: false },
      { text: '', divider: true },
      { text: 'Üçüncü', active: false, disabled: false, divider: false }
    ]
  }
}
export function generateHtml(options) {
  const { label = 'Dropdown', variant = 'primary', dropDirection = '', items = [] } = options || {}
  const dropdownClass = [dropDirection, 'dropdown'].filter(Boolean).join(' ')
  const btnClass = ['btn', `btn-${variant}`, 'dropdown-toggle'].join(' ')
  const menuId = `dropdownMenu${options && options.id ? options.id : ''}`
  return [
    `<div class="${dropdownClass}">`,
    `  <button class="${btnClass}" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="${menuId}">`,
    `    ${label}`,
    `  </button>`,
    `  <ul class="dropdown-menu" aria-labelledby="${menuId}">`,
    ...items.map(item => {
      if (item.divider) return '    <li><hr class="dropdown-divider"></li>'
      let liClass = []
      if (item.active) liClass.push('active')
      if (item.disabled) liClass.push('disabled')
      return `    <li><a class="dropdown-item${liClass.length ? ' ' + liClass.join(' ') : ''}" href="#"${item.disabled ? ' tabindex="-1" aria-disabled="true"' : ''}>${item.text || ''}</a></li>`
    }),
    `  </ul>`,
    `</div>`
  ].join('\n')
}
</script>
