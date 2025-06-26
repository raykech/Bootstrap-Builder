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
      <label class="form-label">Buton Metni</label>
      <input type="text" class="form-control" :value="options.buttonText" @input="updateField('buttonText', $event.target.value)" />
    </div>
    <div class="mb-3">
      <label class="form-label">İçerik (HTML destekler)</label>
      <textarea class="form-control" rows="4" :value="options.content" @input="updateField('content', $event.target.value)"></textarea>
    </div>
    <div class="mb-3">
      <label class="form-label">Buton Rengi</label>
      <select class="form-select" :value="options.buttonVariant" @change="updateField('buttonVariant', $event.target.value)">
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
      <input class="form-check-input" type="checkbox" id="showCheck" :checked="options.show" @change="updateField('show', $event.target.checked)" />
      <label class="form-check-label" for="showCheck">Açık Başlasın</label>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="horizontalCheck" :checked="options.horizontal" @change="updateField('horizontal', $event.target.checked)" />
      <label class="form-check-label" for="horizontalCheck">Yatay Collapse</label>
    </div>
    <div class="mb-3">
      <label class="form-label">Ekstra Sınıf (Buton için)</label>
      <input type="text" class="form-control" :value="options.extraClass" @input="updateField('extraClass', $event.target.value)" />
    </div>
  </div>
</template>

<script>
export function getDefaultOptions() {
  return {
    buttonText: 'Collapse Göster/Gizle',
    content: 'Bu, collapse bileşeninin içeriğidir. Varsayılan olarak gizlidir, ancak gösterilebilir.',
    show: false,
    horizontal: false,
    buttonVariant: 'primary',
    extraClass: ''
  }
}

export function generateHtml(options) {
  const {
    buttonText = 'Collapse Göster/Gizle',
    content = '',
    show = false,
    horizontal = false,
    buttonVariant = 'primary',
    extraClass = ''
  } = options || {}

  const collapseId = `collapseExample` // Önizleme için sabit ID yeterlidir
  const collapseClasses = ['collapse']
  if (show) collapseClasses.push('show')
  if (horizontal) collapseClasses.push('collapse-horizontal')

  return `<p>
  <button class="btn btn-${buttonVariant} ${extraClass}" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="${show}" aria-controls="${collapseId}">
    ${buttonText}
  </button>
</p>
<div class="${collapseClasses.join(' ')}" id="${collapseId}">
  <div class="card card-body" ${horizontal ? 'style="width: 300px;"' : ''}>
    ${content}
  </div>
</div>`
}
</script>