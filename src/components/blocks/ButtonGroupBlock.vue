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

function updateItem(idx, key, value) {
  const items = options.value.items.slice()
  items[idx] = { ...items[idx], [key]: value }
  emit('update:options', { ...options.value, items })
}

function addItem() {
  const items = options.value.items.slice()
  items.push({ text: `Buton ${items.length + 1}`, variant: 'primary', outline: false })
  emit('update:options', { ...options.value, items })
}

function removeItem(idx) {
  const items = options.value.items.slice()
  items.splice(idx, 1)
  emit('update:options', { ...options.value, items })
}
</script>

<template>
  <div>
    <div class="mb-3">
      <label class="form-label">Boyut</label>
      <select class="form-select" :value="options.size" @change="updateField('size', $event.target.value)">
        <option value="">Normal</option>
        <option value="btn-group-sm">Küçük</option>
        <option value="btn-group-lg">Büyük</option>
      </select>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="verticalCheck" :checked="options.vertical" @change="updateField('vertical', $event.target.checked)" />
      <label class="form-check-label" for="verticalCheck">Dikey Grup</label>
    </div>
    <div class="mb-3">
      <label class="form-label">Aria Label</label>
      <input type="text" class="form-control" :value="options.ariaLabel" @input="updateField('ariaLabel', $event.target.value)" />
    </div>

    <div class="mb-3 mt-3">
      <label class="form-label">Butonlar</label>
      <button class="btn btn-sm btn-outline-primary ms-2 mb-2" @click="addItem">+ Buton Ekle</button>
      <div v-for="(item, idx) in options.items" :key="'btn-group-item-'+idx" class="border rounded p-2 mb-2">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span>Buton {{ idx + 1 }}</span>
          <button class="btn btn-sm btn-outline-danger" @click="removeItem(idx)">Sil</button>
        </div>
        <div class="mb-2">
          <label class="form-label">Metin</label>
          <input type="text" class="form-control" :value="item.text" @input="updateItem(idx, 'text', $event.target.value)" />
        </div>
        <div class="mb-2">
          <label class="form-label">Renk</label>
          <select class="form-select" :value="item.variant" @change="updateItem(idx, 'variant', $event.target.value)">
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="success">Success</option>
            <option value="danger">Danger</option>
            <option value="warning">Warning</option>
            <option value="info">Info</option>
          </select>
        </div>
        <div class="form-check mb-1">
          <input class="form-check-input" type="checkbox" :id="'btnOutline'+idx" :checked="item.outline" @change="updateItem(idx, 'outline', $event.target.checked)" />
          <label class="form-check-label" :for="'btnOutline'+idx">Outline</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export function getDefaultOptions() {
  return {
    size: '',
    vertical: false,
    ariaLabel: 'Basic example',
    items: [
      { text: 'Sol', variant: 'primary', outline: false },
      { text: 'Orta', variant: 'primary', outline: false },
      { text: 'Sağ', variant: 'primary', outline: false }
    ]
  }
}

export function generateHtml(options) {
  const { size = '', vertical = false, ariaLabel = 'Basic example', items = [] } = options || {}
  const groupClasses = [vertical ? 'btn-group-vertical' : 'btn-group', size].filter(Boolean).join(' ')
  const itemsHtml = items.map(item => {
    const btnClass = item.outline ? `btn-outline-${item.variant}` : `btn-${item.variant}`
    return `  <button type="button" class="btn ${btnClass}">${item.text}</button>`
  }).join('\n')

  return `<div class="${groupClasses}" role="group" aria-label="${ariaLabel}">
${itemsHtml}
</div>`
}
</script>