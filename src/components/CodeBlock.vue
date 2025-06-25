<template>
  <div class="mb-3">
    <div class="d-flex align-items-center mb-1">
      <div class="fw-bold flex-grow-1">Örnek {{ index + 1 }} ({{ type }})</div>
      <button class="btn btn-sm btn-outline-primary ms-2" @click="onCopy">
        <span v-if="!copied">Kopyala</span>
        <span v-else>Kopyalandı!</span>
      </button>
    </div>
    <pre class="bg-light p-3 rounded border"><code>{{ code }}</code></pre>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  index: Number,
  type: String,
  code: String
})
const emit = defineEmits(['copy'])
const copied = ref(false)
const onCopy = () => {
  emit('copy', props.index)
  copied.value = true
  setTimeout(() => { copied.value = false }, 1200)
}
</script>
