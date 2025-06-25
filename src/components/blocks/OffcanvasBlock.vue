<script setup>
import { toRef } from 'vue'
const props = defineProps({ options: { type: Object, required: true } })
const emit = defineEmits(['update:options'])
const options = toRef(props, 'options')
function updateField(key, value) { emit('update:options', { ...options.value, [key]: value }) }
</script>
<template>
  <div>
    <div class="mb-3">
      <label class="form-label">Başlık</label>
      <input type="text" class="form-control" :value="options.title" @input="updateField('title', $event.target.value)" />
    </div>
    <div class="mb-3">
      <label class="form-label">İçerik</label>
      <textarea class="form-control" :value="options.body" @input="updateField('body', $event.target.value)"></textarea>
    </div>
    <div class="mb-3">
      <label class="form-label">Konum</label>
      <select class="form-select" :value="options.placement" @change="updateField('placement', $event.target.value)">
        <option value="start">Sol (start)</option>
        <option value="end">Sağ (end)</option>
        <option value="top">Üst (top)</option>
        <option value="bottom">Alt (bottom)</option>
      </select>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="backdropCheck" :checked="options.backdrop" @change="updateField('backdrop', $event.target.checked)" />
      <label class="form-check-label" for="backdropCheck">Arka Plan (backdrop)</label>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="scrollCheck" :checked="options.scroll" @change="updateField('scroll', $event.target.checked)" />
      <label class="form-check-label" for="scrollCheck">Sayfa Scroll Aktif</label>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="showCheck" :checked="options.show" @change="updateField('show', $event.target.checked)" />
      <label class="form-check-label" for="showCheck">Açık Başlasın</label>
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
    title: 'Offcanvas Başlık',
    body: 'Offcanvas içeriği buraya gelecek.',
    placement: 'start',
    backdrop: true,
    scroll: false,
    show: true,
    extraClass: ''
  }
}
export function generateHtml(options) {
  const {
    title = '',
    body = '',
    placement = 'start',
    backdrop = true,
    scroll = false,
    show = true,
    extraClass = ''
  } = options || {}
  return [
    `<button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDemo" aria-controls="offcanvasDemo">Offcanvas Aç</button>`,
    `<div class="offcanvas offcanvas-${placement}${show ? ' show' : ''} ${extraClass}" tabindex="-1" id="offcanvasDemo" aria-labelledby="offcanvasDemoLabel"${backdrop ? '' : ' data-bs-backdrop="false"'}${scroll ? ' data-bs-scroll="true"' : ''} style="visibility:${show ? 'visible' : 'hidden'};">`,
    `  <div class="offcanvas-header">`,
    `    <h5 class="offcanvas-title" id="offcanvasDemoLabel">${title}</h5>`,
    `    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>`,
    `  </div>`,
    `  <div class="offcanvas-body">${body}</div>`,
    `</div>`
  ].join('\n')
}
</script>
