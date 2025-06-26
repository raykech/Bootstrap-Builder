<script setup>
import { ref, computed, nextTick } from 'vue'
let nextId = 1
const copyStatus = ref([])
const iframeLoaded = ref(false)

import BootstrapSidebar from './components/BootstrapSidebar.vue'
// Yeni blocks importları
import * as Blocks from './components/blocks'

// Tüm block bileşenlerinin meta bilgisi
const blockMeta = {
  Button: {
    component: Blocks.ButtonBlock,
    getDefaultOptions: Blocks.getButtonDefaultOptions,
    generateHtml: Blocks.generateButtonHtml
  },
  Alert: {
    component: Blocks.AlertBlock,
    getDefaultOptions: Blocks.getAlertDefaultOptions,
    generateHtml: Blocks.generateAlertHtml
  },
  Badge: {
    component: Blocks.BadgeBlock,
    getDefaultOptions: Blocks.getBadgeDefaultOptions,
    generateHtml: Blocks.generateBadgeHtml
  },
  Card: {
    component: Blocks.CardBlock,
    getDefaultOptions: Blocks.getCardDefaultOptions,
    generateHtml: Blocks.generateCardHtml
  },
  Navbar: {
    component: Blocks.NavbarBlock,
    getDefaultOptions: Blocks.getNavbarDefaultOptions,
    generateHtml: Blocks.generateNavbarHtml
  },
  Grid: {
    component: Blocks.GridBlock,
    getDefaultOptions: Blocks.getGridDefaultOptions,
    generateHtml: Blocks.generateGridHtml
  },
  Flex: {
    component: Blocks.FlexBlock,
    getDefaultOptions: Blocks.getFlexDefaultOptions,
    generateHtml: Blocks.generateFlexHtml
  },
  Modal: {
    component: Blocks.ModalBlock,
    getDefaultOptions: Blocks.getModalDefaultOptions,
    generateHtml: Blocks.generateModalHtml
  },
  Dropdown: {
    component: Blocks.DropdownBlock,
    getDefaultOptions: Blocks.getDropdownDefaultOptions,
    generateHtml: Blocks.generateDropdownHtml
  },
  ListGroup: {
    component: Blocks.ListGroupBlock,
    getDefaultOptions: Blocks.getListGroupDefaultOptions,
    generateHtml: Blocks.generateListGroupHtml
  },
  Offcanvas: {
    component: Blocks.OffcanvasBlock,
    getDefaultOptions: Blocks.getOffcanvasDefaultOptions,
    generateHtml: Blocks.generateOffcanvasHtml
  },
  Toast: {
    component: Blocks.ToastBlock,
    getDefaultOptions: Blocks.getToastDefaultOptions,
    generateHtml: Blocks.generateToastHtml
  },
  Tabs: {
    component: Blocks.TabsBlock,
    getDefaultOptions: Blocks.getTabsDefaultOptions,
    generateHtml: Blocks.generateTabsHtml
  },
  Container: {
    component: Blocks.ContainerBlock,
    getDefaultOptions: Blocks.getContainerDefaultOptions,
    generateHtml: Blocks.generateContainerHtml
  },
  Progress: {
    component: Blocks.ProgressBlock,
    getDefaultOptions: Blocks.getProgressDefaultOptions,
    generateHtml: Blocks.generateProgressHtml
  },
  Table: {
    component: Blocks.TableBlock,
    getDefaultOptions: Blocks.getTableDefaultOptions,
    generateHtml: Blocks.generateTableHtml
  },
  Form: {
    component: Blocks.FormBlock,
    getDefaultOptions: Blocks.getFormDefaultOptions,
    generateHtml: Blocks.generateFormHtml
  },
  Spinner: {
    component: Blocks.SpinnerBlock,
    getDefaultOptions: Blocks.getSpinnerDefaultOptions,
    generateHtml: Blocks.generateSpinnerHtml
  },
  Tooltip: {
    component: Blocks.TooltipBlock,
    getDefaultOptions: Blocks.getTooltipDefaultOptions,
    generateHtml: Blocks.generateTooltipHtml
  },
  Popover: {
    component: Blocks.PopoverBlock,
    getDefaultOptions: Blocks.getPopoverDefaultOptions,
    generateHtml: Blocks.generatePopoverHtml
  }
}

