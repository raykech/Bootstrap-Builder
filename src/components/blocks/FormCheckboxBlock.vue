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
      <label class="form-label">Tip</label>
      <select class="form-select" :value="options.type" @change="updateField('type', $event.target.value)">
        <option value="checkbox">Checkbox</option>
        <option value="radio">Radio</option>
      </select>
    </div>

    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" :id="'inline'+options.id" :checked="options.inline" @change="updateField('inline', $event.target.checked)" />
      <label class="form-check-label" :for="'inline'+options.id">Inline</label>
    </div>

    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" :id="'switch'+options.id" :checked="options.switch" @change="updateField('switch', $event.target.checked)" />
      <label class="form-check-label" :for="'switch'+options.id">Switch Stili</label>
    </div>

    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" :id="'reverse'+options.id" :checked="options.reverse" @change="updateField('reverse', $event.target.checked)" />
      <label class="form-check-label" :for="'reverse'+options.id">Ters Sıralama (Etiket Önce)</label>
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
    id: 'form-check-1',
    label: 'Varsayılan checkbox',
    type: 'checkbox',
    inline: false,
    switch: false,
    reverse: false,
    required: false,
    disabled: false,
    helpText: '',
    extraClass: '',
    validation: 'none',
    invalidFeedback: 'Lütfen bu kutuyu işaretleyin.'
  }
}

export function generateHtml(options) {
  const {
    id = 'form-check-1', label = 'Label', type = 'checkbox', inline = false,
    switch: isSwitch = false, reverse = false, required = false, disabled = false,
    helpText = '', extraClass = '', validation = 'none', invalidFeedback = ''
  } = options || {}

  const wrapperClasses = ['form-check'];
  if (inline) wrapperClasses.push('form-check-inline');
  if (isSwitch) wrapperClasses.push('form-switch');
  if (reverse) wrapperClasses.push('form-check-reverse');
  if (extraClass) wrapperClasses.push(extraClass);

  const inputClasses = ['form-check-input'];
  if (validation === 'valid') inputClasses.push('is-valid');
  if (validation === 'invalid') inputClasses.push('is-invalid');

  const attrs = [
    `type="${type}"`, `class="${inputClasses.join(' ')}"`, `id="${id}"`,
    required ? 'required' : '', disabled ? 'disabled' : ''
  ].filter(Boolean).join(' ');

  const feedbackHtml = validation === 'invalid' ? `\n  <div class="invalid-feedback">${invalidFeedback}</div>` : '';
  const helpTextHtml = helpText ? `\n  <div class="form-text">${helpText}</div>` : '';

  return `<div class="${wrapperClasses.join(' ')}">
  <input ${attrs}>
  <label class="form-check-label" for="${id}">${label}</label>${feedbackHtml}${helpTextHtml}
</div>`;
}
</script>