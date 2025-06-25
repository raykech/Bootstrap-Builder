<template>
  <div>
    <h4>Dropdown Seçenekleri</h4>
    <div class="mb-2">
      <label class="form-label">Başlık</label>
      <input class="form-control" :value="options.label" @input="e => update('label', e.target.value)" />
    </div>
    <div class="mb-2">
      <label class="form-label">Renk</label>
      <select class="form-select" :value="options.variant" @change="e => update('variant', e.target.value)">
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
    <div class="mb-2">
      <label class="form-label">Açılma Yönü</label>
      <select class="form-select" :value="options.dropDirection" @change="e => update('dropDirection', e.target.value)">
        <option value="">Aşağı (dropdown)</option>
        <option value="dropup">Yukarı (dropup)</option>
        <option value="dropend">Sağa (dropend)</option>
        <option value="dropstart">Sola (dropstart)</option>
      </select>
    </div>
    <div class="mb-2">
      <label class="form-label">Menü Öğeleri</label>
      <div v-for="(item, idx) in options.items" :key="idx" class="input-group mb-1">
        <input class="form-control" :value="item.text" @input="e => updateItem(idx, 'text', e.target.value)" placeholder="Metin" />
        <button class="btn btn-outline-secondary" @click="toggleItem(idx, 'active')" :class="{active: item.active}">Aktif</button>
        <button class="btn btn-outline-secondary" @click="toggleItem(idx, 'disabled')" :class="{active: item.disabled}">Pasif</button>
        <button class="btn btn-outline-secondary" @click="toggleItem(idx, 'divider')" :class="{active: item.divider}">Bölücü</button>
        <button class="btn btn-outline-danger" @click="removeItem(idx)">Sil</button>
      </div>
      <button class="btn btn-sm btn-success" @click="addItem">+ Menü Öğesi Ekle</button>
    </div>
  </div>
</template>

<script setup>
import { toRefs } from 'vue'
const props = defineProps({
  options: { type: Object, required: true }
})
const emit = defineEmits(['update:options'])

const { options } = toRefs(props)

function update(key, value) {
  emit('update:options', { ...options.value, [key]: value })
}
function updateItem(idx, key, value) {
  const items = options.value.items.slice()
  items[idx] = { ...items[idx], [key]: value }
  emit('update:options', { ...options.value, items })
}
function toggleItem(idx, key) {
  const items = options.value.items.slice()
  items[idx] = { ...items[idx], [key]: !items[idx][key] }
  emit('update:options', { ...options.value, items })
}
function removeItem(idx) {
  const items = options.value.items.slice()
  items.splice(idx, 1)
  emit('update:options', { ...options.value, items })
}
function addItem() {
  const items = options.value.items.slice()
  items.push({ text: 'Yeni Menü', active: false, disabled: false, divider: false })
  emit('update:options', { ...options.value, items })
}
</script>
