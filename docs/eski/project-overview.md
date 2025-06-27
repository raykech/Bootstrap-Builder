# Bootstrap 5.3 Bileşen Oluşturucu (Bootstrap Builder)

## Proje Amacı
Kullanıcıların Vue 3 tabanlı bir arayüzde, Bootstrap 5.3 bileşenlerini (ör. Button, Navbar) kolayca seçip, seçeneklerini dinamik olarak ayarlayarak canlı önizleme ve HTML kodunu görebileceği, çoklu örnek destekli bir uygulama.

## Kullanılan Teknolojiler
- **Vue 3**: Modern, reaktif kullanıcı arayüzü için ana framework.
- **Vite**: Hızlı geliştirme ve derleme ortamı.
- **Bootstrap 5.3**: Hazır UI bileşenleri ve stilleri.
- **JavaScript (ESM)**: Vue dosyalarında script bölümleri için.

## Proje Yapısı

```
├── src/
│   ├── App.vue                  # Ana uygulama ve layout, state yönetimi
│   ├── main.js                  # Vue uygulama giriş noktası
│   ├── style.css                # Global stiller
│   └── components/
│       ├── BootstrapSidebar.vue     # Bootstrap bileşenlerini listeler, seçim ve arama
│       ├── ComponentOptionsPanel.vue# Seçili bileşenin dinamik ayar paneli
│       └── ...
├── public/                     # Statik dosyalar
├── index.html                  # Uygulama ana HTML
├── package.json                # Bağımlılıklar ve scriptler
├── vite.config.js              # Vite yapılandırması
└── docs/
    └── project-overview.md     # Proje dokümantasyonu
```

## Ana Dosyalar ve Rolleri

### App.vue
- Uygulamanın ana state yönetimi burada.
- Çoklu örnek desteği: `components` array ve `selectedIndex` ile her örnek bağımsız ayarlanır.
- Sidebar, seçenek paneli, önizleme ve kod görünümü burada birleştirilir.
- Kod görünümünde her örnek için "Örnek 1", "Örnek 2" başlığı ve HTML kodu listelenir.
- Seçenekler paneli açıldığında ilgili örneğin ayarları güncellenir.
- **Önemli:** `ComponentOptionsPanel`'dan gelen `update:options` event'i ile örneklerin opsiyonları güncellenir.

### BootstrapSidebar.vue
- Sol menüde Bootstrap bileşenlerini listeler.
- Arama ve seçim desteği.
- Seçilen bileşen yeni bir örnek olarak eklenir.

### ComponentOptionsPanel.vue
- Seçili örneğin ayarlarını (props) gösterir ve değiştirir.
- Her değişiklikte `emit('update:options', yeniOptions)` ile App.vue'ya güncel opsiyonları yollar.
- **Anahtar uyumu:**
  - Button için: `variant`, `size`, `outline`, `block`, `disabled`, `label`
  - Navbar için: `brand`, `bg`, `scheme`, `search`, `fixedTop`
- App.vue'daki `getDefaultOptions` ve `generateHtml` fonksiyonları ile birebir aynı anahtarları kullanır.

### Kodda Anahtar Uyumu
- **ComponentOptionsPanel.vue** ve **App.vue**'da emit edilen ve beklenen opsiyon anahtarları birebir aynı olmalıdır.
- Örneğin, Button için `variant` panelde de, kod üretiminde de aynı şekilde kullanılır.
- Bu sayede tüm seçenekler (tip, outline, boyut, blok, disabled, label) hem önizleme hem kodda anında ve doğru çalışır.

## Kullanıcı Akışı
1. Kullanıcı sidebar'dan bir Bootstrap bileşeni seçer.
2. Seçilen bileşen yeni bir örnek olarak eklenir ve seçenek paneli açılır.
3. Kullanıcı panelden ayarları değiştirir, değişiklikler anında önizleme ve kod paneline yansır.
4. Kod panelinde her örnek için ayrı HTML kodu kopyalanabilir.

## Geliştirici Notları
- Yeni bir Bootstrap bileşeni eklemek için hem `ComponentOptionsPanel.vue` hem de App.vue'daki `getDefaultOptions` ve `generateHtml` fonksiyonlarına aynı anahtarlarla ekleme yapılmalıdır.
- Anahtar uyumsuzluğu olursa seçenekler çalışmaz veya önizleme/kod güncellenmez.
- Kod paneli ve önizleme, Vue'nun reaktivite sistemine tam uyumlu şekilde güncellenir.

---
Daha fazla teknik detay veya örnek için bu dosyayı güncelleyebilirsiniz.s