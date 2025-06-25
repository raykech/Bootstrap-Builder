<template>
  <div class="offcanvas-options">
    <div class="offcanvas-backdrop" @click="$emit('close')"></div>
    <div class="offcanvas-panel">
      <button class="btn-close float-end" @click="$emit('close')"></button>
      <slot />
    </div>
  </div>
</template>

<script setup>
// Sadece slot ile içerik alır, kapatma eventini dışarıya iletir
</script>

<style scoped>
.offcanvas-options {
  position: fixed;
  top: 0;
  right: 0;
  width: 380px;
  height: 100vh;
  z-index: 1050;
  display: flex;
  flex-direction: column;
}
.offcanvas-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.2);
  z-index: 1040;
}
.offcanvas-panel {
  background: #fff;
  height: 100vh;
  width: 380px;
  box-shadow: -2px 0 16px rgba(0,0,0,0.08);
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  overflow-y: auto;
  z-index: 1051;
  position: relative;
}
@media (max-width: 900px) {
  .offcanvas-panel { width: 100vw; }
}
</style>
