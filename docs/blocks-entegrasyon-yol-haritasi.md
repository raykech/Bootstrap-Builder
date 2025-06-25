# Bootstrap Block Bileşenleri Entegrasyon Yol Haritası

Bu doküman, yeni bir Bootstrap block bileşeni (ör: Pagination, Progress, Spinner, Accordion, vb.) eklendiğinde izlenmesi gereken adımları ve entegrasyon noktalarını özetler. Her yeni block için aşağıdaki adımlar eksiksiz uygulanmalıdır.

---

## 1. Yeni Block Bileşeni Oluşturma
- `src/components/blocks/` klasöründe, örneğin `PaginationBlock.vue` adında **tek dosya mimarili** bir Vue componenti oluşturun.
- Bileşen dosyasında:
  - Tüm mantık, props, varsayılan değerler ve HTML üretim fonksiyonları **tek dosyada** olmalı.
  - `export function getXDefaultOptions()` ve `export function generateXHtml()` fonksiyonlarını ekleyin (ör: `getPaginationDefaultOptions`, `generatePaginationHtml`).

## 2. blocks/index.js Güncellemesi
- Yeni oluşturulan block'u `import` edin ve uygun şekilde `export` edin.
  ```js
  import PaginationBlock, { getPaginationDefaultOptions, generatePaginationHtml } from './PaginationBlock.vue';
  export { PaginationBlock, getPaginationDefaultOptions, generatePaginationHtml };
  // ...diğer bloklar
  ```

## 3. App.vue Güncellemesi
- `blockMeta` nesnesine yeni block'u ekleyin:
  ```js
  Pagination: {
    component: Blocks.PaginationBlock,
    getDefaultOptions: Blocks.getPaginationDefaultOptions,
    generateHtml: Blocks.generatePaginationHtml
  },
  ```
- Gerekirse sidebar veya başka bir yerde block adını gösteren listeye ekleyin.

## 4. Test ve Doğrulama
- Uygulamayı başlatın (`npm run dev`).
- Sidebar'dan yeni block'u seçin, seçenek paneli ve canlı önizleme ile kod üretiminin **eksiksiz çalıştığını** doğrulayın.
- Varsayılan değerler ve dinamik ayar paneli beklendiği gibi çalışıyor mu kontrol edin.

## 5. Dokümantasyon ve Sürdürme
- Bu yol haritası dokümanını güncel tutun.
- Her yeni block için yukarıdaki adımların uygulandığından emin olun.

---

### Özet Akış
1. `blocks/` klasörüne yeni .vue dosyası ekle
2. `blocks/index.js`'de import/export yap
3. `App.vue`'da blockMeta'ya ekle
4. Uygulamada test et
5. Dokümantasyonu güncelle

> **Not:** Kod tekrarını önlemek ve sürdürülebilirlik için tüm mantık tek dosyada, dışa aktarımlar (options, html) standart isimlerle yapılmalıdır.