// Çoklu örnekler için state
const components = ref([]) // [{ type: 'Button', options: {...} }, ...]
const selectedIndex = ref(-1)
const showSidebar = ref(true)
const showOptions = ref(false)
const showCode = ref(true)

function toggleSidebar() { showSidebar.value = !showSidebar.value }
function openSidebar() { showSidebar.value = true }
function toggleOptions() { showOptions.value = !showOptions.value }
function toggleCode() { showCode.value = !showCode.value }

function onSidebarSelect(type) {
  const block = blockMeta[type]
  if (!block) {
    // blockMeta'da olmayan bir tip seçildi, işlem yapma
    return
  }
  const defaultOptions = block.getDefaultOptions ? block.getDefaultOptions() : {}
  components.value.push({ id: nextId++, type, options: { ...defaultOptions } })
  selectedIndex.value = components.value.length - 1
  showOptions.value = true
}

function selectInstance(idx) { selectedIndex.value = idx }
function updateOptions(newOptions) {
  if (selectedIndex.value >= 0 && components.value[selectedIndex.value]) {
    const updated = { ...components.value[selectedIndex.value], options: { ...newOptions } }
    const arr = components.value.slice()
    arr[selectedIndex.value] = updated
    components.value = arr
  }
}

function generateHtml(component) {
  if (!component || !component.type || !component.options) return ''
  const block = blockMeta[component.type]
  if (block && block.generateHtml) {
    return block.generateHtml(component.options)
  }
  return ''
}

function resizeIframe(event) {
  const iframe = event.target;
  try {
    if (iframe.contentWindow && iframe.contentWindow.document.body) {
      const body = iframe.contentWindow.document.body;
      const scrollHeight = body.scrollHeight;
      iframe.style.height = scrollHeight + 'px';
    } else {
      iframe.style.height = '200px';
      console.warn("Iframe içeriğine erişilemiyor, farklı bir kaynaktan yükleniyor olabilir veya güvenlik kısıtlamaları var.");
    }
  } catch (e) {
    console.error("Iframe yeniden boyutlandırma hatası:", e);
    iframe.style.height = '200px';
  }
}

// Parent window'da message event ile iframe yüksekliğini güncelle
if (typeof window !== 'undefined') {
  window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'resize-iframe' && event.data.height && event.source) {
      // Tüm iframe'leri bul, srcdoc ile eşleşen ilk iframe'i güncelle
      const iframes = document.querySelectorAll('iframe.preview-iframe-single');
      for (const iframe of iframes) {
        // Güvenlik için: sadece aynı origin'den gelen mesajlar ve srcdoc'lu iframe'ler
        if (iframe && iframe.contentWindow === event.source) {
          iframe.style.height = event.data.height + 'px';
          break;
        }
      }
    }
  });
}

const iframeSrcdoc = computed(() => {
  if (selectedIndex.value < 0 || !components.value[selectedIndex.value]) return ''
  const html = generateHtml(components.value[selectedIndex.value])
  return `<html><head><link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css'><style>html,body{overflow:visible!important;min-height:0!important;}</style></head><body style='margin:0;padding:1rem;'>${html}</body></html>`
})

