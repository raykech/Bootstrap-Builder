<template>
  <div>
    <div class="mb-2">
      <label class="form-label">Metin</label>
      <input v-model="localOptions.text" class="form-control" />
    </div>
    <div class="mb-2">
      <label class="form-label">Renk</label>
      <select v-model="localOptions.variant" class="form-select">
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
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" v-model="localOptions.pill" id="badgePill">
      <label class="form-check-label" for="badgePill">Pill</label>
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
