<script setup>
import { toRef } from 'vue'
const props = defineProps({ options: { type: Object, required: true } })
const emit = defineEmits(['update:options'])
const options = toRef(props, 'options')
function updateField(key, value) { emit('update:options', { ...options.value, [key]: value }) }
function updateCol(rowIdx, colIdx, key, value) {
  const cols = options.value.cols.map(row => row.map(col => ({ ...col })))
  cols[rowIdx][colIdx][key] = value
  emit('update:options', { ...options.value, cols })
}
function addRow() {
  const cols = options.value.cols.slice()
  cols.push([{ content: `Sütun 1`, md: 6, sm: 12, order: '', offset: '', colType: 'col', extraClass: '' }])
  emit('update:options', { ...options.value, rows: cols.length, cols })
}
function removeRow(idx) {
  const cols = options.value.cols.slice()
  cols.splice(idx, 1)
  emit('update:options', { ...options.value, rows: cols.length, cols })
}
function addCol(rowIdx) {
  const cols = options.value.cols.map(row => row.map(col => ({ ...col })))
  cols[rowIdx].push({ content: `Sütun ${cols[rowIdx].length + 1}`, md: 6, sm: 12, order: '', offset: '', colType: 'col', extraClass: '' })
  emit('update:options', { ...options.value, cols })
}
function removeCol(rowIdx, colIdx) {
  const cols = options.value.cols.map(row => row.map(col => ({ ...col })))
  cols[rowIdx].splice(colIdx, 1)
  emit('update:options', { ...options.value, cols })
}
</script>
<template>
  <div>
    <div class="mb-3">
      <label class="form-label">Satır Sayısı</label>
      <input type="number" class="form-control" :value="options.rows" min="1" @input="updateField('rows', +$event.target.value)" />
      <button class="btn btn-sm btn-outline-primary mt-2" @click="addRow">+ Satır Ekle</button>
    </div>
    <div class="mb-3">
      <label class="form-label">Row-cols</label>
      <select class="form-select" :value="options.rowCols" @change="updateField('rowCols', $event.target.value)">
        <option value="">Yok</option>
        <option v-for="n in 6" :key="n" :value="`row-cols-${n}`">row-cols-{{n}}</option>
        <option value="row-cols-auto">row-cols-auto</option>
      </select>
    </div>
    <div class="mb-3">
      <label class="form-label">Yatay Hizalama (Justify)</label>
      <select class="form-select" :value="options.rowJustify" @change="updateField('rowJustify', $event.target.value)">
        <option value="">Varsayılan</option>
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
      <select class="form-select" :value="options.rowAlign" @change="updateField('rowAlign', $event.target.value)">
        <option value="">Varsayılan</option>
        <option value="align-items-start">Üst (start)</option>
        <option value="align-items-end">Alt (end)</option>
        <option value="align-items-center">Ortala (center)</option>
        <option value="align-items-baseline">Yazı Çizgisi (baseline)</option>
        <option value="align-items-stretch">Stretch</option>
      </select>
    </div>
    <div class="mb-3">
      <label class="form-label">Text Center</label>
      <input type="checkbox" class="form-check-input ms-2" :checked="options.textCenter" @change="updateField('textCenter', $event.target.checked)" />
    </div>
    <div class="mb-3">
      <label class="form-label">Border Göster</label>
      <input type="checkbox" class="form-check-input ms-2" :checked="options.showBorders" @change="updateField('showBorders', $event.target.checked)" />
    </div>
    <div class="mb-3">
      <label class="form-label">Ekstra Sınıf</label>
      <input type="text" class="form-control" :value="options.extraClass" @input="updateField('extraClass', $event.target.value)" />
    </div>
    <div class="mb-3">
      <label class="form-label">Satırlar ve Sütunlar</label>
      <div v-for="(row, rowIdx) in options.cols" :key="'row'+rowIdx" class="border rounded p-2 mb-2">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span>Satır {{ rowIdx + 1 }}</span>
          <button class="btn btn-sm btn-outline-danger" @click="removeRow(rowIdx)">Satırı Sil</button>
        </div>
        <button class="btn btn-sm btn-outline-primary mb-2" @click="addCol(rowIdx)">+ Sütun Ekle</button>
        <div v-for="(col, colIdx) in row" :key="'col'+colIdx" class="border rounded p-2 mb-2">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span>Sütun {{ colIdx + 1 }}</span>
            <button class="btn btn-sm btn-outline-danger" @click="removeCol(rowIdx, colIdx)">Sütunu Sil</button>
          </div>
          <div class="mb-2">
            <label class="form-label">İçerik</label>
            <input type="text" class="form-control" :value="col.content" @input="updateCol(rowIdx, colIdx, 'content', $event.target.value)" />
          </div>
          <div class="row g-2">
            <div class="col">
              <label class="form-label">Col Tipi</label>
              <select class="form-select" :value="col.colType" @change="updateCol(rowIdx, colIdx, 'colType', $event.target.value)">
                <option value="col">col</option>
                <option value="col-auto">col-auto</option>
                <option value="col-sm">col-sm</option>
                <option value="col-md">col-md</option>
                <option value="col-lg">col-lg</option>
                <option value="col-xl">col-xl</option>
                <option value="col-xxl">col-xxl</option>
              </select>
            </div>
            <div class="col">
              <label class="form-label">md</label>
              <input type="number" class="form-control" :value="col.md" min="1" max="12" @input="updateCol(rowIdx, colIdx, 'md', +$event.target.value)" />
            </div>
            <div class="col">
              <label class="form-label">sm</label>
              <input type="number" class="form-control" :value="col.sm" min="1" max="12" @input="updateCol(rowIdx, colIdx, 'sm', +$event.target.value)" />
            </div>
            <div class="col">
              <label class="form-label">Order</label>
              <input type="number" class="form-control" :value="col.order" min="" @input="updateCol(rowIdx, colIdx, 'order', $event.target.value)" />
            </div>
            <div class="col">
              <label class="form-label">Offset</label>
              <input type="number" class="form-control" :value="col.offset" min="" @input="updateCol(rowIdx, colIdx, 'offset', $event.target.value)" />
            </div>
            <div class="col">
              <label class="form-label">Ekstra Sınıf</label>
              <input type="text" class="form-control" :value="col.extraClass" @input="updateCol(rowIdx, colIdx, 'extraClass', $event.target.value)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export function getDefaultOptions() {
  return {
    rows: 1,
    cols: [
      [
        { content: 'Sütun 1', md: 6, sm: 12, order: undefined, offset: undefined, extraClass: '' },
        { content: 'Sütun 2', md: 6, sm: 12, order: undefined, offset: undefined, extraClass: '' }
      ]
    ],
    rowAlign: '',
    rowJustify: '',
    extraClass: ''
  }
}
export function generateHtml(options) {
  const { rows = 1, cols = [[]], rowAlign = '', rowJustify = '', extraClass = '', showBorders = false, rowCols = '', textCenter = false } = options || {}
  let html = ''
  for (let r = 0; r < rows; r++) {
    const rowColsArr = cols[r] || []
    const rowClass = [
      'row',
      rowCols,
      rowAlign,
      rowJustify,
      textCenter ? 'text-center' : '',
      extraClass
    ].filter(Boolean).join(' ')
    html += `<div class="${rowClass}${showBorders ? ' border border-primary' : ''}">\n`
    for (let c = 0; c < rowColsArr.length; c++) {
      const col = rowColsArr[c] || {}
      let colClass = [col.colType || 'col']
      if (col.extraClass) colClass.push(col.extraClass)
      if (showBorders) colClass.push('border', 'border-secondary')
      html += `  <div class="${colClass.join(' ')}">${col.content || ''}</div>\n`
    }
    html += `</div>\n`
  }
  return html.trim()
}
</script>
