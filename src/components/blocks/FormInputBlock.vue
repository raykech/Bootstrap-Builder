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
      <label class="form-label">Tip</label>
      <select class="form-select" :value="options.type" @change="updateField('type', $event.target.value)">
        <option value="text">Metin</option>
        <option value="email">E-posta</option>
        <option value="password">Şifre</option>
        <option value="number">Sayı</option>
      </select>
    </div>

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
      <input :type="options.type === 'number' ? 'number' : 'text'" class="form-control" :value="options.value" @input="updateField('value', $event.target.value)" />
    </div>

    <div class="mb-2">
      <label class="form-label">Boyut</label>
      <select class="form-select" :value="options.size" @change="updateField('size', $event.target.value)">
        <option value="">Normal</option>
        <option value="sm">Küçük</option>
        <option value="lg">Büyük</option>
      </select>
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
    id: 'form-input-1',
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
    extraClass: '',
    validation: 'none',
    invalidFeedback: 'Lütfen geçerli bir değer girin.'
  }
}

export function generateHtml(options) {
  const {
    id = 'form-input-1', type = 'text', label = 'Label', placeholder = '', value = '',
    helpText = '', required = false, disabled = false, readOnly = false,
    floatingLabel = false, size = '', extraClass = '', validation = 'none',
    invalidFeedback = ''
  } = options || {}

  const inputClasses = ['form-control'];
  if (size) inputClasses.push(`form-control-${size}`);
  if (validation === 'valid') inputClasses.push('is-valid');
  if (validation === 'invalid') inputClasses.push('is-invalid');

  const attrs = [
    `type="${type}"`, `class="${inputClasses.join(' ')}"`, `id="${id}"`,
    placeholder ? `placeholder="${placeholder}"` : '', value ? `value="${value}"` : '',
    required ? 'required' : '', disabled ? 'disabled' : '', readOnly ? 'readonly' : ''
  ].filter(Boolean).join(' ');

  const feedbackHtml = validation === 'invalid' ? `\n  <div class="invalid-feedback">${invalidFeedback}</div>` : '';
  const helpTextHtml = helpText ? `\n  <div class="form-text">${helpText}</div>` : '';

  if (floatingLabel) {
    return `<div class="form-floating ${extraClass}">
  <input ${attrs}>
  <label for="${id}">${label}</label>${feedbackHtml}${helpTextHtml}
</div>`;
  } else {
    return `<div class="${extraClass}">
  <label for="${id}" class="form-label">${label}</label>
  <input ${attrs}>${feedbackHtml}${helpTextHtml}
</div>`;
  }
}
</script>