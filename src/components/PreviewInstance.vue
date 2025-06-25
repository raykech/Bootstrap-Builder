<template>
  <div class="preview-instance mb-4">
    <div
      class="preview-title h6 mb-2 d-flex align-items-center"
      :class="{active: active}"
      style="cursor:pointer;user-select:none;"
      @click="onSelect"
    >
      Örnek {{ index + 1 }} ({{ type }})
      <span v-if="active" class="badge bg-primary ms-2">Seçili</span>
      <span v-else class="badge bg-success ms-2 edit-badge">Düzenle</span>
      <button class="btn btn-sm btn-outline-danger ms-2" @click.stop="onRemove">
        Sil
      </button>
    </div>
    <div class="preview-iframe-wrapper">
      <iframe
        class="preview-iframe-single"
        :srcdoc="srcdoc"
        frameborder="0"
        @load="onLoad"
        :style="iframeStyle + ';background:#fff;min-height:120px;border:2px solid #f00;'"
      ></iframe>
      <div v-if="!srcdoc || srcdoc.trim() === ''" style="color:red;font-weight:bold;">srcdoc boş!</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  index: Number,
  type: String,
  srcdoc: String,
  active: Boolean,
  iframeStyle: String,
})
const emit = defineEmits(['select', 'remove', 'load'])
const onSelect = () => emit('select', props.index)
const onRemove = () => emit('remove', props.index)
const onLoad = (e) => emit('load', e)
</script>

<style scoped>
.preview-instance {
  background: none;
  border: none;
  border-radius: 0;
  box-shadow: none;
  padding: 0;
  margin-bottom: 0.5rem;
}
.preview-title {
  transition: background 0.15s, box-shadow 0.15s;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  background: transparent;
}
.preview-title:hover {
  background: #e9f5ff;
  box-shadow: 0 2px 8px rgba(0,110,253,0.07);
  cursor: pointer;
}
.preview-title .edit-badge {
  font-size: 0.85em;
  background: #198754 !important;
  color: #fff;
  margin-left: 0.75rem;
  padding: 0.35em 0.7em;
  border-radius: 0.5em;
  box-shadow: 0 1px 4px rgba(25,135,84,0.08);
  font-weight: 500;
}
.preview-title.active {
  color: #0d6efd;
  font-weight: bold;
  background: #e9f5ff;
  box-shadow: 0 2px 8px rgba(0,110,253,0.10);
}
.preview-iframe-wrapper {
  width: 100%;
  background: none;
  border-radius: 0;
  overflow: visible !important;
  margin-bottom: 0.5rem;
}
.preview-iframe-single {
  width: 100%;
  height: auto;
  background: transparent;
  border: none;
  display: block;
}
</style>
