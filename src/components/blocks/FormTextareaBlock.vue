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
    <div class="mb-2">
      <label class="form-label">Etiket</label>
      <input type="text" class="form-control" :value="options.label" @input="updateField('label', $event.target.value)" />
    </div>

    <div class="mb-2">
      <label class="form-label">Placeholder</label>
      <input type="text" class="form-control" :value="options.placeholder" @input="updateField('placeholder', $event.target.value)" />
    </div>

    <div class="mb-2">
      <label class="form-label">Varsayılan Değer</label>
      <textarea class="form-control" :value="options.value" @input="updateField('value', $event.target.value)"></textarea>
    </div>

    <div class="mb-2">
      <label class="form-label">Satır Sayısı</label>
      <input type="number" class="form-control" :value="options.rows" @input="updateField('rows', +$event.target.value)" min="1" />
    </div>

    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" :id="'floatingLabel'+options.id" :checked="options.floatingLabel" @change="updateField('floatingLabel', $event.target.checked)" />
      <label class="form-check-label" :for="'floatingLabel'+options.id">Floating Label</label>
    </div>

    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" :id="'required'+options.id" :checked="options.required" @change="updateField('required', $event.target.checked)" />
      <label class="form-check-label" :for="'required'+options.id">Gerekli</label>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" :id="'disabled'+options.id" :checked="options.disabled" @change="updateField('disabled', $event.target.checked)" />
      <label class="form-check-label" :for="'disabled'+options.id">Pasif</label>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" :id="'readOnly'+options.id" :checked="options.readOnly" @change="updateField('readOnly', $event.target.checked)" />
      <label class="form-check-label" :for="'readOnly'+options.id">Salt Okunur</label>
    </div>

    <div class="mb-2">
      <label class="form-label">Doğrulama (Validation)</label>
      <select class="form-select" :value="options.validation" @change="updateField('validation', $event.target.value)">
        <option value="none">Yok</option>
        <option value="valid">Geçerli (Valid)</option>
        <option value="invalid">Geçersiz (Invalid)</option>
      </select>
    </div>
    <div v-if="options.validation === 'invalid'" class="mb-2">
      <label class="form-label">Geçersiz Geri Bildirim Mesajı</label>
      <input type="text" class="form-control" :value="options.invalidFeedback" @input="updateField('invalidFeedback', $event.target.value)" />
    </div>

    <div class="mb-2">
      <label class="form-label">Yardım Metni</label>
      <input type="text" class="form-control" :value="options.helpText" @input="updateField('helpText', $event.target.value)" />
    </div>
    <div class="mb-2">
      <label class="form-label">Ekstra Sınıf (Wrapper için)</label>
      <input type="text" class="form-control" :value="options.extraClass" @input="updateField('extraClass', $event.target.value)" />
    </div>
  </div>
</template>

<script>
export function getDefaultOptions() {
  return {
    id: 'form-textarea-1',
    label: 'Çok Satırlı Metin',
    placeholder: 'Metin giriniz...',
    value: 'Varsayılan metin içeriği.',
    rows: 3,
    helpText: 'Bu bir çok satırlı metin alanıdır.',
    required: false,
    disabled: false,
    readOnly: false,
    floatingLabel: false,
    extraClass: '',
    validation: 'none',
    invalidFeedback: 'Lütfen geçerli bir değer girin.'
  }
}

export function generateHtml(options) {
  const {
    id = 'form-textarea-1', label = 'Label', placeholder = '', value = '',
    rows = 3, helpText = '', required = false, disabled = false, readOnly = false,
    floatingLabel = false, extraClass = '', validation = 'none', invalidFeedback = ''
  } = options || {}

  const textareaClasses = ['form-control'];
  if (validation === 'valid') textareaClasses.push('is-valid');
  if (validation === 'invalid') textareaClasses.push('is-invalid');

  const attrs = [
    `class="${textareaClasses.join(' ')}"`, `id="${id}"`,
    placeholder ? `placeholder="${placeholder}"` : '', `rows="${rows}"`,
    required ? 'required' : '', disabled ? 'disabled' : '', readOnly ? 'readonly' : ''
  ].filter(Boolean).join(' ');

  const feedbackHtml = validation === 'invalid' ? `\n  <div class="invalid-feedback">${invalidFeedback}</div>` : '';
  const helpTextHtml = helpText ? `\n  <div class="form-text">${helpText}</div>` : '';

  if (floatingLabel) {
    return `<div class="form-floating ${extraClass}">
  <textarea ${attrs}>${value}</textarea>
  <label for="${id}">${label}</label>${feedbackHtml}${helpTextHtml}
</div>`;
  } else {
    return `<div class="${extraClass}">
  <label for="${id}" class="form-label">${label}</label>
  <textarea ${attrs}>${value}</textarea>${feedbackHtml}${helpTextHtml}
</div>`;
  }
}
</script>