<template>
  <div :class="containerClass">
    <div v-for="(item, idx) in options.items" :key="idx" :class="itemClass(item)">
      {{ item.content }}
    </div>
  </div>
</template>
<script setup>
const props = defineProps({ options: Object })
const containerClass = [
  'd-flex',
  props.options.direction,
  props.options.wrap,
  props.options.justify,
  props.options.align,
  props.options.extraClass
].filter(Boolean).join(' ')
function itemClass(item) {
  return [
    item.grow ? 'flex-grow-1' : '',
    item.shrink ? 'flex-shrink-1' : '',
    item.alignSelf,
    item.order ? `order-${item.order}` : '',
    item.basis ? `flex-basis-${item.basis}` : '',
    item.extraClass
  ].filter(Boolean).join(' ')
}
</script>
