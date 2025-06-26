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
  const newId = `accordion-item-${Date.now()}`
  items.push({
    id: newId,
    title: `Akordiyon Başlığı #${items.length + 1}`,
    content: `Akordiyon içeriği #${items.length + 1}`,
    show: false
  })
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
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="alwaysOpenCheck" :checked="options.alwaysOpen" @change="updateField('alwaysOpen', $event.target.checked)" />
      <label class="form-check-label" for="alwaysOpenCheck">Hepsi Açık Kalabilsin (Always Open)</label>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="flushCheck" :checked="options.flush" @change="updateField('flush', $event.target.checked)" />
      <label class="form-check-label" for="flushCheck">Kenarlıksız (Flush)</label>
    </div>

    <div class="mb-3 mt-3">
      <label class="form-label">Akordiyon Öğeleri</label>
      <button class="btn btn-sm btn-outline-primary ms-2 mb-2" @click="addItem">+ Öğe Ekle</button>
      <div v-for="(item, idx) in options.items" :key="item.id" class="border rounded p-2 mb-2">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span>Öğe {{ idx + 1 }}</span>
          <button class="btn btn-sm btn-outline-danger" @click="removeItem(idx)">Sil</button>
        </div>
        <div class="mb-2">
          <label class="form-label">Başlık</label>
          <input type="text" class="form-control" :value="item.title" @input="updateItem(idx, 'title', $event.target.value)" />
        </div>
        <div class="mb-2">
          <label class="form-label">İçerik</label>
          <textarea class="form-control" :value="item.content" @input="updateItem(idx, 'content', $event.target.value)"></textarea>
        </div>
        <div class="form-check mb-1">
          <input class="form-check-input" type="checkbox" :id="'accordionShow'+item.id" :checked="item.show" @change="updateItem(idx, 'show', $event.target.checked)" />
          <label class="form-check-label" :for="'accordionShow'+item.id">Açık Başlasın</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export function getDefaultOptions() {
  return {
    alwaysOpen: false,
    flush: false,
    items: [
      { id: 'accordion-item-1', title: 'Akordiyon Başlığı #1', content: 'Bu ilk öğenin içeriğidir.', show: true },
      { id: 'accordion-item-2', title: 'Akordiyon Başlığı #2', content: 'Bu ikinci öğenin içeriğidir.', show: false },
      { id: 'accordion-item-3', title: 'Akordiyon Başlığı #3', content: 'Bu üçüncü öğenin içeriğidir.', show: false }
    ]
  }
}

export function generateHtml(options) {
  const { alwaysOpen = false, flush = false, items = [] } = options || {}
  const parentId = `accordionParent-${Date.now()}`
  const accordionClasses = ['accordion']
  if (flush) accordionClasses.push('accordion-flush')

  const itemsHtml = items.map((item) => {
    const collapseId = `collapse-${item.id}`
    const headerId = `header-${item.id}`
    const showClass = item.show ? 'show' : ''
    const collapsedClass = item.show ? '' : 'collapsed'
    const ariaExpanded = item.show ? 'true' : 'false'

    return `
  <div class="accordion-item">
    <h2 class="accordion-header" id="${headerId}">
      <button class="accordion-button ${collapsedClass}" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="${ariaExpanded}" aria-controls="${collapseId}">
        ${item.title}
      </button>
    </h2>
    <div id="${collapseId}" class="accordion-collapse collapse ${showClass}" aria-labelledby="${headerId}" ${!alwaysOpen ? `data-bs-parent="#${parentId}"` : ''}>
      <div class="accordion-body">
        ${item.content}
      </div>
    </div>
  </div>`
  }).join('')

  return `<div class="${accordionClasses.join(' ')}" id="${parentId}">
${itemsHtml}
</div>`
}
</script>