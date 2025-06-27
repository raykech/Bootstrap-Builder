# Teknik Mimari ve Geliştirici Rehberi: Bootstrap Builder

Bu doküman, "Bootstrap Builder" projesinin teknik mimarisini, veri akışını, bileşen yapısını ve yeni özellik ekleme süreçlerini detaylı bir şekilde açıklamaktadır. Amacı, projenin herhangi bir geliştirici tarafından kolayca anlaşılmasını ve genişletilmesini sağlamaktır.

---

## 1. Proje Amacı ve Temel Teknolojiler

- **Amaç:** Kullanıcıların, Bootstrap 5.3 bileşenlerini görsel bir arayüzde seçip, seçeneklerini dinamik olarak ayarlayarak canlı önizlemesini ve kullanıma hazır HTML kodunu almasını sağlayan bir geliştirici aracıdır.
- **Teknolojiler:**
  - **Vue 3 (Composition API):** Reaktif state yönetimi ve bileşen tabanlı mimari için kullanılır.
  - **Vite:** Hızlı geliştirme sunucusu ve derleme aracı.
  - **Bootstrap 5.3:** Arayüz bileşenleri ve stilleri için temel kütüphane.

---

## 2. Temel Mimari ve Veri Akışı

Projenin kalbi, tüm operasyonları yöneten `App.vue` bileşenidir. Mimari, tek yönlü veri akışı ve olay (event) tabanlı iletişim üzerine kuruludur.

**Veri Akış Şeması:**

1.  **Bileşen Seçimi (`BootstrapSidebar.vue` -> `App.vue`):**
    -   Kullanıcı, sol menüdeki `BootstrapSidebar.vue`'dan bir bileşen (örn: "Button") seçer.
    -   Sidebar, `@select` eventi ile seçilen bileşenin adını (`'Button'`) `App.vue`'ya iletir.

2.  **Yeni Örnek Oluşturma (`App.vue`):**
    -   `App.vue`, `onSidebarSelect` fonksiyonu ile bu eventi yakalar.
    -   `blockMeta` nesnesinden `'Button'` anahtarına karşılık gelen bileşen meta verisini bulur.
    -   Bu meta verideki `getDefaultOptions` fonksiyonunu çağırarak butonun varsayılan ayarlarını alır.
    -   `{ id, type: 'Button', options: {...} }` yapısında yeni bir nesne oluşturur ve bunu reaktif `components` dizisine ekler.

3.  **Önizleme ve Kod Üretimi (`App.vue` -> `iframe`):**
    -   `components` dizisindeki değişiklik, Vue'nun reaktivite sistemi sayesinde arayüzü otomatik olarak günceller.
    -   `v-for` döngüsü, yeni eklenen her örnek için bir önizleme alanı oluşturur.
    -   Her örnek için `generatePreviewSrcdoc(comp)` fonksiyonu çalışır.
    -   Bu fonksiyon, `blockMeta`'dan ilgili bileşenin `generateHtml(options)` fonksiyonunu çağırarak nihai HTML kodunu üretir.
    -   Üretilen HTML, bir `<iframe>`'in `srcdoc` özelliğine basılır. Bu, her önizlemenin kendi izole ortamında çalışmasını sağlar.

4.  **Seçeneklerin Güncellenmesi (`ComponentOptionsPanel` -> `App.vue`):**
    -   Kullanıcı bir örneği düzenlemek için tıkladığında, `selectedIndex` güncellenir ve sağdan `ComponentOptionsPanel` açılır.
    -   Bu panel, seçili olan örneğin (`components[selectedIndex]`) `options` nesnesini prop olarak alır ve arayüzü (input, select vb.) oluşturur.
    -   Kullanıcı panelde bir ayarı (örn: buton rengini) değiştirdiğinde, panel `@update:options` eventi ile güncellenmiş `options` nesnesini `App.vue`'ya geri gönderir.
    -   `App.vue`, `updateOptions` fonksiyonu ile bu eventi yakalar ve `components` dizisindeki ilgili örneğin `options` nesnesini günceller.
    -   Bu reaktif güncelleme, 3. adımı yeniden tetikleyerek hem `iframe` önizlemesinin hem de kod görünümünün anında değişmesini sağlar.

---

## 3. Dosya Yapısı ve Anahtar Bileşenler

### `src/App.vue`
- **Rolü:** Orkestra Şefi.
- **Sorumlulukları:**
  -   **State Yönetimi:** `components` (tüm örneklerin listesi) ve `selectedIndex` (aktif olarak düzenlenen örnek) reaktif değişkenlerini tutar.
  -   **Layout:** Ana uygulama düzenini (sidebar, ana içerik alanı, seçenekler paneli) yönetir.
  -   **İletişim Merkezi:** `BootstrapSidebar` ve `ComponentOptionsPanel` arasındaki iletişimi sağlar.
  -   **`blockMeta` Nesnesi:** Tüm "Block" bileşenlerinin bir kayıt defteridir. Hangi bileşenin hangi seçenek paneline, varsayılan ayarlara ve HTML üretme fonksiyonuna sahip olduğunu tanımlar. Bu nesne, projenin modülerliğinin temelidir.

### `src/components/BootstrapSidebar.vue`
- **Rolü:** Bileşen Menüsü.
- **Sorumlulukları:**
  -   Mevcut tüm Bootstrap bileşenlerini bir listede gösterir.
  -   Kullanıcı bir bileşen seçtiğinde, seçilen bileşenin adını (String) `App.vue`'ya emit eder. Başka bir görevi yoktur.

### `src/components/blocks/` (Klasör)
- **Rolü:** Bileşen Kütüphanesi.
- Projeye eklenen her Bootstrap bileşeni için bir "Block" dosyası burada yer alır.

