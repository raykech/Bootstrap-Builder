<template>
  <div>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="'#modalPreview' + _uid">
      {{ options.buttonText || 'Modal Aç' }}
    </button>
    <div class="modal fade" :id="'modalPreview' + _uid" tabindex="-1" aria-labelledby="'modalLabel' + _uid" aria-hidden="true">
      <div :class="['modal-dialog', options.centered ? 'modal-dialog-centered' : '', options.scrollable ? 'modal-dialog-scrollable' : '', options.extraClass].filter(Boolean).join(' ')">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" :id="'modalLabel' + _uid">{{ options.title }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            {{ options.body }}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kapat</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { getCurrentInstance } from 'vue'
const props = defineProps({ options: Object })
const { proxy } = getCurrentInstance()
const _uid = proxy ? proxy._uid : Math.floor(Math.random()*10000)
</script>