const codeExamples = computed(() => {
  return components.value.map((comp) => generateHtml(comp))
})
function generatePreviewSrcdoc(comp) {
  const html = generateHtml(comp)
  // Modal açılınca/kapanınca body yerine html ve documentElement yüksekliğini de kontrol et, iframe yüksekliğini en büyük değere ayarla
  const resizeScript = `
    <script>
      function getMaxHeight() {
        const modal = document.querySelector('.modal.show');
        const modalContent = modal ? modal.querySelector('.modal-content') : null;
        const modalHeight = modalContent ? modalContent.offsetHeight : 0;
        return Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.offsetHeight,
          document.body.clientHeight,
          document.documentElement.clientHeight,
          modalHeight
        );
      }
      function sendHeight() {
        try {
          const h = getMaxHeight();
          window.parent.postMessage({ type: 'resize-iframe', height: h }, '*');
        } catch(e) {}
      }
      window.addEventListener('DOMContentLoaded', sendHeight);
      sendHeight();
      // Modal açılınca/kapanınca yükseklik bildir (daha fazla tekrar)
      document.addEventListener('shown.bs.modal', () => {
        [10, 100, 300, 600, 1000].forEach(t => setTimeout(sendHeight, t));
      });
      document.addEventListener('hidden.bs.modal', () => {
        [10, 100, 300, 600, 1000].forEach(t => setTimeout(sendHeight, t));
      });
      document.addEventListener('shown.bs.dropdown', sendHeight);
      document.addEventListener('hidden.bs.dropdown', sendHeight);
      // Modal içeriği değişirse de yükseklik bildir
      const mo = new MutationObserver(sendHeight);
      mo.observe(document.body, { childList: true, subtree: true, attributes: true });
      // Modal varsa ona da observer ekle
      function observeModal() {
        const modal = document.querySelector('.modal');
        if (modal) {
          mo.observe(modal, { childList: true, subtree: true, attributes: true });
        }
      }
      document.addEventListener('shown.bs.modal', observeModal);
      // Dropdown içindeki linklere tıklamada event.stopPropagation uygula (sadece önizleme için)
      document.body.addEventListener('click', function(e) {
        if (e.target && e.target.classList && e.target.classList.contains('dropdown-item')) {
          e.stopPropagation();
        }
      }, true);
      // Tooltip ve Popover'ları başlat
      // Bu script, iframe içindeki tüm tooltip ve popover'ları etkinleştirir.
      function initializeBootstrapPlugins() {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

        const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
        // HTML içeriğine izin vermek ve sanitizasyonu bu araç için devre dışı bırakmak önemlidir.
        [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl, { html: true, sanitize: false }));
      }
      window.addEventListener('DOMContentLoaded', initializeBootstrapPlugins);
      initializeBootstrapPlugins(); // DOM zaten yüklendiyse tekrar çalıştır
    <\/script>
  `;
  return `<html>\n<head>\n<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css'>\n<style>html,body{overflow:visible!important;min-height:0!important;}</style>\n</head>\n<body style='margin:0;padding:1rem;'>${html}<script src='https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js'><\/script>${resizeScript}</body>\n</html>`
}

function copyCode(idx) {
  const code = codeExamples.value[idx]
  navigator.clipboard.writeText(code)
    .then(() => {
      copyStatus.value[idx] = true
      setTimeout(() => { copyStatus.value[idx] = false }, 1200)
    })
}

function removeComponent(idx) {
  if (idx >= 0 && idx < components.value.length) {
    const arr = components.value.slice()
    arr.splice(idx, 1)
    components.value = arr
    // Seçili index silinirse veya sonrasına kayarsa güncelle
    if (selectedIndex.value === idx) {
      selectedIndex.value = -1
      showOptions.value = false
    } else if (selectedIndex.value > idx) {
      selectedIndex.value--
    }
  }
}
</script>

