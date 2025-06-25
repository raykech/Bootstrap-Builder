<template>
  <div>
    <div class="mb-2">
      <label class="form-label">Marka</label>
      <input v-model="localOptions.brand" class="form-control" />
    </div>
    <div class="mb-2">
      <label class="form-label">Arka Plan</label>
      <select v-model="localOptions.bg" class="form-select">
        <option value="bg-light">Açık</option>
        <option value="bg-dark">Koyu</option>
        <option value="bg-primary">Primary</option>
        <option value="bg-secondary">Secondary</option>
        <option value="bg-success">Success</option>
        <option value="bg-danger">Danger</option>
        <option value="bg-warning">Warning</option>
        <option value="bg-info">Info</option>
      </select>
    </div>
    <div class="mb-2">
      <label class="form-label">Tema</label>
      <select v-model="localOptions.scheme" class="form-select">
        <option value="navbar-light">Açık Tema</option>
        <option value="navbar-dark">Koyu Tema</option>
      </select>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" v-model="localOptions.search" id="navbarSearch">
      <label class="form-check-label" for="navbarSearch">Arama Kutusu</label>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" v-model="localOptions.fixedTop" id="navbarFixedTop">
      <label class="form-check-label" for="navbarFixedTop">Sabit Üstte</label>
    </div>
  </div>
</template>
<script setup>
import { reactive, watch } from 'vue'
const props = defineProps({ options: Object })
const emit = defineEmits(['update:options'])
const localOptions = reactive({ ...props.options })
watch(localOptions, v => emit('update:options', { ...v }), { deep: true })
</script>
