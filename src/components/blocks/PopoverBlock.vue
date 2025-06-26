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
      <label class="form-label">Başlık</label>
      <input type="text" class="form-control" :value="options.title" @input="updateField('title', $event.target.value)" />
    </div>
    <div class="mb-3">
      <label class="form-label">İçerik (HTML destekler)</label>
      <textarea class="form-control" rows="3" :value="options.content" @input="updateField('content', $event.target.value)"></textarea>
    </div>
    <div class="mb-3">
      <label class="form-label">Konum</label>
      <select class="form-select" :value="options.placement" @change="updateField('placement', $event.target.value)">
        <option value="top">Üst</option>
        <option value="bottom">Alt</option>
        <option value="left">Sol</option>
        <option value="right">Sağ</option>
      </select>
    </div>
    <div class="mb-3">
      <label class="form-label">Tetikleyici</label>
      <select class="form-select" :value="options.trigger" @change="updateField('trigger', $event.target.value)">
        <option value="click">Tıklama (click)</option>
        <option value="hover focus">Üzerine Gelme & Odaklanma (hover focus)</option>
        <option value="focus">Odaklanma (focus)</option>
      </select>
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
    <div class="mb-3">
      <label class="form-label">Ekstra Sınıf</label>
      <input type="text" class="form-control" :value="options.extraClass" @input="updateField('extraClass', $event.target.value)" />
    </div>
  </div>
</template>

<script>
export function getDefaultOptions() {
  return {
    title: 'Popover Başlığı',
    content: '<strong>Harika</strong> popover içeriği. <em>HTML</em> destekler.',
    placement: 'top',
    trigger: 'click',
    buttonText: 'Popover Göster',
    buttonVariant: 'secondary',
    extraClass: ''
  }
}

export function generateHtml(options) {
  const { title = '', content = '', placement = 'top', trigger = 'click', buttonText = 'Popover Göster', buttonVariant = 'secondary', extraClass = '' } = options || {}
  // data-bs-content içindeki çift tırnakları escape et
  const encodedContent = content.replace(/"/g, '&quot;');
  return `<button type="button" class="btn btn-${buttonVariant} ${extraClass}" data-bs-toggle="popover" data-bs-placement="${placement}" data-bs-trigger="${trigger}" title="${title}" data-bs-content="${encodedContent}" data-bs-html="true">
  ${buttonText}
</button>`
}
</script>