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
  const updatedItem = { ...items[idx], [key]: value }

  // Ensure only one item is active at a time
  if (key === 'active' && value === true) {
    items.forEach((item, i) => {
      if (i !== idx) {
        item.active = false
      }
    })
  }
  items[idx] = updatedItem
  emit('update:options', { ...options.value, items })
}

function addItem() {
  const items = options.value.items.slice()
  items.push({ text: `Sayfa ${items.length + 1}`, href: '#', active: false })
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
      <label class="form-label">Ayırıcı (Divider)</label>
      <input type="text" class="form-control" :value="options.divider" @input="updateField('divider', $event.target.value)" placeholder="Varsayılan: /" />
      <div class="form-text">CSS'de `bs-breadcrumb-divider` değişkeni ile ayarlanır.</div>
    </div>

    <div class="mb-3 mt-3">
      <label class="form-label">Breadcrumb Öğeleri</label>
      <button class="btn btn-sm btn-outline-primary ms-2 mb-2" @click="addItem">+ Öğe Ekle</button>
      <div v-for="(item, idx) in options.items" :key="'breadcrumb-item-'+idx" class="border rounded p-2 mb-2">
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
          <input class="form-check-input" type="checkbox" :id="'breadcrumbActive'+idx" :checked="item.active" @change="updateItem(idx, 'active', $event.target.checked)" />
          <label class="form-check-label" :for="'breadcrumbActive'+idx">Aktif</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export function getDefaultOptions() {
  return {
    divider: '>',
    items: [
      { text: 'Ana Sayfa', href: '#', active: false },
      { text: 'Kategori', href: '#', active: false },
      { text: 'Ürün', href: '#', active: true }
    ]
  }
}

export function generateHtml(options) {
  const { divider = '>', items = [] } = options || {}
  const style = `--bs-breadcrumb-divider: '${divider}';`
  const itemsHtml = items.map(item => {
    const itemClasses = ['breadcrumb-item']
    if (item.active) itemClasses.push('active')
    const ariaCurrent = item.active ? ' aria-current="page"' : ''
    return item.active
      ? `  <li class="${itemClasses.join(' ')}"${ariaCurrent}>${item.text}</li>`
      : `  <li class="${itemClasses.join(' ')}"><a href="${item.href}">${item.text}</a></li>`
  }).join('\n')
  return `<nav style="${style}" aria-label="breadcrumb">
  <ol class="breadcrumb">
${itemsHtml}
  </ol>
</nav>`
}
</script>