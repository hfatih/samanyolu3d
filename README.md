MilkyWay3D - Vite React Projesi (Netlify’ye Hazır)
İçindekiler

Minimal bir Vite + React projesi altyapısı

src/MilkyWay3D.jsx → 3D Samanyolu bileşeni

Gerekli bağımlılıkları içeren package.json
(three, @react-three/fiber, @react-three/drei, leva)

Yerel Test (Local Testing)

Node.js kurulu olmalı (v18+ önerilir).

Proje klasöründe terminal açıp şu komutları çalıştır:

npm install
npm run dev


Vite’in terminalde gösterdiği yerel geliştirme adresini tarayıcıda aç.

GitHub + Netlify Üzerinden Yayınlama (Adım Adım)

Yeni bir GitHub deposu oluştur (örnek: milkyway3d).

Proje klasöründe Git’i başlat ve şu komutlarla yükle:

git init
git add .
git commit -m "Initial commit - MilkyWay3D"
git branch -M main
git remote add origin https://github.com/<kullanıcı-adın>/<repo-adı>.git
git push -u origin main


Netlify’ye git → “New site” → “Import from Git” → GitHub hesabını seç ve depoyu bağla.

Yapılandırma ayarları (Netlify genelde otomatik algılar):

Build komutu: npm run build

Yayın klasörü: dist

Deploy (Yayınla) → Netlify otomatik olarak derleyip canlı bir URL oluşturur.

Netlify İpuçları

Kodda değişiklik yapıp GitHub’a gönderdiğinde (push) Netlify otomatik yeniden yayınlar.

Ortama özel değişkenleri veya ayarları Netlify panelinden yönetebilirsin.