### `src/components/blocks/index.js`
- **Rolü:** Merkezi Kayıt (Registry).
- **Sorumlulukları:**
  -   `blocks` klasöründeki **tüm** `[ComponentName]Block.vue` dosyalarını import eder.
  -   Her bileşenin `getDefaultOptions` ve `generateHtml` fonksiyonlarını, isim çakışmasını önlemek için benzersiz bir adla (örn: `getButtonDefaultOptions`) yeniden adlandırır (`alias`).
  -   Tüm bileşenleri ve yeniden adlandırılmış fonksiyonları tek bir nesne olarak dışa aktarır. `App.vue`'nun `import * as Blocks from './components/blocks'` satırı bu dosyayı kullanır. **Bu dosyanın doğru ve eksiksiz olması, projenin çalışması için kritiktir.**

### `src/components/blocks/[ComponentName]Block.vue` (Block Deseni)
- **Rolü:** Kendi Kendine Yeterli Bileşen Ünitesi.
- Her dosya, tek bir Bootstrap bileşeni için gereken her şeyi içerir:
  -   **`<script setup>`:** Seçenekler panelinin (sağda açılan) mantığını içerir. `options` nesnesini prop olarak alır ve her değişiklikte `update:options` event'ini emit eder.
  -   **`<template>`:** Seçenekler panelinin HTML yapısını (form elemanları) tanımlar.
  -   **`<script>` (Klasik Export Bloğu):** İki adet **saf (pure)** fonksiyonu dışa aktarır:
    1.  `export function getDefaultOptions()`: O bileşen için varsayılan ayarları içeren bir JavaScript nesnesi döndürür.
    2.  `export function generateHtml(options)`: Bir `options` nesnesi alır ve bu ayarlara göre nihai HTML çıktısını bir string olarak döndürür.

---

## 4. Yeni Bir Bileşen Ekleme (Genişletme Rehberi)

Projeye yeni bir Bootstrap bileşeni eklemek için aşağıdaki 5 adımlı standart süreç izlenmelidir:

1.  **Block Dosyasını Oluştur:**
    -   `src/components/blocks/` klasörüne `YeniBilesenBlock.vue` adında yeni bir dosya oluştur.

2.  **Block Desenini Uygula:**
    -   Dosyanın içine, yukarıda açıklanan "Block Deseni"ne uygun olarak `<script setup>`, `<template>` ve klasik `<script>` export bloklarını ekle.
    -   `export function getDefaultOptions()` ve `export function generateHtml(options)` fonksiyonlarını doldur.

3.  **Merkezi Kaydı Güncelle (`index.js`):**
    -   `src/components/blocks/index.js` dosyasını aç.
    -   Yeni bileşeni ve yeniden adlandırılmış fonksiyonlarını import et:
        ```javascript
        import YeniBilesenBlock, { getDefaultOptions as getYeniBilesenDefaultOptions, generateHtml as generateYeniBilesenHtml } from './YeniBilesenBlock.vue';
        ```
    -   Bu yeni importları `export` bloğuna ekle:
        ```javascript
        export {
          // ...diğerleri
          YeniBilesenBlock, getYeniBilesenDefaultOptions, generateYeniBilesenHtml
        };
        ```

4.  **`App.vue`'da Kayıt Et:**
    -   `App.vue` dosyasını aç ve `blockMeta` nesnesine yeni bir giriş ekle:
        ```javascript
        YeniBilesen: {
          component: Blocks.YeniBilesenBlock,
          getDefaultOptions: Blocks.getYeniBilesenDefaultOptions,
          generateHtml: Blocks.generateYeniBilesenHtml
        },
        ```

5.  **Menüye Ekle (`BootstrapSidebar.vue`):**
    -   `src/components/BootstrapSidebar.vue` dosyasını aç.
    -   `components` dizisine yeni bileşenin adını ekle. **Buradaki string, `blockMeta`'daki anahtarla birebir aynı olmalıdır!**
        ```javascript
        const components = [
          'Button', 'YeniBilesen', //...diğerleri
        ]
        ```

---

## 5. Özel Mekanizmalar

### Dinamik Iframe Yüksekliği
- **Sorun:** `iframe` içindeki içerik (örn: açılan bir Modal) değiştiğinde, `iframe`'in yüksekliğinin de değişmesi gerekir.
- **Çözüm:**
  -   `generatePreviewSrcdoc` fonksiyonu, üretilen HTML'in sonuna bir `<script>` bloğu (`resizeScript`) ekler.
  -   Bu script, `iframe` içinde çalışır ve içeriğin `scrollHeight` değerini sürekli dinler (`MutationObserver` ile).
  -   Yükseklik değiştiğinde, `window.parent.postMessage({ type: 'resize-iframe', height: h }, '*')` komutu ile ana pencereye (`App.vue`) bir mesaj gönderir.
  -   `App.vue`'da bulunan global `message` dinleyicisi bu mesajı yakalar ve mesajı gönderen `iframe`'in `style.height` özelliğini günceller.

### JavaScript Bağımlı Bileşenler (Tooltip, Popover)
- **Sorun:** Tooltip ve Popover gibi bileşenlerin çalışması için Bootstrap'in JavaScript'i ile başlatılmaları gerekir.
- **Çözüm:** Yukarıda bahsedilen `resizeScript`'in içinde, aynı zamanda `initializeBootstrapPlugins` adında bir fonksiyon bulunur. Bu fonksiyon, `iframe` yüklendiğinde `[data-bs-toggle="tooltip"]` ve `[data-bs-toggle="popover"]` seçicilerine sahip tüm elemanları bulur ve onlar için gerekli Bootstrap JavaScript örneklerini oluşturur. Bu sayede bu bileşenler önizleme alanında interaktif olarak çalışır.
