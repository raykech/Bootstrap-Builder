<script setup>
import { ref, computed, nextTick } from 'vue'
let nextId = 1
const copyStatus = ref([])
const iframeLoaded = ref(false)

import BootstrapSidebar from './components/BootstrapSidebar.vue'
import ComponentOptionsPanel from './components/ComponentOptionsPanel.vue'

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

// Sidebar'dan yeni bileşen ekle
function onSidebarSelect(type) {
  const defaultOptions = getDefaultOptions(type)
  components.value.push({ id: nextId++, type, options: { ...defaultOptions } })
  selectedIndex.value = components.value.length - 1
  showOptions.value = true
}

function selectInstance(idx) {
  selectedIndex.value = idx
  // Panel zaten açıksa açık kalsın, kapalıysa açılmasın. Açık kalmasını istiyorsak başlık tıklamasında showOptions = true yapılmalı.
}

function updateOptions(newOptions) {
  if (selectedIndex.value >= 0 && components.value[selectedIndex.value]) {
    // Vue reaktivitesi için yeni obje ve yeni array oluştur
    const updated = { ...components.value[selectedIndex.value], options: { ...newOptions } }
    const arr = components.value.slice()
    arr[selectedIndex.value] = updated
    components.value = arr
  }
}

function getDefaultOptions(type) {
  if (type === 'Button') {
    return { label: 'Buton', variant: 'primary', size: '', outline: false, block: false, disabled: false }
  }
  if (type === 'Navbar') {
    return { brand: 'Marka', bg: 'bg-light', scheme: 'navbar-light', search: false, fixedTop: false }
  }
  if (type === 'Alert') {
    return { variant: 'primary', dismissible: false, heading: 'Uyarı!', content: 'Bu bir Bootstrap alert örneğidir.' }
  }
  if (type === 'Card') {
    return { img: '', title: 'Kart Başlığı', text: 'Kart içeriği buraya gelecek.', footer: '', variant: 'light', showImg: false, showFooter: false, usePlaceholderImg: false, minHeight: undefined }
  }
  if (type === 'Badge') {
    return { text: 'Badge', variant: 'primary', pill: false }
  }
  if (type === 'ListGroup') {
    return {
      items: [
        { text: 'Öğe 1', variant: '', active: false, disabled: false, link: false, checkbox: false, checked: false },
        { text: 'Öğe 2', variant: '', active: false, disabled: false, link: false, checkbox: false, checked: false },
        { text: 'Öğe 3', variant: '', active: false, disabled: false, link: false, checkbox: false, checked: false }
      ],
      flush: false,
      numbered: false,
      horizontal: false,
      showCheckbox: false
    }
  }
  if (type === 'Grid') {
    // Varsayılan: 1 satır, 2 sütun, örnek içerik ve boş ayarlar
    return {
      rows: 1,
      cols: [
        [
          { content: 'Sütun 1', md: 6, sm: 12, order: undefined, offset: undefined, extraClass: '' },
          { content: 'Sütun 2', md: 6, sm: 12, order: undefined, offset: undefined, extraClass: '' }
        ]
      ],
      rowAlign: '',
      rowJustify: '',
      extraClass: ''
    }
  }
  if (type === 'Flex') {
    return {
      direction: 'flex-row',
      wrap: 'flex-nowrap',
      justify: 'justify-content-start',
      align: 'align-items-stretch',
      alignContent: '',
      gap: '',
      extraClass: '',
      items: [
        { content: 'Öğe 1', grow: false, shrink: false, alignSelf: '', order: '', basis: '', extraClass: '' },
        { content: 'Öğe 2', grow: false, shrink: false, alignSelf: '', order: '', basis: '', extraClass: '' }
      ]
    }
  }
  if (type === 'Dropdown') {
    return {
      label: 'Dropdown',
      variant: 'primary',
      dropDirection: '',
      items: [
        { text: 'Birinci', active: false, disabled: false, divider: false },
        { text: 'İkinci', active: false, disabled: false, divider: false },
        { text: '', divider: true },
        { text: 'Üçüncü', active: false, disabled: false, divider: false }
      ]
    }
  }
  if (type === 'Modal') {
    return {
      title: 'Modal Başlığı',
      body: 'Modal içeriği buraya gelecek.',
      buttonText: 'Modal Aç',
      centered: false,
      scrollable: false,
      extraClass: ''
    }
  }
  return {}
}

