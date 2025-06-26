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
  const updatedItem = { ...items[idx], [key]: value }

  // Eğer tip 'select' olarak değiştirilirse ve 'options' dizisi yoksa, varsayılan bir tane ekle.
  // Bu, 'text' gibi başka bir türden 'select'e geçildiğinde oluşan hatayı önler.
  if (key === 'type' && value === 'select' && !Array.isArray(updatedItem.options)) {
    updatedItem.options = [{ value: 'default', text: 'Varsayılan Seçenek' }]
  }

  items[idx] = updatedItem
  emit('update:options', { ...options.value, items })
}

function addItem() {
  const items = options.value.items.slice()
  const newId = `form-field-${Date.now()}-${Math.random().toString(36).substring(2, 9)}` // Daha robust benzersiz ID
  items.push({
    id: newId,
    type: 'text',
    label: `Yeni Alan ${items.length + 1}`,
    placeholder: '',
    value: '',
    helpText: '',
    required: false,
    disabled: false,
    readOnly: false,
    floatingLabel: false,
    size: '',
    rows: 3, // Textarea için varsayılan
    checked: false, // Checkbox için varsayılan
    inline: false, // Checkbox için varsayılan
    options: [{ value: 'default', text: 'Varsayılan Seçenek' }], // Select için varsayılan
    extraClass: ''
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
    <div class="mb-3">
      <label class="form-label">Form Ekstra Sınıf</label>
      <input type="text" class="form-control" :value="options.extraClass" @input="updateField('extraClass', $event.target.value)" />
    </div>

    <div class="mb-3 mt-3">
      <label class="form-label">Form Alanları</label>
      <button class="btn btn-sm btn-outline-primary ms-2 mb-2" @click="addItem">+ Alan Ekle</button>
      <div v-for="(item, idx) in options.items" :key="item.id" class="border rounded p-2 mb-2">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span>Alan {{ idx + 1 }} ({{ item.type }})</span>
          <button class="btn btn-sm btn-outline-danger" @click="removeItem(idx)">Sil</button>
        </div>

        <div class="mb-2">
          <label class="form-label">Tip</label>
          <select class="form-select" :value="item.type" @change="updateItem(idx, 'type', $event.target.value)">
            <option value="text">Metin</option>
            <option value="email">E-posta</option>
            <option value="password">Şifre</option>
            <option value="number">Sayı</option>
            <option value="textarea">Çok Satırlı Metin</option>
            <option value="checkbox">Onay Kutusu</option>
            <option value="select">Seçim Kutusu</option>
          </select>
        </div>

        <div class="mb-2">
          <label class="form-label">Etiket</label>
          <input type="text" class="form-control" :value="item.label" @input="updateItem(idx, 'label', $event.target.value)" />
        </div>

        <div v-if="['text', 'email', 'password', 'number', 'textarea'].includes(item.type)" class="mb-2">
          <label class="form-label">Placeholder</label>
          <input type="text" class="form-control" :value="item.placeholder" @input="updateItem(idx, 'placeholder', $event.target.value)" />
        </div>

        <div v-if="['text', 'email', 'password', 'number', 'textarea'].includes(item.type)" class="mb-2">
          <label class="form-label">Varsayılan Değer</label>
          <input :type="item.type === 'number' ? 'number' : 'text'" class="form-control" :value="item.value" @input="updateItem(idx, 'value', $event.target.value)" />
        </div>

        <div v-if="['text', 'email', 'password', 'number', 'select'].includes(item.type)" class="mb-2">
          <label class="form-label">Boyut</label>
          <select class="form-select" :value="item.size" @change="updateItem(idx, 'size', $event.target.value)">
            <option value="">Normal</option>
            <option value="sm">Küçük</option>
            <option value="lg">Büyük</option>
          </select>
        </div>

        <div v-if="['text', 'email', 'password', 'number', 'textarea'].includes(item.type)" class="form-check mb-2">
          <input class="form-check-input" type="checkbox" :id="'floatingLabel'+item.id" :checked="item.floatingLabel" @change="updateItem(idx, 'floatingLabel', $event.target.checked)" />
          <label class="form-check-label" :for="'floatingLabel'+item.id">Floating Label</label>
        </div>

        <div v-if="item.type === 'textarea'" class="mb-2">
          <label class="form-label">Satır Sayısı</label>
          <input type="number" class="form-control" :value="item.rows" @input="updateItem(idx, 'rows', +$event.target.value)" min="1" />
        </div>

        <div v-if="item.type === 'checkbox'" class="form-check mb-2">
          <input class="form-check-input" type="checkbox" :id="'checked'+item.id" :checked="item.checked" @change="updateItem(idx, 'checked', $event.target.checked)" />
          <label class="form-check-label" :for="'checked'+item.id">Varsayılan Seçili</label>
        </div>

        <div v-if="item.type === 'checkbox'" class="form-check mb-2">
          <input class="form-check-input" type="checkbox" :id="'inline'+item.id" :checked="item.inline" @change="updateItem(idx, 'inline', $event.target.checked)" />
          <label class="form-check-label" :for="'inline'+item.id">Inline</label>
        </div>

        <div v-if="item.type === 'select'" class="mb-2">
          <label class="form-label">Seçenekler (Her satır bir seçenek, virgülle değer ve metin ayırın: value,Text)</label>
          <textarea class="form-control" rows="3" :value="item.options.map(o => `${o.value},${o.text}`).join('\n')" @input="updateItem(idx, 'options', $event.target.value.split('\n').map(line => { const parts = line.split(','); return { value: parts[0], text: parts.slice(1).join(',') } }))"></textarea>
        </div>

        <div class="form-check mb-2">
          <input class="form-check-input" type="checkbox" :id="'required'+item.id" :checked="item.required" @change="updateItem(idx, 'required', $event.target.checked)" />
          <label class="form-check-label" :for="'required'+item.id">Gerekli</label>
        </div>
        <div class="form-check mb-2">
          <input class="form-check-input" type="checkbox" :id="'disabled'+item.id" :checked="item.disabled" @change="updateItem(idx, 'disabled', $event.target.checked)" />
          <label class="form-check-label" :for="'disabled'+item.id">Pasif</label>
        </div>
        <div v-if="['text', 'email', 'password', 'number', 'textarea'].includes(item.type)" class="form-check mb-2">
          <input class="form-check-input" type="checkbox" :id="'readOnly'+item.id" :checked="item.readOnly" @change="updateItem(idx, 'readOnly', $event.target.checked)" />
          <label class="form-check-label" :for="'readOnly'+item.id">Salt Okunur</label>
        </div>

        <div class="mb-2">
          <label class="form-label">Yardım Metni</label>
          <input type="text" class="form-control" :value="item.helpText" @input="updateItem(idx, 'helpText', $event.target.value)" />
        </div>
        <div class="mb-2">
          <label class="form-label">Ekstra Sınıf (Alan için)</label>
          <input type="text" class="form-control" :value="item.extraClass" @input="updateItem(idx, 'extraClass', $event.target.value)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export function getDefaultOptions() {
  return {
    extraClass: '',
    items: [
      {
        id: 'input-text-1',
        type: 'text',
        label: 'Metin Alanı',
        placeholder: 'Metin giriniz...',
        value: '',
        helpText: 'Bu bir metin alanıdır.',
        required: false,
        disabled: false,
        readOnly: false,
        floatingLabel: false,
        size: '',
        extraClass: ''
      },
      {
        id: 'input-email-1',
        type: 'email',
        label: 'E-posta',
        placeholder: 'email@example.com',
        value: '',
        helpText: 'Geçerli bir e-posta adresi giriniz.',
        required: false,
        disabled: false,
        readOnly: false,
        floatingLabel: false,
        size: '',
        extraClass: ''
      },
      {
        id: 'input-checkbox-1',
        type: 'checkbox',
        label: 'Beni Hatırla',
        checked: false,
        disabled: false,
        inline: false,
        helpText: '',
        extraClass: ''
      },
      {
        id: 'input-select-1',
        type: 'select',
        label: 'Seçenek',
        value: 'option1',
        disabled: false,
        size: '',
        options: [
          { value: 'option1', text: 'Seçenek 1' },
          { value: 'option2', text: 'Seçenek 2' },
          { value: 'option3', text: 'Seçenek 3' }
        ],
        helpText: '',
        extraClass: ''
      }
    ]
  }
}

export function generateHtml(options) {
  const { items = [], extraClass = '' } = options || {};
  let formHtml = '';

  const generateInputHtml = (item) => {
    const inputClasses = ['form-control'];
    if (item.size) inputClasses.push(`form-control-${item.size}`);
    if (item.extraClass) inputClasses.push(item.extraClass);

    const attrs = [
      `type="${item.type}"`,
      `class="${inputClasses.join(' ')}"`,
      `id="${item.id}"`,
      item.placeholder ? `placeholder="${item.placeholder}"` : '',
      item.value ? `value="${item.value}"` : '',
      item.required ? 'required' : '',
      item.disabled ? 'disabled' : '',
      item.readOnly ? 'readonly' : ''
    ].filter(Boolean).join(' ');

    if (item.floatingLabel) {
      return `
<div class="form-floating mb-3">
  <input ${attrs}>
  <label for="${item.id}">${item.label}</label>
  ${item.helpText ? `<div class="form-text">${item.helpText}</div>` : ''}
</div>`;
    } else {
      return `
<div class="mb-3">
  <label for="${item.id}" class="form-label">${item.label}</label>
  <input ${attrs}>
  ${item.helpText ? `<div class="form-text">${item.helpText}</div>` : ''}
</div>`;
    }
  };

  const generateTextareaHtml = (item) => {
    const textareaClasses = ['form-control'];
    if (item.extraClass) textareaClasses.push(item.extraClass);

    const attrs = [
      `class="${textareaClasses.join(' ')}"`,
      `id="${item.id}"`,
      item.placeholder ? `placeholder="${item.placeholder}"` : '',
      item.rows ? `rows="${item.rows}"` : '',
      item.required ? 'required' : '',
      item.disabled ? 'disabled' : '',
      item.readOnly ? 'readonly' : ''
    ].filter(Boolean).join(' ');

    if (item.floatingLabel) {
      return `
<div class="form-floating mb-3">
  <textarea ${attrs}>${item.value}</textarea>
  <label for="${item.id}">${item.label}</label>
  ${item.helpText ? `<div class="form-text">${item.helpText}</div>` : ''}
</div>`;
    } else {
      return `
<div class="mb-3">
  <label for="${item.id}" class="form-label">${item.label}</label>
  <textarea ${attrs}>${item.value}</textarea>
  ${item.helpText ? `<div class="form-text">${item.helpText}</div>` : ''}
</div>`;
    }
  };

  const generateCheckboxHtml = (item) => {
    const wrapperClass = item.inline ? 'form-check form-check-inline' : 'form-check';
    const inputClasses = ['form-check-input'];
    if (item.extraClass) inputClasses.push(item.extraClass);

    return `
<div class="${wrapperClass} mb-3">
  <input class="${inputClasses.join(' ')}" type="checkbox" id="${item.id}" ${item.checked ? 'checked' : ''} ${item.disabled ? 'disabled' : ''}>
  <label class="form-check-label" for="${item.id}">${item.label}</label>
  ${item.helpText ? `<div class="form-text">${item.helpText}</div>` : ''}
</div>`;
  };

  const generateSelectHtml = (item) => {
    const selectClasses = ['form-select'];
    if (item.size) selectClasses.push(`form-select-${item.size}`);
    if (item.extraClass) selectClasses.push(item.extraClass);

    const attrs = [
      `class="${selectClasses.join(' ')}"`,
      `id="${item.id}"`,
      item.required ? 'required' : '',
      item.disabled ? 'disabled' : '',
      item.multiple ? 'multiple' : ''
    ].filter(Boolean).join(' ');

    const optionsHtml = item.options.map(opt => `<option value="${opt.value}" ${item.value === opt.value ? 'selected' : ''}>${opt.text}</option>`).join('\n    ');

    return `
<div class="mb-3">
  <label for="${item.id}" class="form-label">${item.label}</label>
  <select ${attrs}>
    ${optionsHtml}
  </select>
  ${item.helpText ? `<div class="form-text">${item.helpText}</div>` : ''}
</div>`;
  };

  items.forEach(item => {
    switch (item.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
        formHtml += generateInputHtml(item);
        break;
      case 'textarea':
        formHtml += generateTextareaHtml(item);
        break;
      case 'checkbox':
        formHtml += generateCheckboxHtml(item);
        break;
      case 'select':
        formHtml += generateSelectHtml(item);
        break;
      default:
        formHtml += `<p class="text-danger">Desteklenmeyen alan tipi: ${item.type}</p>`;
    }
  });

  return `<form class="${extraClass}">\n${formHtml}\n</form>`;
}
</script>