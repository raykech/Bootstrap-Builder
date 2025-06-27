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

    <div class="row g-2 mb-2">
      <div class="col">
        <label class="form-label">Min</label>
        <input type="number" class="form-control" :value="options.min" @input="updateField('min', +$event.target.value)" />
      </div>
      <div class="col">
        <label class="form-label">Max</label>
        <input type="number" class="form-control" :value="options.max" @input="updateField('max', +$event.target.value)" />
      </div>
    </div>

    <div class="mb-2">
      <label class="form-label">Varsayılan Değer</label>
      <input type="number" class="form-control" :value="options.value" @input="updateField('value', +$event.target.value)" />
    </div>

    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" :id="'showValue'+options.id" :checked="options.showValue" @change="updateField('showValue', $event.target.checked)" />
      <label class="form-check-label" :for="'showValue'+options.id">Değeri Göster</label>
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
    id: 'form-range-1',
    label: 'Aralık Seçimi',
    value: 50,
    min: 0,
    max: 100,
    required: false,
    disabled: false,
    showValue: true,
    helpText: '',
    extraClass: '',
    validation: 'none',
    invalidFeedback: ''
  }
}

export function generateHtml(options) {
  const {
    id = 'form-range-1', label = 'Label', value = 50, min = 0, max = 100,
    helpText = '', extraClass = '', validation = 'none', invalidFeedback = '', required = false,
    disabled = false,
    showValue = true
  } = options || {}

  const inputClasses = ['form-range'];
  if (validation === 'valid') inputClasses.push('is-valid');
  if (validation === 'invalid') inputClasses.push('is-invalid');

  // Değer gösterildiğinde, oninput eventi ile değeri güncelleyecek script'i ekle
  const onInputAttr = showValue ? ` oninput="this.nextElementSibling.textContent = this.value"` : '';

  const attrs = [
    `type="range"`, `class="${inputClasses.join(' ')}"`, `id="${id}"`,
    `min="${min}"`, `max="${max}"`, `value="${value}"`, required ? 'required' : '',
    disabled ? 'disabled' : '',
    onInputAttr
  ].filter(Boolean).join(' ');

  const outputHtml = showValue ? `\n    <span class="badge bg-secondary ms-2" style="min-width: 3em;">${value}</span>` : '';
  const feedbackHtml = validation === 'invalid' ? `\n  <div class="invalid-feedback">${invalidFeedback}</div>` : '';
  const helpTextHtml = helpText ? `\n  <div class="form-text">${helpText}</div>` : '';

  return `<div class="${extraClass}">
  <label for="${id}" class="form-label">${label}</label>
  <div class="d-flex align-items-center">
    <input ${attrs}>${outputHtml}
  </div>${feedbackHtml}${helpTextHtml}
</div>`;
}
</script>