<template>
  <div :class="['card', 'bg-' + options.variant, 'mb-3']" :style="cardStyle">
    <img v-if="options.showImg && (options.img || options.usePlaceholderImg)" :src="options.usePlaceholderImg ? 'images/ornek.jpg' : options.img" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">{{ options.title }}</h5>
      <p class="card-text">{{ options.text }}</p>
    </div>
    <div v-if="options.showFooter && options.footer" class="card-footer">{{ options.footer }}</div>
  </div>
</template>
<script setup>
const props = defineProps({ options: Object })
const cardStyle = `max-width: 22rem;${props.options.minHeight ? ' min-height:' + props.options.minHeight + 'px;' : ''}`
</script>
