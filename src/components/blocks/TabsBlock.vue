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
  const newId = `tab-${Date.now()}` // Basit bir benzersiz ID
  items.push({ id: newId, label: `Yeni Sekme ${items.length + 1}`, content: `Yeni Sekme ${items.length + 1} içeriği.`, active: false, disabled: false })
  emit('update:options', { ...options.value, items })
}

function removeItem(idx) {
  const items = options.value.items.slice()
  items.splice(idx, 1)
  // Eğer silinen öğe aktifse ve başka öğe varsa, ilk öğeyi aktif yap
  if (items.length > 0 && !items.some(item => item.active)) {
    items[0].active = true;
  }
  emit('update:options', { ...options.value, items })
}

function toggleActive(idx) {
  const items = options.value.items.map((item, i) => ({
    ...item,
    active: i === idx // Sadece tıklanan öğe aktif olur
  }))
  emit('update:options', { ...options.value, items })
}
</script>

<template>
  <div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="fadeCheck" :checked="options.fade" @change="updateField('fade', $event.target.checked)" />
      <label class="form-check-label" for="fadeCheck">Geçiş Efekti (Fade)</label>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="verticalCheck" :checked="options.vertical" @change="updateField('vertical', $event.target.checked)" />
      <label class="form-check-label" for="verticalCheck">Dikey Sekmeler</label>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="justifiedCheck" :checked="options.justified" @change="updateField('justified', $event.target.checked)" />
      <label class="form-check-label" for="justifiedCheck">Justified Sekmeler</label>
    </div>

    <div class="mb-3 mt-3">
      <label class="form-label">Sekmeler</label>
      <button class="btn btn-sm btn-outline-primary ms-2 mb-2" @click="addItem">+ Sekme Ekle</button>
      <div v-for="(item, idx) in options.items" :key="'tab-item-'+item.id" class="border rounded p-2 mb-2">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span>Sekme {{ idx + 1 }}</span>
          <button class="btn btn-sm btn-outline-danger" @click="removeItem(idx)">Sil</button>
        </div>
        <div class="mb-2">
          <label class="form-label">Etiket</label>
          <input type="text" class="form-control" :value="item.label" @input="updateItem(idx, 'label', $event.target.value)" />
        </div>
        <div class="mb-2">
          <label class="form-label">İçerik</label>
          <textarea class="form-control" :value="item.content" @input="updateItem(idx, 'content', $event.target.value)"></textarea>
        </div>
        <div class="form-check mb-1">
          <input class="form-check-input" type="checkbox" :id="'tabActive'+item.id" :checked="item.active" @change="toggleActive(idx)" />
          <label class="form-check-label" :for="'tabActive'+item.id">Aktif</label>
        </div>
        <div class="form-check mb-1">
          <input class="form-check-input" type="checkbox" :id="'tabDisabled'+item.id" :checked="item.disabled" @change="updateItem(idx, 'disabled', $event.target.checked)" />
          <label class="form-check-label" :for="'tabDisabled'+item.id">Pasif</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export function getDefaultOptions() {
  return {
    items: [
      { id: 'tab-home', label: 'Ana Sayfa', content: 'Ana Sayfa içeriği.', active: true, disabled: false },
      { id: 'tab-profile', label: 'Profil', content: 'Profil içeriği.', active: false, disabled: false },
      { id: 'tab-contact', label: 'İletişim', content: 'İletişim içeriği.', active: false, disabled: false }
    ],
    fade: true,
    vertical: false,
    justified: false
  }
}

export function generateHtml(options) {
  const { items = [], fade = true, vertical = false, justified = false } = options || {}

  if (items.length === 0) {
    return `<p class="text-muted">Lütfen en az bir sekme ekleyin.</p>`;
  }

  let navHtml = '';
  let tabContentHtml = '';

  const navTypeClass = vertical ? 'nav-pills' : 'nav-tabs';
  const navDirectionClass = vertical ? 'flex-column me-3' : '';
  const navJustifiedClass = justified && !vertical ? 'nav-justified' : ''; // justified sadece yatay sekmeler için

  navHtml = items.map(item => {
    const linkClasses = ['nav-link'];
    if (item.active) linkClasses.push('active');
    if (item.disabled) linkClasses.push('disabled');
    return `    <li class="nav-item">
      <button class="${linkClasses.join(' ')}" id="${item.id}-tab" data-bs-toggle="tab" data-bs-target="#${item.id}" type="button" role="tab" aria-controls="${item.id}" aria-selected="${item.active}">${item.label}</button>
    </li>`;
  }).join('\n');

  tabContentHtml = items.map(item => {
    const paneClasses = ['tab-pane'];
    if (fade) paneClasses.push('fade');
    if (item.active) paneClasses.push('show', 'active');
    return `    <div class="${paneClasses.join(' ')}" id="${item.id}" role="tabpanel" aria-labelledby="${item.id}-tab">
      ${item.content}
    </div>`;
  }).join('\n');

  if (vertical) {
    return `<div class="d-flex align-items-start">
  <div class="nav ${navTypeClass} ${navDirectionClass}" id="v-pills-tab" role="tablist" aria-orientation="vertical">
    ${navHtml}
  </div>
  <div class="tab-content" id="v-pills-tabContent">
    ${tabContentHtml}
  </div>
</div>`;
  } else {
    return `<ul class="nav ${navTypeClass} ${navJustifiedClass}" id="myTab" role="tablist">
${navHtml}
</ul>
<div class="tab-content" id="myTabContent">
${tabContentHtml}
</div>`;
  }
}
</script>