function generateHtml(component) {
  if (!component || !component.type || !component.options) return ''
  if (component.type === 'Button') {
    const { label = '', variant = 'primary', size = '', outline = false, block = false, disabled = false } = component.options
    const outlineClass = outline ? `btn-outline-${variant}` : `btn-${variant}`
    return [
      `<button type="button"`,
      `  class="btn ${outlineClass}${size ? ' ' + size : ''}${block ? ' w-100' : ''}"${disabled ? ' disabled' : ''}>`,
      `  ${label}`,
      `</button>`
    ].join('\n')
  }
  if (component.type === 'Navbar') {
    const { brand = '', bg = 'bg-light', scheme = 'navbar-light', search = false, fixedTop = false } = component.options
    return [
      `<nav class="navbar ${scheme} ${bg}${fixedTop ? ' fixed-top' : ''}">`,
      `  <div class="container-fluid">`,
      `    <a class="navbar-brand" href="#">${brand}</a>`,
      `    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">`,
      `      <span class="navbar-toggler-icon"></span>`,
      `    </button>`,
      `    <div class="collapse navbar-collapse" id="navbarNav">`,
      `      <ul class="navbar-nav">`,
      `        <li class="nav-item">`,
      `          <a class="nav-link active" aria-current="page" href="#">Home</a>`,
      `        </li>`,
      `        <li class="nav-item">`,
      `          <a class="nav-link" href="#">Link</a>`,
      `        </li>`,
      `      </ul>`,
      search ? `      <form class="d-flex ms-auto"><input class="form-control" type="search" placeholder="Ara"></form>` : '',
      `    </div>`,
      `  </div>`,
      `</nav>`
    ].filter(Boolean).join('\n')
  }
  if (component.type === 'Alert') {
    const { variant = 'primary', dismissible = false, heading = '', content = '' } = component.options
    return [
      `<div class="alert alert-${variant}${dismissible ? ' alert-dismissible fade show' : ''}" role="alert">`,
      heading ? `  <h4 class='alert-heading'>${heading}</h4>` : '',
      `  ${content}`,
      dismissible ? `  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>` : '',
      `</div>`
    ].filter(Boolean).join('\n')
  }
  if (component.type === 'Card') {
    const { img = '', title = '', text = '', footer = '', variant = 'light', showImg = false, showFooter = false, usePlaceholderImg = false, minHeight } = component.options
    let imgSrc = img
    if (showImg && usePlaceholderImg) {
      imgSrc = 'images/ornek.jpg'
    }
    let style = `max-width: 22rem;`
    if (minHeight) style += ` min-height: ${minHeight}px;`
    return [
      `<div class="card bg-${variant} mb-3" style="${style}">`,
      showImg && imgSrc ? `  <img src="${imgSrc}" class="card-img-top" alt="...">` : '',
      `  <div class="card-body">`,
      `    <h5 class="card-title">${title}</h5>`,
      `    <p class="card-text">${text}</p>`,
      `  </div>`,
      showFooter && footer ? `  <div class="card-footer">${footer}</div>` : '',
      `</div>`
    ].filter(Boolean).join('\n')
  }
  if (component.type === 'Badge') {
    const { text = '', variant = 'primary', pill = false } = component.options
    return [
      `<span class="badge bg-${variant}${pill ? ' rounded-pill' : ''}">${text}</span>`
    ].join('\n')
  }
  if (component.type === 'ListGroup') {
    let { items, flush = false, numbered = false, horizontal = false, showCheckbox = false } = component.options
    if (!Array.isArray(items) || items.length === 0) {
      items = [
        { text: 'Öğe 1', variant: '', active: false, disabled: false, link: false, checkbox: false, checked: false },
        { text: 'Öğe 2', variant: '', active: false, disabled: false, link: false, checkbox: false, checked: false },
        { text: 'Öğe 3', variant: '', active: false, disabled: false, link: false, checkbox: false, checked: false }
      ]
    }
    const ulClass = [
      'list-group',
      flush ? 'list-group-flush' : '',
      numbered ? 'list-group-numbered' : '',
      horizontal ? 'list-group-horizontal' : ''
    ].filter(Boolean).join(' ')
    return [
      `<ul class="${ulClass}">`,
      ...items.map((item, idx) => {
        const liClass = [
          'list-group-item',
          item.variant ? `list-group-item-${item.variant}` : '',
          item.active ? 'active' : '',
          item.disabled ? 'disabled' : ''
        ].filter(Boolean).join(' ')
        let content = item.text
        if (showCheckbox) {
          content = `<input class='form-check-input me-2' type='checkbox'${item.checked ? ' checked' : ''} id='listCheck${idx}'>` + content
        }
        // Badge ekle
        if (item.badge && item.badge.trim() !== '') {
          content += ` <span class='badge bg-secondary float-end'>${item.badge}</span>`
        }
        if (item.link) {
          return `  <li><a href="#" class="${liClass}">${content}</a></li>`
        } else {
          return `  <li class="${liClass}">${content}</li>`
        }
      }),
      `</ul>`
    ].join('\n')
  }
  if (component.type === 'Grid') {
    const { rows = 1, cols = [[]], rowAlign = '', rowJustify = '', extraClass = '', showBorders = false, rowCols = '', textCenter = false } = component.options
    let html = ''
    for (let r = 0; r < rows; r++) {
      const rowColsArr = cols[r] || []
      const rowClass = [
        'row',
        rowCols,
        rowAlign,
        rowJustify,
        textCenter ? 'text-center' : '',
        extraClass
      ].filter(Boolean).join(' ')
      html += `<div class="${rowClass}${showBorders ? ' border border-primary' : ''}">\n`
      for (let c = 0; c < rowColsArr.length; c++) {
        const col = rowColsArr[c] || {}
        let colClass = [col.colType || 'col']
        if (col.extraClass) colClass.push(col.extraClass)
        if (showBorders) colClass.push('border', 'border-secondary')
        html += `  <div class="${colClass.join(' ')}">${col.content || ''}</div>\n`
      }
      html += `</div>\n`
    }
    return html.trim()
  }
  if (component.type === 'Flex') {
    const { direction = 'flex-row', wrap = 'flex-nowrap', justify = 'justify-content-start', align = 'align-items-stretch', alignContent = '', gap = '', extraClass = '', items = [] } = component.options
    const containerClass = [
      'd-flex',
      direction,
      wrap,
      justify,
      align,
      alignContent,
      gap,
      extraClass
    ].filter(Boolean).join(' ')
    let html = `<div class="${containerClass}">\n`
    for (let i = 0; i < items.length; i++) {
      const item = items[i] || {}
      let itemClass = []
      if (item.grow) itemClass.push('flex-grow-1')
      if (item.shrink) itemClass.push('flex-shrink-1')
      if (item.alignSelf) itemClass.push(item.alignSelf)
      if (item.order) itemClass.push(`order-${item.order}`)
      if (item.basis) itemClass.push(`flex-basis-${item.basis}`)
      if (item.extraClass) itemClass.push(item.extraClass)
      html += `  <div class="${itemClass.join(' ')}">${item.content || ''}</div>\n`
    }
    html += `</div>`
    return html
  }
  if (component.type === 'Dropdown') {
    const { label = 'Dropdown', variant = 'primary', dropDirection = '', items = [] } = component.options
    const dropdownClass = [dropDirection, 'dropdown'].filter(Boolean).join(' ')
    const btnClass = ['btn', `btn-${variant}`, 'dropdown-toggle'].join(' ')
    const menuId = `dropdownMenu${component.id || ''}`
    return [
      `<div class="${dropdownClass}">`,
      `  <button class="${btnClass}" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="${menuId}">`,
      `    ${label}`,
      `  </button>`,
      `  <ul class="dropdown-menu" aria-labelledby="${menuId}">`,
      ...items.map(item => {
        if (item.divider) return '    <li><hr class="dropdown-divider"></li>'
        let liClass = []
        if (item.active) liClass.push('active')
        if (item.disabled) liClass.push('disabled')
        // Artık onclick eklenmiyor, sadece class ve href
        return `    <li><a class="dropdown-item${liClass.length ? ' ' + liClass.join(' ') : ''}" href="#"${item.disabled ? ' tabindex="-1" aria-disabled="true"' : ''}>${item.text || ''}</a></li>`
      }),
      `  </ul>`,
      `</div>`
    ].join('\n')
  }
  if (component.type === 'Modal') {
    const { title = '', body = '', buttonText = 'Modal Aç', centered = false, scrollable = false, extraClass = '' } = component.options
    const modalId = `modalPreview${component.id || ''}`
    return [
      `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${modalId}">`,
      `  ${buttonText}`,
      `</button>`,
      `<div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}Label" aria-hidden="true">`,
      `  <div class="modal-dialog${centered ? ' modal-dialog-centered' : ''}${scrollable ? ' modal-dialog-scrollable' : ''}${extraClass ? ' ' + extraClass : ''}">`,
      `    <div class="modal-content">`,
      `      <div class="modal-header">`,
      `        <h5 class="modal-title" id="${modalId}Label">${title}</h5>`,
      `        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`,
      `      </div>`,
      `      <div class="modal-body">${body}</div>`,
      `      <div class="modal-footer">`,
      `        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kapat</button>`,
      `      </div>`,
      `    </div>`,
      `  </div>`,
      `</div>`
    ].join('\n')
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
            <ComponentOptionsPanel
              :key="components[selectedIndex]?.id"
              :component="components[selectedIndex]?.type"
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
  padding: 0 0.5rem;
}
.toolbar {
  min-height: 48px;
}
.preview-area-outer {
  flex: 1;
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
