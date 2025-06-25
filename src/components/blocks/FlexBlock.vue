<script setup>
import { toRef } from 'vue'
const props = defineProps({ options: { type: Object, required: true } })
const emit = defineEmits(['update:options'])
const options = toRef(props, 'options')
function updateField(key, value) { emit('update:options', { ...options.value, [key]: value }) }
function updateItem(idx, key, value) {
  const items = options.value.items.slice()
  items[idx] = { ...items[idx], [key]: value }
  emit('update:options', { ...options.value, items })
}
function addItem() {
  const items = options.value.items.slice()
  items.push({ content: `Öğe ${items.length + 1}`, grow: false, shrink: false, alignSelf: '', order: '', basis: '', extraClass: '' })
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
      <label class="form-label">Yön</label>
      <select class="form-select" :value="options.direction" @change="updateField('direction', $event.target.value)">
        <option value="flex-row">Yatay (flex-row)</option>
        <option value="flex-row-reverse">Yatay Ters (flex-row-reverse)</option>
        <option value="flex-column">Dikey (flex-column)</option>
        <option value="flex-column-reverse">Dikey Ters (flex-column-reverse)</option>
      </select>
    </div>
    <div class="mb-3">
      <label class="form-label">Sarma</label>
      <select class="form-select" :value="options.wrap" @change="updateField('wrap', $event.target.value)">
        <option value="flex-nowrap">Sarmasın (flex-nowrap)</option>
        <option value="flex-wrap">Satır Sarsın (flex-wrap)</option>
        <option value="flex-wrap-reverse">Satır Ters Sarsın (flex-wrap-reverse)</option>
      </select>
    </div>
    <div class="mb-3">
      <label class="form-label">Yatay Hizalama (Justify)</label>
      <select class="form-select" :value="options.justify" @change="updateField('justify', $event.target.value)">
        <option value="justify-content-start">Sola (start)</option>
        <option value="justify-content-end">Sağa (end)</option>
        <option value="justify-content-center">Ortala (center)</option>
        <option value="justify-content-between">Arasında (between)</option>
        <option value="justify-content-around">Etrafında (around)</option>
        <option value="justify-content-evenly">Eşit (evenly)</option>
      </select>
    </div>
    <div class="mb-3">
      <label class="form-label">Dikey Hizalama (Align Items)</label>
      <select class="form-select" :value="options.align" @change="updateField('align', $event.target.value)">
        <option value="align-items-stretch">Stretch</option>
        <option value="align-items-start">Üst (start)</option>
        <option value="align-items-end">Alt (end)</option>
        <option value="align-items-center">Ortala (center)</option>
        <option value="align-items-baseline">Yazı Çizgisi (baseline)</option>
      </select>
    </div>
    <div class="mb-3">
      <label class="form-label">Çoklu Satır Hizalama (Align Content)</label>
      <select class="form-select" :value="options.alignContent" @change="updateField('alignContent', $event.target.value)">
        <option value="">Yok</option>
        <option value="align-content-start">Üst (start)</option>
        <option value="align-content-end">Alt (end)</option>
        <option value="align-content-center">Ortala (center)</option>
        <option value="align-content-between">Arasında (between)</option>
        <option value="align-content-around">Etrafında (around)</option>
        <option value="align-content-stretch">Stretch</option>
      </select>
    </div>
    <div class="mb-3">
      <label class="form-label">Boşluk (Gap)</label>
      <select class="form-select" :value="options.gap" @change="updateField('gap', $event.target.value)">
        <option value="">Yok</option>
        <option v-for="n in 6" :key="n" :value="`gap-${n-1}`">gap-{{n-1}}</option>
      </select>
    </div>
    <div class="mb-3">
      <label class="form-label">Ekstra Sınıf</label>
      <input type="text" class="form-control" :value="options.extraClass" @input="updateField('extraClass', $event.target.value)" />
    </div>
    <div class="mb-3">
      <label class="form-label">Öğeler</label>
      <button class="btn btn-sm btn-outline-primary ms-2 mb-2" @click="addItem">+ Ekle</button>
      <div v-for="(item, idx) in options.items" :key="'item'+idx" class="border rounded p-2 mb-2">
        <div class="mb-2">
          <label class="form-label">İçerik</label>
          <input type="text" class="form-control" :value="item.content" @input="updateItem(idx, 'content', $event.target.value)" />
        </div>
        <div class="row g-2">
          <div class="col">
            <label class="form-label">Grow</label>
            <input type="checkbox" class="form-check-input ms-2" :checked="item.grow" @change="updateItem(idx, 'grow', $event.target.checked)" />
          </div>
          <div class="col">
            <label class="form-label">Shrink</label>
            <input type="checkbox" class="form-check-input ms-2" :checked="item.shrink" @change="updateItem(idx, 'shrink', $event.target.checked)" />
          </div>
          <div class="col">
            <label class="form-label">Order</label>
            <input type="number" class="form-control" :value="item.order" min="" @input="updateItem(idx, 'order', $event.target.value)" />
          </div>
        </div>
        <div class="row g-2 mt-2">
          <div class="col">
            <label class="form-label">Align Self</label>
            <select class="form-select" :value="item.alignSelf" @change="updateItem(idx, 'alignSelf', $event.target.value)">
              <option value="">Varsayılan</option>
              <option value="align-self-start">Üst (start)</option>
              <option value="align-self-end">Alt (end)</option>
              <option value="align-self-center">Ortala (center)</option>
              <option value="align-self-baseline">Yazı Çizgisi (baseline)</option>
              <option value="align-self-stretch">Stretch</option>
            </select>
          </div>
          <div class="col">
            <label class="form-label">Basis</label>
            <input type="text" class="form-control" :value="item.basis" @input="updateItem(idx, 'basis', $event.target.value)" placeholder="ör: 0, 100px, 25%" />
          </div>
          <div class="col">
            <label class="form-label">Ekstra Sınıf</label>
            <input type="text" class="form-control" :value="item.extraClass" @input="updateItem(idx, 'extraClass', $event.target.value)" />
          </div>
        </div>
        <button class="btn btn-sm btn-outline-danger mt-2" @click="removeItem(idx)">Sil</button>
      </div>
    </div>
  </div>
</template>
<script>
export function getDefaultOptions() {
  return {
    direction: 'flex-row',
    wrap: 'flex-nowrap',
    justify: 'justify-content-start',
    align: 'align-items-stretch',
    alignContent: '',
    gap: '',
    extraClass: '',
    items: [
      { content: 'Öğe 1', grow: false, shrink: false, alignSelf: '', order: '', basis: '', extraClass: '' },
      { content: 'Öğe 2', grow: false, shrink: false, alignSelf: '', order: '', basis: '', extraClass: '' }
    ]
  }
}
export function generateHtml(options) {
  const { direction = 'flex-row', wrap = 'flex-nowrap', justify = 'justify-content-start', align = 'align-items-stretch', alignContent = '', gap = '', extraClass = '', items = [] } = options || {}
  const containerClass = [
    'd-flex',
    direction,
    wrap,
    justify,
    align,
    alignContent,
    gap,
    extraClass
  ].filter(Boolean).join(' ')
  let html = `<div class="${containerClass}">\n`
  for (let i = 0; i < items.length; i++) {
    const item = items[i] || {}
    let itemClass = []
    if (item.grow) itemClass.push('flex-grow-1')
    if (item.shrink) itemClass.push('flex-shrink-1')
    if (item.alignSelf) itemClass.push(item.alignSelf)
    if (item.order) itemClass.push(`order-${item.order}`)
    if (item.basis) itemClass.push(`flex-basis-${item.basis}`)
    if (item.extraClass) itemClass.push(item.extraClass)
    html += `  <div class="${itemClass.join(' ')}">${item.content || ''}</div>\n`
  }
  html += `</div>`
  return html
}
</script>
