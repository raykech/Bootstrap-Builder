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

function updateItem(idx, key, value) {
  const items = options.value.items.slice()
  items[idx] = { ...items[idx], [key]: value }
  emit('update:options', { ...options.value, items })
}

function addItem() {
  const items = options.value.items.slice()
  items.push({
    src: `https://picsum.photos/id/${100 + items.length}/800/400`,
    alt: `Slide ${items.length + 1}`,
    captionTitle: '',
    captionText: ''
  })
  emit('update:options', { ...options.value, items })
}

function removeItem(idx) {
  const items = options.value.items.slice()
  items.splice(idx, 1)
  emit('update:options', { ...options.value, items })
}
</script>

<template>
  <div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="controlsCheck" :checked="options.controls" @change="updateField('controls', $event.target.checked)" />
      <label class="form-check-label" for="controlsCheck">Kontroller (Önceki/Sonraki)</label>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="indicatorsCheck" :checked="options.indicators" @change="updateField('indicators', $event.target.checked)" />
      <label class="form-check-label" for="indicatorsCheck">Göstergeler (Indicators)</label>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="fadeCheck" :checked="options.fade" @change="updateField('fade', $event.target.checked)" />
      <label class="form-check-label" for="fadeCheck">Fade Geçişi</label>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="darkCheck" :checked="options.dark" @change="updateField('dark', $event.target.checked)" />
      <label class="form-check-label" for="darkCheck">Koyu Tema (Kontroller için)</label>
    </div>
    <div class="mb-3">
      <label class="form-label">Otomatik Oynatma Aralığı (ms)</label>
      <input type="number" class="form-control" :value="options.interval" @input="updateField('interval', +$event.target.value)" placeholder="5000" />
      <div class="form-text">Boş bırakmak veya 0 girmek otomatik oynatmayı durdurur.</div>
    </div>

    <div class="mb-3 mt-3">
      <label class="form-label">Slaytlar</label>
      <button class="btn btn-sm btn-outline-primary ms-2 mb-2" @click="addItem">+ Slayt Ekle</button>
      <div v-for="(item, idx) in options.items" :key="'carousel-item-'+idx" class="border rounded p-2 mb-2">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span>Slayt {{ idx + 1 }}</span>
          <button class="btn btn-sm btn-outline-danger" @click="removeItem(idx)">Sil</button>
        </div>
        <div class="mb-2">
          <label class="form-label">Görsel URL</label>
          <input type="text" class="form-control" :value="item.src" @input="updateItem(idx, 'src', $event.target.value)" />
        </div>
        <div class="mb-2">
          <label class="form-label">Alt Metin</label>
          <input type="text" class="form-control" :value="item.alt" @input="updateItem(idx, 'alt', $event.target.value)" />
        </div>
        <div class="mb-2">
          <label class="form-label">Başlık</label>
          <input type="text" class="form-control" :value="item.captionTitle" @input="updateItem(idx, 'captionTitle', $event.target.value)" />
        </div>
        <div class="mb-2">
          <label class="form-label">Açıklama</label>
          <textarea class="form-control" :value="item.captionText" @input="updateItem(idx, 'captionText', $event.target.value)"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export function getDefaultOptions() {
  return {
    controls: true,
    indicators: true,
    fade: false,
    dark: false,
    interval: 5000,
    items: [
      { src: 'https://picsum.photos/id/43/800/400', alt: 'First slide', captionTitle: 'İlk Slayt Başlığı', captionText: 'İlk slayt için açıklama metni.' },
      { src: 'https://picsum.photos/id/44/800/400', alt: 'Second slide', captionTitle: 'İkinci Slayt Başlığı', captionText: 'İkinci slayt için açıklama metni.' },
      { src: 'https://picsum.photos/id/45/800/400', alt: 'Third slide', captionTitle: 'Üçüncü Slayt Başlığı', captionText: 'Üçüncü slayt için açıklama metni.' }
    ]
  }
}

export function generateHtml(options) {
  const { controls = true, indicators = true, fade = false, dark = false, interval = 5000, items = [] } = options || {}
  const carouselId = `carousel-${Date.now()}`
  const carouselClasses = ['carousel', 'slide']
  if (fade) carouselClasses.push('carousel-fade')
  if (dark) carouselClasses.push('carousel-dark')

  const intervalAttr = interval > 0 ? `data-bs-interval="${interval}"` : 'data-bs-interval="false"'

  const indicatorsHtml = indicators ? `
  <div class="carousel-indicators">
${items.map((_, idx) => `    <button type="button" data-bs-target="#${carouselId}" data-bs-slide-to="${idx}" class="${idx === 0 ? 'active' : ''}" aria-current="${idx === 0 ? 'true' : 'false'}" aria-label="Slide ${idx + 1}"></button>`).join('\n')}
  </div>` : ''

  const innerHtml = items.map((item, idx) => `
    <div class="carousel-item ${idx === 0 ? 'active' : ''}">
      <img src="${item.src}" class="d-block w-100" alt="${item.alt}">
      ${(item.captionTitle || item.captionText) ? `
      <div class="carousel-caption d-none d-md-block">
        ${item.captionTitle ? `<h5>${item.captionTitle}</h5>` : ''}
        ${item.captionText ? `<p>${item.captionText}</p>` : ''}
      </div>` : ''}
    </div>`).join('')

  const controlsHtml = controls ? `
  <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>` : ''

  return `<div id="${carouselId}" class="${carouselClasses.join(' ')}" data-bs-ride="carousel" ${intervalAttr}>
${indicatorsHtml}
  <div class="carousel-inner">
${innerHtml}
  </div>
${controlsHtml}
</div>`
}
</script>