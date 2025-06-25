<template>
  <div>
    <div class="mb-2">
      <label class="form-label">Başlık</label>
      <input v-model="localOptions.title" class="form-control" />
    </div>
    <div class="mb-2">
      <label class="form-label">İçerik</label>
      <textarea v-model="localOptions.body" class="form-control" />
    </div>
    <div class="mb-2">
      <label class="form-label">Buton Metni</label>
      <input v-model="localOptions.buttonText" class="form-control" />
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" v-model="localOptions.centered" id="modalCentered">
      <label class="form-check-label" for="modalCentered">Dikey Ortala</label>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" v-model="localOptions.scrollable" id="modalScrollable">
      <label class="form-check-label" for="modalScrollable">Kaydırılabilir İçerik</label>
    </div>
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
</script>
