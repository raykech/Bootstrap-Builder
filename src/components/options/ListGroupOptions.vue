<template>
  <div>
    <div class="mb-2">
      <label class="form-label">Öğe Listesi</label>
      <div v-for="(item, idx) in localOptions.items" :key="idx" class="input-group mb-1">
        <input v-model="item.text" class="form-control" placeholder="Metin" />
        <button class="btn btn-outline-danger" @click="removeItem(idx)">Sil</button>
      </div>
      <button class="btn btn-sm btn-outline-primary" @click="addItem">+ Yeni Öğe</button>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" v-model="localOptions.flush" id="listFlush">
      <label class="form-check-label" for="listFlush">Flush</label>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" v-model="localOptions.numbered" id="listNumbered">
      <label class="form-check-label" for="listNumbered">Numaralı</label>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" v-model="localOptions.horizontal" id="listHorizontal">
      <label class="form-check-label" for="listHorizontal">Yatay</label>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" v-model="localOptions.showCheckbox" id="listShowCheckbox">
      <label class="form-check-label" for="listShowCheckbox">Checkbox Göster</label>
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
  localOptions.items.push({ text: 'Yeni Öğe', variant: '', active: false, disabled: false, link: false, checkbox: false, checked: false })
}
function removeItem(idx) {
  localOptions.items.splice(idx, 1)
}
</script>
