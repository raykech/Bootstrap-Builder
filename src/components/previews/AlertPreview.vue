<template>
  <div :class="['alert', 'alert-' + options.variant, options.dismissible ? 'alert-dismissible fade show' : '']" role="alert">
    <h4 v-if="options.heading" class="alert-heading">{{ options.heading }}</h4>
    <div>{{ options.content }}</div>
    <button v-if="options.dismissible" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
</template>
<script setup>
const props = defineProps({ options: Object })
</script>
