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
      <label class="form-label">Başlık (Caption)</label>
      <input type="text" class="form-control" :value="options.caption" @input="updateField('caption', $event.target.value)" />
    </div>
    <div class="mb-3">
      <label class="form-label">Renk</label>
      <select class="form-select" :value="options.variant" @change="updateField('variant', $event.target.value)">
        <option value="">Varsayılan</option>
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
      <input class="form-check-input" type="checkbox" id="stripedCheck" :checked="options.striped" @change="updateField('striped', $event.target.checked)" />
      <label class="form-check-label" for="stripedCheck">Çizgili (Striped)</label>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="borderedCheck" :checked="options.bordered" @change="updateField('bordered', $event.target.checked)" />
      <label class="form-check-label" for="borderedCheck">Kenarlıklı (Bordered)</label>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="borderlessCheck" :checked="options.borderless" @change="updateField('borderless', $event.target.checked)" />
      <label class="form-check-label" for="borderlessCheck">Kenarlıksız (Borderless)</label>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="hoverCheck" :checked="options.hover" @change="updateField('hover', $event.target.checked)" />
      <label class="form-check-label" for="hoverCheck">Üzerine Gelince Vurgula (Hover)</label>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="smallCheck" :checked="options.small" @change="updateField('small', $event.target.checked)" />
      <label class="form-check-label" for="smallCheck">Küçük (Small)</label>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="darkCheck" :checked="options.dark" @change="updateField('dark', $event.target.checked)" />
      <label class="form-check-label" for="darkCheck">Koyu Tema (Dark)</label>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="responsiveCheck" :checked="options.responsive" @change="updateField('responsive', $event.target.checked)" />
      <label class="form-check-label" for="responsiveCheck">Responsive</label>
    </div>
    <div class="mb-3">
      <label class="form-label">Başlıklar (Virgülle ayırın)</label>
      <input type="text" class="form-control" :value="options.headers" @input="updateField('headers', $event.target.value)" />
    </div>
    <div class="mb-3">
      <label class="form-label">Satırlar (Her satır yeni bir satırda, hücreler virgülle ayırın)</label>
      <textarea class="form-control" rows="5" :value="options.rows" @input="updateField('rows', $event.target.value)"></textarea>
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
    caption: 'Tablo Başlığı',
    variant: '',
    striped: true,
    bordered: true,
    borderless: false,
    hover: true,
    small: false,
    dark: false,
    responsive: true,
    headers: 'Ad,Soyad,Yaş',
    rows: 'Ali,Yılmaz,30\nAyşe,Demir,25\nMehmet,Can,35',
    extraClass: ''
  }
}

export function generateHtml(options) {
  const {
    caption = '',
    variant = '',
    striped = false,
    bordered = false,
    borderless = false,
    hover = false,
    small = false,
    dark = false,
    responsive = false,
    headers = '',
    rows = '',
    extraClass = ''
  } = options || {}

  const tableClasses = ['table'];
  if (variant) tableClasses.push(`table-${variant}`);
  if (striped) tableClasses.push('table-striped');
  if (bordered) tableClasses.push('table-bordered');
  if (borderless) tableClasses.push('table-borderless');
  if (hover) tableClasses.push('table-hover');
  if (small) tableClasses.push('table-sm');
  if (dark) tableClasses.push('table-dark');
  if (extraClass) tableClasses.push(extraClass);

  let theadHtml = '';
  const headerArray = headers.split(',').map(h => h.trim()).filter(h => h);
  if (headerArray.length > 0) {
    theadHtml = `<thead>\n    <tr>\n      ${headerArray.map(h => `<th>${h}</th>`).join('\n      ')}\n    </tr>\n  </thead>`;
  }

  let tbodyHtml = '';
  const rowArrays = rows.split('\n').map(row => row.split(',').map(cell => cell.trim()));
  if (rowArrays.length > 0 && rowArrays[0].length > 0) {
    tbodyHtml = `<tbody>\n${rowArrays.map(row => `    <tr>\n      ${row.map(cell => `<td>${cell}</td>`).join('\n      ')}\n</tr>`).join('\n')}\n  </tbody>`;
  }

  let tableHtml = `<table class="${tableClasses.join(' ')}">\n`;
  if (caption) tableHtml += `  <caption>${caption}</caption>\n`;
  tableHtml += `${theadHtml}\n${tbodyHtml}\n</table>`;

  if (responsive) {
    return `<div class="table-responsive">\n${tableHtml}\n</div>`;
  } else {
    return tableHtml;
  }
}
</script>