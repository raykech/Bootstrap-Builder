<template>
  <span :class="['badge', 'bg-' + options.variant, options.pill ? 'rounded-pill' : '']">{{ options.text }}</span>
</template>
<script setup>
const props = defineProps({ options: Object })
</script>
