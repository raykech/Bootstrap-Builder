<template>
  <div>
    <!-- Card seçenek paneli -->
    <div class="mb-2">
      <label class="form-label">Başlık</label>
      <input v-model="localOptions.title" class="form-control" />
    </div>
    <div class="mb-2">
      <label class="form-label">İçerik</label>
      <textarea v-model="localOptions.text" class="form-control" />
    </div>
    <div class="mb-2">
      <label class="form-label">Renk</label>
      <select v-model="localOptions.variant" class="form-select">
        <option value="light">Light</option>
        <option value="primary">Primary</option>
        <option value="secondary">Secondary</option>
        <option value="success">Success</option>
        <option value="danger">Danger</option>
        <option value="warning">Warning</option>
        <option value="info">Info</option>
        <option value="dark">Dark</option>
      </select>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" v-model="localOptions.showImg" id="cardShowImg">
      <label class="form-check-label" for="cardShowImg">Görsel Göster</label>
    </div>
    <div v-if="localOptions.showImg" class="mb-2">
      <label class="form-label">Görsel URL</label>
      <input v-model="localOptions.img" class="form-control" />
      <div class="form-check mt-1">
        <input class="form-check-input" type="checkbox" v-model="localOptions.usePlaceholderImg" id="cardPlaceholderImg">
        <label class="form-check-label" for="cardPlaceholderImg">Örnek Görsel Kullan</label>
      </div>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" v-model="localOptions.showFooter" id="cardShowFooter">
      <label class="form-check-label" for="cardShowFooter">Footer Göster</label>
    </div>
    <div v-if="localOptions.showFooter" class="mb-2">
      <label class="form-label">Footer İçeriği</label>
      <input v-model="localOptions.footer" class="form-control" />
    </div>
    <div class="mb-2">
      <label class="form-label">Min Yükseklik (px)</label>
      <input v-model.number="localOptions.minHeight" type="number" class="form-control" min="0" />
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
