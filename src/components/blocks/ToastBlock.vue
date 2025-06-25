<script setup>
import { toRef, onMounted, nextTick } from 'vue'
// Bootstrap JS importu eklendi
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
const props = defineProps({ options: { type: Object, required: true } })
const emit = defineEmits(['update:options'])
const options = toRef(props, 'options')
function updateField(key, value) { emit('update:options', { ...options.value, [key]: value }) }

onMounted(() => {
  nextTick(() => {
    if (typeof window !== 'undefined' && window.bootstrap) {
      const el = document.getElementById('toastDemo')
      if (el) {
        try {
          window.toastInstance = window.bootstrap.Toast.getOrCreateInstance(el)
        } catch {}
      }
    }
  })
})
function showToast() {
  if (typeof window !== 'undefined' && window.bootstrap) {
    const el = document.getElementById('toastDemo')
    if (el) {
      const toast = window.bootstrap.Toast.getOrCreateInstance(el)
      toast.show()
    }
  }
}
</script>
<template>
  <div>
    <div class="mb-3">
      <label class="form-label">Başlık</label>
      <input type="text" class="form-control" :value="options.title" @input="updateField('title', $event.target.value)" />
    </div>
    <div class="mb-3">
      <label class="form-label">Mesaj</label>
      <textarea class="form-control" :value="options.body" @input="updateField('body', $event.target.value)"></textarea>
    </div>
    <div class="mb-3">
      <label class="form-label">Renk</label>
      <select class="form-select" :value="options.bg" @change="updateField('bg', $event.target.value)">
        <option value="bg-primary">Primary</option>
        <option value="bg-secondary">Secondary</option>
        <option value="bg-success">Success</option>
        <option value="bg-danger">Danger</option>
        <option value="bg-warning">Warning</option>
        <option value="bg-info">Info</option>
        <option value="bg-light">Light</option>
        <option value="bg-dark">Dark</option>
      </select>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="autohideCheck" :checked="options.autohide" @change="updateField('autohide', $event.target.checked)" />
      <label class="form-check-label" for="autohideCheck">Otomatik Kapanma</label>
    </div>
    <div class="mb-3">
      <label class="form-label">Gecikme (ms)</label>
      <input type="number" class="form-control" :value="options.delay" @input="updateField('delay', $event.target.value)" />
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="showCheck" :checked="options.show" @change="updateField('show', $event.target.checked)" />
      <label class="form-check-label" for="showCheck">Açık Başlasın</label>
    </div>
    <div class="mb-3">
      <label class="form-label">Ekstra Sınıf</label>
      <input type="text" class="form-control" :value="options.extraClass" @input="updateField('extraClass', $event.target.value)" />
    </div>
    <button class="btn btn-primary mb-3" type="button" @click="showToast">Toast Göster</button>
  </div>
</template>
<script>
export function getDefaultOptions() {
  return {
    title: 'Toast Başlık',
    body: 'Toast mesajı buraya gelecek.',
    bg: 'bg-primary',
    autohide: true,
    delay: 3000,
    show: true,
    extraClass: ''
  }
}
export function generateHtml(options) {
  const {
    title = '',
    body = '',
    bg = 'bg-primary',
    autohide = true,
    delay = 3000,
    show = true,
    extraClass = ''
  } = options || {}
  return [
    `<div id="toastDemo" class="toast ${bg} ${extraClass}${show ? ' show' : ''}" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="${autohide}" data-bs-delay="${delay}" style="position: absolute; top: 1rem; right: 1rem;">`,
    `  <div class="toast-header">`,
    `    <strong class="me-auto">${title}</strong>`,
    `    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>`,
    `  </div>`,
    `  <div class="toast-body">${body}</div>`,
    `</div>`
  ].join('\n')
}
</script>
