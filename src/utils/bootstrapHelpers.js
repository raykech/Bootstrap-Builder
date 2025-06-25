// Bootstrap bileşenleri için varsayılan seçenekler ve HTML üretimi

export function getDefaultOptions(type) {
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

export function generateHtml(component) {
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
