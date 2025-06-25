<template>
  <button :class="btnClass" :disabled="options.disabled">{{ options.label }}</button>
</template>
<script setup>
const props = defineProps({ options: Object })
const btnClass = [
  'btn',
  props.options.outline ? `btn-outline-${props.options.variant}` : `btn-${props.options.variant}`,
  props.options.size,
  props.options.block ? 'w-100' : ''
].filter(Boolean).join(' ')
</script>
