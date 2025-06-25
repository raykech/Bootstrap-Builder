<script setup>
import { toRef } from 'vue'
const props = defineProps({ options: { type: Object, required: true } })
const emit = defineEmits(['update:options'])
const options = toRef(props, 'options')
function updateField(key, value) { emit('update:options', { ...options.value, [key]: value }) }
function updateMenu(idx, key, value) {
  const menu = options.value.menu.slice()
  menu[idx] = { ...menu[idx], [key]: value }
  emit('update:options', { ...options.value, menu })
}
function addMenu() {
  const menu = options.value.menu.slice()
  menu.push({ text: 'Link', href: '#', active: false, disabled: false })
  emit('update:options', { ...options.value, menu })
}
function removeMenu(idx) {
  const menu = options.value.menu.slice()
  menu.splice(idx, 1)
  emit('update:options', { ...options.value, menu })
}
</script>
<template>
  <div>
    <div class="mb-3">
      <label class="form-label">Marka</label>
      <input type="text" class="form-control" :value="options.brand" @input="updateField('brand', $event.target.value)" />
    </div>
    <div class="mb-3">
      <label class="form-label">Tema</label>
      <select class="form-select" :value="options.scheme" @change="updateField('scheme', $event.target.value)">
        <option value="navbar-light">Açık (navbar-light)</option>
        <option value="navbar-dark">Koyu (navbar-dark)</option>
      </select>
    </div>
    <div class="mb-3">
      <label class="form-label">Arka Plan</label>
      <select class="form-select" :value="options.bg" @change="updateField('bg', $event.target.value)">
        <option value="bg-light">Açık</option>
        <option value="bg-dark">Koyu</option>
        <option value="bg-primary">Primary</option>
        <option value="bg-secondary">Secondary</option>
        <option value="bg-success">Success</option>
        <option value="bg-danger">Danger</option>
        <option value="bg-warning">Warning</option>
        <option value="bg-info">Info</option>
      </select>
    </div>
    <div class="mb-3">
      <label class="form-label">Konum</label>
      <select class="form-select" :value="options.position" @change="updateField('position', $event.target.value)">
        <option value="">Varsayılan</option>
        <option value="fixed-top">Sabit Üstte (fixed-top)</option>
        <option value="fixed-bottom">Sabit Altta (fixed-bottom)</option>
        <option value="sticky-top">Yapışkan Üstte (sticky-top)</option>
      </select>
    </div>
    <div class="mb-3">
      <label class="form-label">Genişlik</label>
      <select class="form-select" :value="options.container" @change="updateField('container', $event.target.value)">
        <option value="container-fluid">Tam Genişlik (container-fluid)</option>
        <option value="container">Orta (container)</option>
        <option value="container-xxl">XXL</option>
        <option value="container-xl">XL</option>
        <option value="container-lg">LG</option>
        <option value="container-md">MD</option>
        <option value="container-sm">SM</option>
      </select>
    </div>
    <div class="mb-3">
      <label class="form-label">Menü Hizalama</label>
      <select class="form-select" :value="options.menuAlign" @change="updateField('menuAlign', $event.target.value)">
        <option value="">Varsayılan</option>
        <option value="ms-auto">Sağa (ms-auto)</option>
        <option value="me-auto">Sola (me-auto)</option>
        <option value="justify-content-center">Ortala</option>
      </select>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="searchCheck" :checked="options.search" @change="updateField('search', $event.target.checked)" />
      <label class="form-check-label" for="searchCheck">Arama Kutusu</label>
    </div>
    <div class="mb-3">
      <label class="form-label">Menü Öğeleri</label>
      <button class="btn btn-sm btn-outline-primary ms-2 mb-2" @click="addMenu">+ Ekle</button>
      <div v-for="(item, idx) in options.menu" :key="'menu'+idx" class="border rounded p-2 mb-2">
        <div class="d-flex align-items-center mb-2">
          <span>Öğe {{ idx + 1 }}</span>
          <button class="btn btn-sm btn-outline-danger ms-2" @click="removeMenu(idx)">Sil</button>
        </div>
        <div class="mb-2">
          <label class="form-label">Metin</label>
          <input type="text" class="form-control" :value="item.text" @input="updateMenu(idx, 'text', $event.target.value)" />
        </div>
        <div class="mb-2">
          <label class="form-label">Bağlantı (href)</label>
          <input type="text" class="form-control" :value="item.href" @input="updateMenu(idx, 'href', $event.target.value)" />
        </div>
        <div class="form-check mb-1">
          <input class="form-check-input" type="checkbox" :id="'active'+idx" :checked="item.active" @change="updateMenu(idx, 'active', $event.target.checked)" />
          <label class="form-check-label" :for="'active'+idx">Aktif</label>
        </div>
        <div class="form-check mb-1">
          <input class="form-check-input" type="checkbox" :id="'disabled'+idx" :checked="item.disabled" @change="updateMenu(idx, 'disabled', $event.target.checked)" />
          <label class="form-check-label" :for="'disabled'+idx">Pasif</label>
        </div>
      </div>
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
    brand: 'Marka',
    scheme: 'navbar-light',
    bg: 'bg-light',
    position: '',
    container: 'container-fluid',
    menuAlign: '',
    search: false,
    menu: [
      { text: 'Home', href: '#', active: true, disabled: false },
      { text: 'Link', href: '#', active: false, disabled: false }
    ],
    extraClass: ''
  }
}
export function generateHtml(options) {
  const {
    brand = '',
    scheme = 'navbar-light',
    bg = 'bg-light',
    position = '',
    container = 'container-fluid',
    menuAlign = '',
    search = false,
    menu = [],
    extraClass = ''
  } = options || {}
  const navClass = [
    'navbar',
    scheme,
    bg,
    position,
    `navbar-expand-md`,
    extraClass
  ].filter(Boolean).join(' ')
  return [
    `<nav class="${navClass}">`,
    `  <div class="${container}">`,
    `    <a class="navbar-brand" href="#">${brand}</a>`,
    `    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">\n      <span class="navbar-toggler-icon"></span>\n    </button>`,
    `    <div class="collapse navbar-collapse" id="navbarNav">`,
    `      <ul class="navbar-nav ${menuAlign}">`,
    ...menu.map(item => `        <li class="nav-item"><a class="nav-link${item.active ? ' active' : ''}${item.disabled ? ' disabled' : ''}" href="${item.href}">${item.text}</a></li>`),
    `      </ul>`,
    search ? `      <form class="d-flex ms-auto"><input class="form-control" type="search" placeholder="Ara"></form>` : '',
    `    </div>`,
    `  </div>`,
    `</nav>`
  ].filter(Boolean).join('\n')
}
</script>
