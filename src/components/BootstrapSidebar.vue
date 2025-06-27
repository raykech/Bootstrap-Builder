<template>
  <div class="sidebar bg-light border-end vh-100 p-3">
    <input type="text" v-model="search" class="form-control mb-3" placeholder="Bileşen ara..." />
    <h5 class="mb-3">Bootstrap Bileşenleri</h5>
    <ul class="nav flex-column">
      <li v-for="item in filteredComponents" :key="item.name || item" class="nav-item">
        <!-- Basit Bileşen Butonu -->
        <button v-if="typeof item === 'string'" class="nav-link w-100 text-start" :class="{active: selected && selected.startsWith(item)}" @click="$emit('select', item)">
          {{ item }}
        </button>
        <!-- Dropdown Menü -->
        <div v-else class="dropdown">
          <button class="nav-link w-100 text-start dropdown-toggle" :class="{active: selected && selected.startsWith(item.name)}" data-bs-toggle="dropdown" aria-expanded="false">
            {{ item.name }}
          </button>
          <ul class="dropdown-menu w-100 shadow-sm border-0">
            <li v-for="child in item.children" :key="child">
              <a class="dropdown-item" href="#" :class="{active: selected === `${item.name}-${child}`}" @click.prevent="$emit('select', `${item.name}-${child}`)">
                {{ child }}
              </a>
            </li>
          </ul>
        </div>
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
import { components } from '../sidebarItems.js'

const filteredComponents = computed(() =>
  components.filter(c => {
    const searchTerm = search.value.toLowerCase()
    if (typeof c === 'string') {
      return c.toLowerCase().includes(searchTerm)
    } else {
      // Ana başlık veya alt öğelerden herhangi biri aramayla eşleşiyorsa göster
      return c.name.toLowerCase().includes(searchTerm) ||
             c.children.some(child => child.toLowerCase().includes(searchTerm))
    }
  })
)
</script>

<style scoped>
.sidebar {
  min-width: 220px;
  max-width: 260px;
  background: #f8f9fa;
  border-right: 1px solid #dee2e6;
  overflow-y: auto;
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
.dropdown-menu {
  position: static !important; /* Sidebar içinde düzgün görünmesi için */
  transform: none !important;
  border: none;
  background: transparent;
  padding-left: 1rem; /* İçeriği hizala */
}
.dropdown-item {
  padding: .5rem 1rem;
  border-radius: 0.375rem;
}
.dropdown-item:hover, .dropdown-item:focus, .dropdown-item.active {
  background-color: #e9ecef;
  color: #000;
}
.nav-link.active + .dropdown-menu .dropdown-item.active {
    background-color: #fff;
    color: #0d6efd;
}
</style>
