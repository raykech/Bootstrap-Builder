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
  const newOptions = { ...options.value, [key]: value };
  // Thumbnail zaten yuvarlak köşeli olduğu için, thumbnail seçiliyse rounded'ı devre dışı bırak.
  if (key === 'thumbnail' && value === true) {
    newOptions.rounded = false;
  }
  emit('update:options', newOptions)
}
</script>

<template>
  <div>
    <div class="mb-3">
      <label class="form-label">Görsel URL</label>
      <input type="text" class="form-control" :value="options.src" @input="updateField('src', $event.target.value)" />
    </div>
    <div class="mb-3">
      <label class="form-label">Alt Metin (Alt Text)</label>
      <input type="text" class="form-control" :value="options.alt" @input="updateField('alt', $event.target.value)" />
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="fluidCheck" :checked="options.fluid" @change="updateField('fluid', $event.target.checked)" />
      <label class="form-check-label" for="fluidCheck">Responsive (img-fluid)</label>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="thumbnailCheck" :checked="options.thumbnail" @change="updateField('thumbnail', $event.target.checked)" />
      <label class="form-check-label" for="thumbnailCheck">Küçük Resim (img-thumbnail)</label>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="roundedCheck" :checked="options.rounded" :disabled="options.thumbnail" @change="updateField('rounded', $event.target.checked)" />
      <label class="form-check-label" :class="{'text-muted': options.thumbnail}" for="roundedCheck">Yuvarlak Köşeli (rounded)</label>
    </div>
    <div class="mb-3">
      <label class="form-label">Hizalama</label>
      <select class="form-select" :value="options.alignment" @change="updateField('alignment', $event.target.value)">
        <option value="">Varsayılan</option>
        <option value="float-start">Sola Yasla (float-start)</option>
        <option value="float-end">Sağa Yasla (float-end)</option>
        <option value="mx-auto d-block">Ortala (mx-auto d-block)</option>
      </select>
    </div>
    <div class="mb-3">
      <label class="form-label">Ekstra Sınıf</label>
      <input type="text" class="form-control" :value="options.extraClass" @input="updateField('extraClass', $event.target.value)" />
    </div>
  </div>
</template>

<script>
export function getDefaultOptions() {
  return {
    src: 'https://picsum.photos/200/200',
    alt: 'Örnek Görsel',
    fluid: true,
    thumbnail: false,
    rounded: false,
    alignment: '',
    extraClass: ''
  }
}

export function generateHtml(options) {
  const { src = '', alt = '', fluid = true, thumbnail = false, rounded = false, alignment = '', extraClass = '' } = options || {}
  const imgClasses = []
  if (fluid) { imgClasses.push('img-fluid') }

  // Thumbnail zaten yuvarlak köşeli olduğu için, ikisini aynı anda kullanmak gereksiz.
  // Öncelik thumbnail'de.
  if (thumbnail) { imgClasses.push('img-thumbnail') }
  else if (rounded) { imgClasses.push('rounded') }
  
  if (alignment) { imgClasses.push(alignment) }
  if (extraClass) { imgClasses.push(extraClass) }

  return `<img src="${src}" class="${imgClasses.join(' ')}" alt="${alt}">`
}
</script>