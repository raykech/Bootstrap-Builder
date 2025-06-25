<template>
  <div v-if="component && options">
    <div v-if="component === 'Button'">
      <button :class="buttonClass" :disabled="options.disabled" :style="options.block ? 'display:block;width:100%;' : ''">
        {{ options.label }}
      </button>
    </div>
    <div v-else-if="component === 'Navbar'">
      <nav :class="['navbar', options.navbarScheme, options.navbarBg, options.navbarFixedTop ? 'fixed-top' : '']">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">{{ options.navbarBrand }}</a>
          <form v-if="options.navbarSearch" class="d-flex ms-auto" role="search">
            <input class="form-control me-2" type="search" placeholder="Ara" aria-label="Ara">
            <button class="btn btn-outline-success" type="submit">Ara</button>
          </form>
        </div>
      </nav>
    </div>
    <!-- Diğer bileşenler için buraya eklemeler yapılacak -->
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
const props = defineProps({
  component: String,
  options: Object
})
const buttonClass = computed(() => {
  if (props.component !== 'Button') return ''
  let base = 'btn'
  base += props.options.outline ? ` btn-outline-${props.options.type}` : ` btn-${props.options.type}`
  if (props.options.size) base += ` ${props.options.size}`
  return base
})
</script>
