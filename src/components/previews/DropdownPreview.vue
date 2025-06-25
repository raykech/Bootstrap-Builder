<template>
  <div>
    <div :class="['dropdown', options.dropDirection]">
      <button
        class="btn"
        :class="['btn-' + (options.variant || 'primary'), 'dropdown-toggle']"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {{ options.label || 'Dropdown' }}
      </button>
      <ul class="dropdown-menu" :class="{ show: options.openInPreview }">
        <li v-for="(item, idx) in options.items" :key="idx">
          <template v-if="item.divider">
            <hr class="dropdown-divider" />
          </template>
          <template v-else>
            <a
              class="dropdown-item"
              :class="{ active: item.active, disabled: item.disabled }"
              :href="item.href || '#'"
              >{{ item.text }}</a
            >
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  options: { type: Object, required: true }
});
</script>
