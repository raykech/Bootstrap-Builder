<template>
  <div class="sidebar bg-light border-end vh-100 p-3">
    <input type="text" v-model="search" class="form-control mb-3" placeholder="Bileşen ara..." />
    <h5 class="mb-3">Bootstrap Bileşenleri</h5>
    <ul class="nav flex-column nav-pills">
      <li v-for="item in filteredComponents" :key="item" class="nav-item">
        <button class="nav-link w-100 text-start" :class="{active: item === selected}" @click="$emit('select', item)">
          {{ item }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const props = defineProps({
  selected: String
})
const search = ref('')
const components = [
  'Button', 'Alert', 'Navbar',
  'Container', 'Grid', 'Flex', 'Card', 'Modal', 'Badge', 'ListGroup', 'Progress', 'Spinner', 'Toast', 'Tooltip', 'Popover', 'Collapse', 'Dropdown', 'Pagination', 'Breadcrumb', 'Accordion', 'Carousel', 'Offcanvas', 'Nav', 'Tabs', 'Form', 'InputGroup', 'Table', 'Image', 'Close', 'Placeholder'
]
const filteredComponents = computed(() =>
  components.filter(c => c.toLowerCase().includes(search.value.toLowerCase()))
)
</script>

<style scoped>
.sidebar {
  min-width: 220px;
  max-width: 260px;
  background: #f8f9fa;
  border-right: 1px solid #dee2e6;
}
.nav-link {
  border-radius: 0.375rem;
  margin-bottom: 2px;
  color: #495057;
  font-weight: 500;
  transition: background 0.2s, color 0.2s;
}
.nav-link.active, .nav-link:focus, .nav-link:hover {
  background: #0d6efd;
  color: #fff;
}
</style>
