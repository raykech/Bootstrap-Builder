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
</script>

<template>
  <div>
    <div class="mb-3">
      <label class="form-label">Container Tipi</label>
      <select class="form-select" :value="options.type" @change="updateField('type', $event.target.value)">
        <option value="default">Sabit Genişlik (container)</option>
        <option value="fluid">Tam Genişlik (container-fluid)</option>
        <option value="breakpoint">Kırılma Noktasına Kadar Tam Genişlik</option>
      </select>
    </div>

    <div v-if="options.type === 'breakpoint'" class="mb-3">
      <label class="form-label">Kırılma Noktası (Breakpoint)</label>
      <select class="form-select" :value="options.breakpoint" @change="updateField('breakpoint', $event.target.value)">
        <option value="sm">sm</option>
        <option value="md">md</option>
        <option value="lg">lg</option>
        <option value="xl">xl</option>
        <option value="xxl">xxl</option>
      </select>
    </div>

    <div class="mb-3">
      <label class="form-label">İçerik (HTML destekler)</label>
      <textarea class="form-control" rows="4" :value="options.content" @input="updateField('content', $event.target.value)"></textarea>
    </div>

    <div class="mb-3">
      <label class="form-label">Ekstra Sınıf</label>
      <input type="text" class="form-control" :value="options.extraClass" @input="updateField('extraClass', $event.target.value)" />
    </div>
  </div>
</template>

<script>
export function getDefaultOptions() {
  return { type: 'default', breakpoint: 'md', content: '<p>Container içeriği buraya gelecek.</p>', extraClass: 'p-3 border bg-light' }
}

export function generateHtml(options) {
  const { type = 'default', breakpoint = 'md', content = '', extraClass = '' } = options || {}
  let containerClass = 'container'
  if (type === 'fluid') containerClass = 'container-fluid'
  else if (type === 'breakpoint') containerClass = `container-${breakpoint}`
  const finalClasses = [containerClass, extraClass].filter(Boolean).join(' ')
  return `<div class="${finalClasses}">\n  ${content}\n</div>`
}
</script>