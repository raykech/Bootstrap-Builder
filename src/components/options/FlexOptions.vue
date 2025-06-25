<template>
  <div>
    <div class="mb-2">
      <label class="form-label">Yön</label>
      <select v-model="localOptions.direction" class="form-select">
        <option value="flex-row">Yatay</option>
        <option value="flex-column">Dikey</option>
      </select>
    </div>
    <div class="mb-2">
      <label class="form-label">Sarma</label>
      <select v-model="localOptions.wrap" class="form-select">
        <option value="flex-nowrap">Sarma Yok</option>
        <option value="flex-wrap">Sarma</option>
        <option value="flex-wrap-reverse">Ters Sarma</option>
      </select>
    </div>
    <div class="mb-2">
      <label class="form-label">Justify</label>
      <select v-model="localOptions.justify" class="form-select">
        <option value="justify-content-start">Başlangıç</option>
        <option value="justify-content-center">Ortala</option>
        <option value="justify-content-end">Bitiş</option>
        <option value="justify-content-between">Arası Açık</option>
        <option value="justify-content-around">Etrafında</option>
        <option value="justify-content-evenly">Eşit</option>
      </select>
    </div>
    <div class="mb-2">
      <label class="form-label">Align</label>
      <select v-model="localOptions.align" class="form-select">
        <option value="align-items-stretch">Stretch</option>
        <option value="align-items-start">Başlangıç</option>
        <option value="align-items-center">Ortala</option>
        <option value="align-items-end">Bitiş</option>
        <option value="align-items-baseline">Baseline</option>
      </select>
    </div>
    <div class="mb-2">
      <label class="form-label">Ekstra Sınıf</label>
      <input v-model="localOptions.extraClass" class="form-control" />
    </div>
    <div class="mb-2">
      <label class="form-label">Öğeler</label>
      <div v-for="(item, idx) in localOptions.items" :key="idx" class="input-group mb-1">
        <input v-model="item.content" class="form-control" placeholder="İçerik" />
        <button class="btn btn-outline-danger" @click="removeItem(idx)">Sil</button>
      </div>
      <button class="btn btn-sm btn-outline-primary" @click="addItem">+ Yeni Öğre</button>
    </div>
  </div>
</template>
<script setup>
import { reactive, watch } from 'vue'
const props = defineProps({ options: Object })
const emit = defineEmits(['update:options'])
const localOptions = reactive({ ...props.options })
watch(localOptions, v => emit('update:options', { ...v }), { deep: true })
function addItem() {
  localOptions.items.push({ content: 'Yeni', grow: false, shrink: false, alignSelf: '', order: '', basis: '', extraClass: '' })
}
function removeItem(idx) {
  localOptions.items.splice(idx, 1)
}
</script>