<template>
  <div class="app-layout container-fluid p-0">
    <div v-if="showSidebar" class="sidebar-area">
      <button class="toggle-btn left" @click="toggleSidebar">&lt;</button>
      <BootstrapSidebar :selected="components[selectedIndex]?.type" @select="onSidebarSelect" />
    </div>
    <div v-else class="sidebar-collapsed-fixed">
      <button class="toggle-btn left" @click="openSidebar">
        &#9776;
      </button>
    </div>
    <div class="main-area">
      <div class="toolbar d-flex justify-content-end mb-2">
        <button class="btn btn-outline-secondary me-2" @click="toggleOptions">Seçenekler</button>
        <button class="btn btn-outline-secondary" @click="toggleCode">Kod</button>
      </div>
      <div class="content-scroll-area">
        <div class="preview-area-outer preview-multi">
          <div v-for="(comp, idx) in components" :key="'preview'+idx" class="preview-instance mb-4">
            <div
              class="preview-title h6 mb-2 d-flex align-items-center"
              :class="{active: idx === selectedIndex}"
              style="cursor:pointer;user-select:none;"
              @click="() => { selectInstance(idx); showOptions = true; }"
            >
              Örnek {{ idx + 1 }} ({{ comp.type }})
              <span v-if="idx === selectedIndex" class="badge bg-primary ms-2">Seçili</span>
              <span v-else class="badge bg-success ms-2 edit-badge">Düzenle</span>
              <button class="btn btn-sm btn-outline-danger ms-2" @click.stop="removeComponent(idx)">
                Sil
              </button>
            </div>
            <div class="preview-iframe-wrapper">
              <iframe
                class="preview-iframe-single"
                :srcdoc="generatePreviewSrcdoc(comp)"
                frameborder="0"
                @load="resizeIframe"
                :style="comp.type === 'Modal' ? 'min-height:600px;' : ''"
              ></iframe>
            </div>
          </div>
          <div v-if="showOptions && selectedIndex >= 0" class="offcanvas-options">
            <div class="offcanvas-backdrop" @click="toggleOptions"></div>
            <div class="offcanvas-panel">
              <button class="btn-close float-end" @click="toggleOptions"></button>
              <component
                :is="blockMeta[components[selectedIndex]?.type].component"
                :options="components[selectedIndex]?.options"
                @update:options="updateOptions"
              />
            </div>
          </div>
        </div>
        <div v-if="showCode && components.length > 0" class="code-area">
          <h6>Kod Görünümü</h6>
          <div v-for="(code, idx) in codeExamples" :key="'code'+idx" class="mb-3">
            <div class="d-flex align-items-center mb-1">
              <div class="fw-bold flex-grow-1">Örnek {{ idx + 1 }} ({{ components[idx].type }})</div>
              <button class="btn btn-sm btn-outline-primary ms-2" @click="copyCode(idx)">
                <span v-if="!copyStatus[idx]">Kopyala</span>
                <span v-else>Kopyalandı!</span>
              </button>
            </div>
            <pre class="bg-light p-3 rounded border"><code>{{ code }}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
  background: #f8f9fa;
}
.sidebar-area {
  position: relative;
  min-width: 240px;
  max-width: 260px;
  background: #fff;
  border-right: 1px solid #dee2e6;
  z-index: 2;
}
.sidebar-collapsed-fixed {
  position: fixed;
  top: 16px;
  left: 8px;
  z-index: 1100;
  min-width: 32px;
  display: flex;
  align-items: flex-start;
  background: #fff;
  border-right: 1px solid #dee2e6;
}
.toggle-btn.left {
  position: absolute;
  top: 10px;
  right: -16px;
  z-index: 3;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #dee2e6;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}
.main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
}
.content-scroll-area {
  flex: 1;
  overflow-y: auto;
  position: relative;
}
.toolbar {
  min-height: 48px;
}
.preview-area-outer {
  width: 100%;
  background: transparent;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  padding: 0;
  position: relative;
}
.preview-multi {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.preview-instance {
  /* Tüm kutu, border, arka plan, padding kaldırıldı */
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
  height: auto; /* Yüksekliğin içeriğe göre ayarlanması için */
  background: transparent;
  border: none;
  display: block;
}
.code-area {
  background: #f8f9fa;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}
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
