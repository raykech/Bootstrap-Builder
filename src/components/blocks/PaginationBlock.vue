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
      <label class="form-label">Boyut</label>
      <select class="form-select" :value="options.size" @change="updateField('size', $event.target.value)">
        <option value="">Normal</option>
        <option value="pagination-sm">Küçük</option>
        <option value="pagination-lg">Büyük</option>
      </select>
    </div>
    <div class="mb-3">
      <label class="form-label">Hizalama</label>
      <select class="form-select" :value="options.alignment" @change="updateField('alignment', $event.target.value)">
        <option value="">Sola (Varsayılan)</option>
        <option value="justify-content-center">Ortala</option>
        <option value="justify-content-end">Sağa</option>
      </select>
    </div>
    <div class="mb-3">
      <label class="form-label">Toplam Sayfa Sayısı</label>
      <input type="number" class="form-control" :value="options.totalPages" @input="updateField('totalPages', +$event.target.value)" min="1" />
    </div>
    <div class="mb-3">
      <label class="form-label">Aktif Sayfa</label>
      <input type="number" class="form-control" :value="options.activePage" @input="updateField('activePage', +$event.target.value)" min="1" :max="options.totalPages" />
    </div>
    <div class="mb-3">
      <label class="form-label">Önceki Buton Metni</label>
      <input type="text" class="form-control" :value="options.prevText" @input="updateField('prevText', $event.target.value)" />
    </div>
    <div class="mb-3">
      <label class="form-label">Sonraki Buton Metni</label>
      <input type="text" class="form-control" :value="options.nextText" @input="updateField('nextText', $event.target.value)" />
    </div>
  </div>
</template>

<script>
export function getDefaultOptions() {
  return {
    size: '',
    alignment: '',
    totalPages: 5,
    activePage: 1,
    prevText: 'Önceki',
    nextText: 'Sonraki'
  }
}

export function generateHtml(options) {
  const {
    size = '',
    alignment = '',
    totalPages = 5,
    activePage = 1,
    prevText = 'Önceki',
    nextText = 'Sonraki'
  } = options || {}

  const navClasses = ['pagination', size, alignment].filter(Boolean).join(' ')
  let itemsHtml = ''

  const prevDisabled = activePage <= 1 ? ' disabled' : ''
  itemsHtml += `  <li class="page-item${prevDisabled}">\n    <a class="page-link" href="#">${prevText}</a>\n  </li>\n`

  for (let i = 1; i <= totalPages; i++) {
    const activeClass = i === activePage ? ' active' : ''
    itemsHtml += `  <li class="page-item${activeClass}"><a class="page-link" href="#">${i}</a></li>\n`
  }

  const nextDisabled = activePage >= totalPages ? ' disabled' : ''
  itemsHtml += `  <li class="page-item${nextDisabled}">\n    <a class="page-link" href="#">${nextText}</a>\n  </li>`

  return `<nav aria-label="Page navigation">
<ul class="${navClasses}">
${itemsHtml}
</ul>
</nav>`
}
</script>