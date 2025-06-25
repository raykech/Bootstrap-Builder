<template>
  <div>
    <div v-for="(row, rIdx) in options.cols" :key="rIdx" :class="rowClass">
      <div v-for="(col, cIdx) in row" :key="cIdx" :class="colClass(col)">
        {{ col.content }}
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({ options: Object })
const rowClass = [
  'row',
  props.options.extraClass
].filter(Boolean).join(' ')
function colClass(col) {
  return [
    'col',
    col.md ? `col-md-${col.md}` : '',
    col.sm ? `col-sm-${col.sm}` : '',
    col.extraClass
  ].filter(Boolean).join(' ')
}
</script>
