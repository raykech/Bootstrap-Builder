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

const percentage = (options.value.value / options.value.max * 100).toFixed(0);
</script>

<template>
  <div>
    <div class="mb-3">
      <label class="form-label">Değer</label>
      <input type="number" class="form-control" :value="options.value" @input="updateField('value', +$event.target.value)" min="0" :max="options.max" />
    </div>
    <div class="mb-3">
      <label class="form-label">Maksimum Değer</label>
      <input type="number" class="form-control" :value="options.max" @input="updateField('max', +$event.target.value)" min="1" />
    </div>
    <div class="mb-3">
      <label class="form-label">Renk</label>
      <select class="form-select" :value="options.variant" @change="updateField('variant', $event.target.value)">
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
      <input class="form-check-input" type="checkbox" id="animatedCheck" :checked="options.animated" @change="updateField('animated', $event.target.checked)" />
      <label class="form-check-label" for="animatedCheck">Animasyonlu (Animated)</label>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="showLabelCheck" :checked="options.showLabel" @change="updateField('showLabel', $event.target.checked)" />
      <label class="form-check-label" for="showLabelCheck">Yüzde Göster</label>
    </div>
    <div class="mb-3">
      <label class="form-label">Yükseklik (px, boş bırakılırsa varsayılan)</label>
      <input type="number" class="form-control" :value="options.height" @input="updateField('height', +$event.target.value)" min="0" />
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
    value: 50,
    max: 100,
    variant: 'primary',
    striped: false,
    animated: false,
    showLabel: true,
    height: '',
    extraClass: ''
  }
}

export function generateHtml(options) {
  const { value = 50, max = 100, variant = 'primary', striped = false, animated = false, showLabel = true, height = '', extraClass = '' } = options || {}
  const percentage = ((value / max) * 100).toFixed(0);
  const barClasses = ['progress-bar', `bg-${variant}`];
  if (striped) barClasses.push('progress-bar-striped');
  if (animated) barClasses.push('progress-bar-animated');
  const style = height ? `height: ${height}px;` : '';
  return `<div class="progress ${extraClass}" role="progressbar" aria-label="İlerleme" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="${max}" style="${style}">
  <div class="${barClasses.join(' ')}" style="width: ${percentage}%">${showLabel ? `${percentage}%` : ''}</div>
</div>`;
}
</script>