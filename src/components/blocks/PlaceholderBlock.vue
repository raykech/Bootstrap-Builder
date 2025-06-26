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
      <label class="form-label">Animasyon</label>
      <select class="form-select" :value="options.animation" @change="updateField('animation', $event.target.value)">
        <option value="glow">Glow</option>
        <option value="wave">Wave</option>
      </select>
    </div>
    <div class="mb-3">
      <label class="form-label">Boyut</label>
      <select class="form-select" :value="options.size" @change="updateField('size', $event.target.value)">
        <option value="">Normal</option>
        <option value="xs">Extra Small</option>
        <option value="sm">Small</option>
        <option value="lg">Large</option>
      </select>
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
    <p class="mt-4">Aşağıdaki örnek, bir kart içinde placeholder kullanımını gösterir. Animasyon, boyut ve renk seçenekleri kart içindeki tüm placeholder'lara uygulanır.</p>
  </div>
</template>

<script>
export function getDefaultOptions() {
  return {
    animation: 'glow',
    size: '',
    variant: ''
  }
}

export function generateHtml(options) {
  const { animation = 'glow', size = '', variant = '' } = options || {}
  const placeholderClasses = ['placeholder', size ? `placeholder-${size}` : '', variant ? `bg-${variant}` : ''].filter(Boolean).join(' ')
  const animationClass = `placeholder-${animation}`

  return `<div class="card">
  <div class="card-body">
    <h5 class="card-title ${animationClass}">
      <span class="${placeholderClasses}" style="width: 40%;"></span>
    </h5>
    <p class="card-text ${animationClass}">
      <span class="${placeholderClasses}" style="width: 75%;"></span>
      <span class="${placeholderClasses}" style="width: 95%;"></span>
      <span class="${placeholderClasses}" style="width: 60%;"></span>
    </p>
    <a href="#" tabindex="-1" class="btn btn-primary disabled ${placeholderClasses}" style="width: 120px;"></a>
  </div>
</div>`
}
</script>