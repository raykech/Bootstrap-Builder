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
  items.push({ text: `Link ${items.length + 1}`, href: '#', active: false, disabled: false })
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
      <label class="form-label">Stil</label>
      <select class="form-select" :value="options.style" @change="updateField('style', $event.target.value)">
        <option value="nav-tabs">Tabs</option>
        <option value="nav-pills">Pills</option>
      </select>
    </div>

    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="fillCheck" :checked="options.fill" @change="updateField('fill', $event.target.checked)" />
      <label class="form-check-label" for="fillCheck">Doldur (Fill)</label>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="justifiedCheck" :checked="options.justified" @change="updateField('justified', $event.target.checked)" />
      <label class="form-check-label" for="justifiedCheck">Yasla (Justified)</label>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="verticalCheck" :checked="options.vertical" @change="updateField('vertical', $event.target.checked)" />
      <label class="form-check-label" for="verticalCheck">Dikey</label>
    </div>

    <div class="mb-3">
      <label class="form-label">Hizalama</label>
      <select class="form-select" :value="options.alignment" @change="updateField('alignment', $event.target.value)">
        <option value="">Sola (Varsayılan)</option>
        <option value="justify-content-center">Ortala</option>
        <option value="justify-content-end">Sağa</option>
      </select>
    </div>

    <div class="mb-3 mt-3">
      <label class="form-label">Nav Öğeleri</label>
      <button class="btn btn-sm btn-outline-primary ms-2 mb-2" @click="addItem">+ Öğe Ekle</button>
      <div v-for="(item, idx) in options.items" :key="'nav-item-'+idx" class="border rounded p-2 mb-2">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span>Öğe {{ idx + 1 }}</span>
          <button class="btn btn-sm btn-outline-danger" @click="removeItem(idx)">Sil</button>
        </div>
        <div class="mb-2">
          <label class="form-label">Metin</label>
          <input type="text" class="form-control" :value="item.text" @input="updateItem(idx, 'text', $event.target.value)" />
        </div>
        <div class="mb-2">
          <label class="form-label">Href</label>
          <input type="text" class="form-control" :value="item.href" @input="updateItem(idx, 'href', $event.target.value)" />
        </div>
        <div class="form-check mb-1">
          <input class="form-check-input" type="checkbox" :id="'navActive'+idx" :checked="item.active" @change="updateItem(idx, 'active', $event.target.checked)" />
          <label class="form-check-label" :for="'navActive'+idx">Aktif</label>
        </div>
        <div class="form-check mb-1">
          <input class="form-check-input" type="checkbox" :id="'navDisabled'+idx" :checked="item.disabled" @change="updateItem(idx, 'disabled', $event.target.checked)" />
          <label class="form-check-label" :for="'navDisabled'+idx">Pasif</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export function getDefaultOptions() {
  return {
    style: 'nav-tabs',
    fill: false,
    justified: false,
    vertical: false,
    alignment: '',
    items: [
      { text: 'Aktif', href: '#', active: true, disabled: false },
      { text: 'Link', href: '#', active: false, disabled: false },
      { text: 'Başka Link', href: '#', active: false, disabled: false },
      { text: 'Pasif', href: '#', active: false, disabled: true }
    ]
  }
}

export function generateHtml(options) {
  const { style = 'nav-tabs', fill = false, justified = false, vertical = false, alignment = '', items = [] } = options || {}
  const navClasses = ['nav', style]
  if (fill) navClasses.push('nav-fill')
  if (justified) navClasses.push('nav-justified')
  if (vertical) navClasses.push('flex-column')
  if (alignment) navClasses.push(alignment)
  const itemsHtml = items.map(item => {
    const linkClasses = ['nav-link']
    if (item.active) linkClasses.push('active')
    if (item.disabled) linkClasses.push('disabled')
    const ariaCurrent = item.active ? ' aria-current="page"' : ''
    return `  <li class="nav-item">
    <a class="${linkClasses.join(' ')}"${ariaCurrent} href="${item.href}">${item.text}</a>
  </li>`
  }).join('\n')
  return `<ul class="${navClasses.join(' ')}">
${itemsHtml}
</ul>`
}
</script>