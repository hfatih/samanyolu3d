<div align="center">

# 🌌 Samanyolu 3D

### İnteraktif Galaksi Simülatörü

**Spiral galaksileri gerçek zamanlı kurun, döndürün ve yeniden şekillendirin — doğrudan tarayıcınızda.**

[English](README.md) · [Türkçe](README.tr.md)

[![Canlı Demo (GitHub Pages)](https://img.shields.io/badge/Canl%C4%B1%20Demo-GitHub%20Pages-e7a0b9?style=for-the-badge&logo=github&logoColor=white)](https://hfatih.github.io/samanyolu3d/)
[![Canlı Ayna (Netlify)](https://img.shields.io/badge/Canl%C4%B1%20Ayna-samanyolu3d.netlify.app-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://samanyolu3d.netlify.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Hfatih%2Fsamanyolu3d-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Hfatih/samanyolu3d)

<br/>

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.160-black?style=flat-square&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![React Three Fiber](https://img.shields.io/badge/@react--three/fiber-8.14-black?style=flat-square)](https://docs.pmnd.rs/react-three-fiber)
[![React Three Drei](https://img.shields.io/badge/@react--three/drei-9.59-black?style=flat-square)](https://github.com/pmndrs/drei)
[![Leva](https://img.shields.io/badge/Leva-GUI-ff5f5f?style=flat-square)](https://github.com/pmndrs/leva)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Lisans: MIT](https://img.shields.io/badge/Lisans-MIT-yellow.svg?style=flat-square)](LICENSE)

</div>

---

## 🔭 Genel Bakış

**Samanyolu 3D**, spiral galaksilerin morfolojisini, yıldız dağılımlarını ve dinamik yapılarını doğrudan tarayıcınızda modelleyen gerçek zamanlı ve interaktif bir 3 boyutlu simülasyon projesidir. **React**, **Three.js** ve **React Three Fiber (R3F)** teknolojileri kullanılarak geliştirilmiştir.

Uygulama; **Samanyolu** ve **Andromeda (M31)** galaksilerine ait astrofiziksel verileri referans alan hazır modeller sunmanın yanı sıra, kullanıcının serbestçe kendi galaktik yapısını tasarlayabileceği kapsamlı bir kontrol paneli (Leva GUI) içerir.

> 🚀 **Canlı Uygulama:** [✦ GitHub Pages Demosu](https://hfatih.github.io/samanyolu3d/) · [Netlify Yayını](https://samanyolu3d.netlify.app/)

---

## ✨ Öne Çıkan Özellikler

- **Prosedürel Spiral Kol Algoritması**:
  - Tohumlu rastgele sayı üreteci (`mulberry32`) ve Gauss normal dağılımı (`Box-Muller`) ile oluşturulan matematiksel logaritmik kollar.
  - Dinamik parametreler: Kol sayısı (2–8), kol burulması (`twist`), yayılım genişliği (`spread`) ve disk burkulması (`disk warp`).
- **Çok Katmanlı Galaktik Anatomi**:
  - **Disk Yıldızları (Spiral Kollar)**: Galaktik yarıçapa bağlı HSL renk sıcaklığı profili (iç bölgelerde sıcak/sarı, dış kollarda genç mavi yıldız popülasyonları).
  - **Merkezi Şişkinlik (Bulge)**: Yüksek yoğunluklu küresel çekirdek ve merkezdeki süper kütleli yapıyı temsil eden ışıma küresi.
  - **Yıldız Halesi (Halo) ve Toz Katmanı**: Galaksiyi çepeçevre saran seyrek halo yıldızları ve derinlik kazandıran yıldızlararası toz bulutları.
- **Galaktik Konum İşaretçileri (Landmarks)**:
  - ☀️ **Güneş Sistemi**: Galaktik merkezden ~85 birim uzaklıktaki konum etiketi.
  - 🌌 **Orion Kolu**: Yerel kol konumu.
  - 💫 **Galaktik Merkez**: Çekirdek işaretçisi.
- **Hazır Galaksi Modelleri (Presets)**:
  - 🌌 **Samanyolu**: 4 spiral kol, çubuklu spiral geometri, ~150 milyar gerçek yıldız ölçeği.
  - 🌀 **Andromeda (M31)**: 5 spiral kol, daha sıkı sarmal kollar, ~1 trilyon gerçek yıldız ölçeği.
  - ⚙️ **Özel Ayar (Sandbox)**: Tüm parametrelerin kullanıcı tarafından anlık şekillendirildiği mod.
- **Canlı İnteraktif GUI (Leva Kontrol Paneli)**:
  - Dönüş hızı, yıldız boyutu, parçacık örnek sayıları ve morfolojik yapıların gerçek zamanlı ayarlanması.
- **Dinamik Ölçek Oranı Hesaplayıcı**:
  - NASA ve ESA yıldız sayımı araştırmaları baz alınarak seçili sahneye göre anlık ölçek hesaplama (örn. `1 nokta ≈ X bin / milyon yıldız`).
- **Modern Glassmorphic Arayüz**:
  - Arka plan bulanıklığına sahip şık kartlar, 360° serbest kamera rotasyonu (`OrbitControls`) ve derin uzay arka planı.

---

## 🎮 Kontroller

| İşlem | Girdi |
| :--- | :--- |
| **Döndürme (Orbit)** | Sol Tık + Sürükle (Masaüstü) / Tek Parmak Sürükleme (Dokunmatik) |
| **Kaydırma (Pan)** | Sağ Tık + Sürükle / İki Parmak Sürükleme |
| **Yakınlaştırma (Zoom)** | Fare Tekerleği / İki Parmakla Kıstırma (Pinch) |
| **Galaksi Seçimi** | Sol üstteki cam efektli kart (Samanyolu, Andromeda, Özel Ayar) |
| **Fizik ve Görsel Ayarlar** | Sağ üstteki Leva kontrol paneli |

---

## 🛠️ Teknoloji Yığını

- **Çekirdek**: React 18, JavaScript (ESNext)
- **3B Grafikler & WebGL**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Arayüz & Kontrol**: `leva`, Modern CSS (Glassmorphism)
- **Derleyici & Araçlar**: Vite 5
- **Yayın & CI/CD**: Netlify

---

## 🚀 Kurulum ve Yerel Çalıştırma

### Gereksinimler

- [Node.js](https://nodejs.org/) (v18 veya üzeri önerilir)
- [npm](https://www.npmjs.com/) veya `pnpm` / `yarn`

### Adımlar

1. Depoyu klonlayın:
   ```bash
   git clone https://github.com/Hfatih/samanyolu3d.git
   cd samanyolu3d
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

4. Terminalde belirtilen yerel adresi tarayıcınızda açın (genellikle `http://localhost:5173`).

---

## 📦 Derleme ve Dağıtım

Üretim (production) sürümünü oluşturmak için:

```bash
npm run build
```

Oluşturulan optimize dosyalar `dist/` klasöründe yer alır ve Netlify, Vercel veya GitHub Pages gibi herhangi bir statik sunucuda doğrudan yayınlanabilir.

### Netlify Yapılandırması

Proje Netlify otomatik dağıtımına hazırdır:
- **Build command**: `npm run build`
- **Publish directory**: `dist`

---

## 📚 Bilimsel Referanslar ve Notlar

- **NASA GSFC**: [Milky Way Fact Sheet](https://nssdc.gsfc.nasa.gov/)
- **ESA / Hubble**: [Milky Way & Andromeda Star Surveys](https://esahubble.org/)
- **Not**: Bu çalışma eğitim ve görselleştirme amaçlı bir modellemedir; parçacık yoğunlukları ve geometrik boyutlar web tarayıcısında gerçek zamanlı WebGL performansı sağlamak adına ölçeklenmiştir.

---

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) kapsamında lisanslanmıştır.
