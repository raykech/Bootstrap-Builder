<template>
  <ul :class="ulClass">
    <li v-for="(item, idx) in options.items" :key="idx" :class="liClass(item)">
      <template v-if="options.showCheckbox">
        <input class="form-check-input me-2" type="checkbox" :checked="item.checked" :id="'listCheck'+idx" disabled />
      </template>
      {{ item.text }}
    </li>
  </ul>
</template>
<script setup>
const props = defineProps({ options: Object })
const ulClass = [
  'list-group',
  props.options.flush ? 'list-group-flush' : '',
  props.options.numbered ? 'list-group-numbered' : '',
  props.options.horizontal ? 'list-group-horizontal' : ''
].filter(Boolean).join(' ')
function liClass(item) {
  return [
    'list-group-item',
    item.variant ? `list-group-item-${item.variant}` : '',
    item.active ? 'active' : '',
    item.disabled ? 'disabled' : ''
  ].filter(Boolean).join(' ')
}
</script>
