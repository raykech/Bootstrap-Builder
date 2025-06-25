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
      <textarea class="form-control" :value="options.text" @input="updateField('text', $event.target.value)"></textarea>
    </div>
    <div class="mb-3">
      <label class="form-label">Renk</label>
      <select class="form-select" :value="options.variant" @change="updateField('variant', $event.target.value)">
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
    <div class="mb-3">
      <label class="form-label">Kart Stili</label>
      <select class="form-select" :value="options.border" @change="updateField('border', $event.target.value)">
        <option value="">Varsayılan</option>
        <option value="border-primary">Border Primary</option>
        <option value="border-secondary">Border Secondary</option>
        <option value="border-success">Border Success</option>
        <option value="border-danger">Border Danger</option>
        <option value="border-warning">Border Warning</option>
        <option value="border-info">Border Info</option>
        <option value="border-light">Border Light</option>
        <option value="border-dark">Border Dark</option>
      </select>
    </div>
    <div class="mb-3">
      <label class="form-label">Gölge</label>
      <select class="form-select" :value="options.shadow" @change="updateField('shadow', $event.target.value)">
        <option value="">Yok</option>
        <option value="shadow">Shadow</option>
        <option value="shadow-sm">Shadow-sm</option>
        <option value="shadow-lg">Shadow-lg</option>
      </select>
    </div>
    <div class="mb-3">
      <label class="form-label">Min Yükseklik (px)</label>
      <input type="number" class="form-control" :value="options.minHeight" @input="updateField('minHeight', $event.target.value)" />
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="showImgCheck" :checked="options.showImg" @change="updateField('showImg', $event.target.checked)" />
      <label class="form-check-label" for="showImgCheck">Görsel Göster</label>
    </div>
    <div v-if="options.showImg" class="mb-3">
      <label class="form-label">Görsel Yolu</label>
      <input
        type="text"
        class="form-control mb-2"
        :value="options.img"
        @input="updateField('img', $event.target.value)"
        :disabled="options.usePlaceholderImg"
        :placeholder="options.usePlaceholderImg ? 'Varsayılan görsel kullanılacak (images/ornek.jpg)' : 'Görsel yolu veya URL'"
      />
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="usePlaceholderImg" :checked="options.usePlaceholderImg" @change="updateField('usePlaceholderImg', $event.target.checked)" />
        <label class="form-check-label" for="usePlaceholderImg">Varsayılan Görsel (ornek.jpg)</label>
      </div>
      <div class="form-check mt-2">
        <input class="form-check-input" type="checkbox" id="imgTop" :checked="options.imgTop" @change="updateField('imgTop', $event.target.checked)" />
        <label class="form-check-label" for="imgTop">Görsel Üstte</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="imgBottom" :checked="options.imgBottom" @change="updateField('imgBottom', $event.target.checked)" />
        <label class="form-check-label" for="imgBottom">Görsel Altta</label>
      </div>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="showFooterCheck" :checked="options.showFooter" @change="updateField('showFooter', $event.target.checked)" />
      <label class="form-check-label" for="showFooterCheck">Footer Göster</label>
    </div>
    <div v-if="options.showFooter" class="mb-3">
      <label class="form-label">Footer İçeriği</label>
      <input type="text" class="form-control" :value="options.footer" @input="updateField('footer', $event.target.value)" />
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="showHeaderCheck" :checked="options.showHeader" @change="updateField('showHeader', $event.target.checked)" />
      <label class="form-check-label" for="showHeaderCheck">Header Göster</label>
    </div>
    <div v-if="options.showHeader" class="mb-3">
      <label class="form-label">Header İçeriği</label>
      <input type="text" class="form-control" :value="options.header" @input="updateField('header', $event.target.value)" />
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
    img: '',
    usePlaceholderImg: true,
    imgTop: true,
    imgBottom: false,
    title: 'Kart Başlığı',
    text: 'Kart içeriği buraya gelecek.',
    header: '',
    showHeader: false,
    footer: '',
    showFooter: false,
    variant: 'light',
    border: '',
    shadow: '',
    minHeight: '',
    showImg: false,
    extraClass: ''
  }
}
export function generateHtml(options) {
  const {
    img = '',
    usePlaceholderImg = true,
    imgTop = true,
    imgBottom = false,
    title = '',
    text = '',
    header = '',
    showHeader = false,
    footer = '',
    showFooter = false,
    variant = 'light',
    border = '',
    shadow = '',
    minHeight = '',
    showImg = false,
    extraClass = ''
  } = options || {}
  let imgSrc = img
  if (showImg && usePlaceholderImg) { imgSrc = 'images/ornek.jpg' }
  let style = `max-width: 22rem;`
  if (minHeight) style += ` min-height: ${minHeight}px;`
  const cardClass = [
    'card',
    `bg-${variant}`,
    border,
    shadow,
    extraClass
  ].filter(Boolean).join(' ')
  return [
    `<div class="${cardClass}" style="${style}">`,
    showHeader && header ? `  <div class="card-header">${header}</div>` : '',
    showImg && imgSrc && imgTop ? `  <img src="${imgSrc}" class="card-img-top" alt="...">` : '',
    `  <div class="card-body">`,
    `    <h5 class="card-title">${title}</h5>`,
    `    <p class="card-text">${text}</p>`,
    `  </div>`,
    showImg && imgSrc && imgBottom ? `  <img src="${imgSrc}" class="card-img-bottom" alt="...">` : '',
    showFooter && footer ? `  <div class="card-footer">${footer}</div>` : '',
    `</div>`
  ].filter(Boolean).join('\n')
}
</script>
