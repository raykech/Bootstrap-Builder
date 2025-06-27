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

function parseOptions(text) {
  return text.split('\n').map(line => {
    const parts = line.split(',');
    return { value: parts[0] || '', text: parts.slice(1).join(',') || '' }
  }).filter(opt => opt.text);
}
</script>

<template>
  <div>
    <div class="mb-2">
      <label class="form-label">Etiket</label>
      <input type="text" class="form-control" :value="options.label" @input="updateField('label', $event.target.value)" />
    </div>

    <div class="mb-2">
      <label class="form-label">Boyut</label>
      <select class="form-select" :value="options.size" @change="updateField('size', $event.target.value)">
        <option value="">Normal</option>
        <option value="sm">Küçük</option>
        <option value="lg">Büyük</option>
      </select>
    </div>

    <div class="mb-2">
      <label class="form-label">Seçenekler (Her satır bir seçenek, virgülle değer ve metin ayırın: value,Text)</label>
      <textarea class="form-control" rows="4" :value="options.options.map(o => `${o.value},${o.text}`).join('\n')" @input="updateField('options', parseOptions($event.target.value))"></textarea>
    </div>

    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" :id="'multiple'+options.id" :checked="options.multiple" @change="updateField('multiple', $event.target.checked)" />
      <label class="form-check-label" :for="'multiple'+options.id">Çoklu Seçim</label>
    </div>

    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" :id="'required'+options.id" :checked="options.required" @change="updateField('required', $event.target.checked)" />
      <label class="form-check-label" :for="'required'+options.id">Gerekli</label>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" :id="'disabled'+options.id" :checked="options.disabled" @change="updateField('disabled', $event.target.checked)" />
      <label class="form-check-label" :for="'disabled'+options.id">Pasif</label>
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
    id: 'form-select-1',
    label: 'Seçim Kutusu',
    size: '',
    multiple: false,
    options: [
      { value: '1', text: 'Birinci Seçenek' },
      { value: '2', text: 'İkinci Seçenek' },
      { value: '3', text: 'Üçüncü Seçenek' }
    ],
    required: false,
    disabled: false,
    helpText: '',
    extraClass: '',
    validation: 'none',
    invalidFeedback: 'Lütfen bir seçim yapın.'
  }
}

export function generateHtml(options) {
  const {
    id = 'form-select-1', label = 'Label', size = '', multiple = false,
    options: selectOptions = [], required = false, disabled = false, helpText = '',
    extraClass = '', validation = 'none', invalidFeedback = ''
  } = options || {}

  const selectClasses = ['form-select'];
  if (size) selectClasses.push(`form-select-${size}`);
  if (validation === 'valid') selectClasses.push('is-valid');
  if (validation === 'invalid') selectClasses.push('is-invalid');

  const attrs = [
    `class="${selectClasses.join(' ')}"`, `id="${id}"`,
    multiple ? 'multiple' : '', required ? 'required' : '', disabled ? 'disabled' : ''
  ].filter(Boolean).join(' ');

  const optionsHtml = selectOptions.map(opt => `    <option value="${opt.value}">${opt.text}</option>`).join('\n');
  const feedbackHtml = validation === 'invalid' ? `\n  <div class="invalid-feedback">${invalidFeedback}</div>` : '';
  const helpTextHtml = helpText ? `\n  <div class="form-text">${helpText}</div>` : '';

  return `<div class="${extraClass}">
  <label for="${id}" class="form-label">${label}</label>
  <select ${attrs}>
${optionsHtml}
  </select>${feedbackHtml}${helpTextHtml}
</div>`;
}
</script>