<template>
  <div>
    <div class="mb-2">
      <label class="form-label">Satır Sayısı</label>
      <input v-model.number="localOptions.rows" type="number" min="1" class="form-control" />
    </div>
    <div v-for="(row, rIdx) in localOptions.cols" :key="rIdx" class="mb-2">
      <label class="form-label">Satır {{ rIdx + 1 }} Sütunları</label>
      <div v-for="(col, cIdx) in row" :key="cIdx" class="input-group mb-1">
        <input v-model="col.content" class="form-control" placeholder="İçerik" />
        <input v-model.number="col.md" type="number" min="1" max="12" class="form-control" style="max-width:70px" placeholder="md" />
        <button class="btn btn-outline-danger" @click="removeCol(rIdx, cIdx)">Sil</button>
      </div>
      <button class="btn btn-sm btn-outline-primary" @click="addCol(rIdx)">+ Sütun</button>
    </div>
    <button class="btn btn-sm btn-outline-primary mb-2" @click="addRow">+ Satır</button>
    <div class="mb-2">
      <label class="form-label">Ekstra Sınıf</label>
      <input v-model="localOptions.extraClass" class="form-control" />
    </div>
  </div>
</template>
<script setup>
import { reactive, watch } from 'vue'
const props = defineProps({ options: Object })
const emit = defineEmits(['update:options'])
const localOptions = reactive({ ...props.options })
watch(localOptions, v => emit('update:options', { ...v }), { deep: true })
function addRow() {
  localOptions.rows++
  localOptions.cols.push([{ content: 'Yeni Sütun', md: 6, sm: 12, order: undefined, offset: undefined, extraClass: '' }])
}
function addCol(rIdx) {
  localOptions.cols[rIdx].push({ content: 'Yeni Sütun', md: 6, sm: 12, order: undefined, offset: undefined, extraClass: '' })
}
function removeCol(rIdx, cIdx) {
  localOptions.cols[rIdx].splice(cIdx, 1)
}
</script>
