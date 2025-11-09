# Panduan Deployment Website RYFIFA Gas Medic

Panduan lengkap untuk membuat website bisa diakses dari internet tanpa localhost.

## 🚀 Opsi 1: Deploy ke Netlify (Paling Mudah & Recommended)

Netlify sudah dikonfigurasi di project ini. Ikuti langkah berikut:

### Langkah-langkah:

1. **Buat Akun Netlify** (jika belum punya)
   - Kunjungi: https://www.netlify.com
   - Sign up dengan GitHub/GitLab/Bitbucket atau Email

2. **Install Netlify CLI** (opsional, untuk deploy via command line)
   ```bash
   npm install -g netlify-cli
   ```

3. **Deploy via Netlify Dashboard** (Paling Mudah):
   - Login ke https://app.netlify.com
   - Klik "Add new site" → "Import an existing project"
   - Pilih "Deploy manually" atau hubungkan dengan Git repository
   - Drag & drop folder `dist/spa` (setelah build) ke Netlify
   - Atau gunakan build settings:
     - **Build command**: `pnpm build:client`
     - **Publish directory**: `dist/spa`

4. **Deploy via Command Line**:
   ```bash
   # Build project terlebih dahulu
   pnpm build:client
   
   # Login ke Netlify
   netlify login
   
   # Deploy
   netlify deploy --prod --dir=dist/spa
   ```

5. **Setelah Deploy**:
   - Netlify akan memberikan URL seperti: `https://your-site-name.netlify.app`
   - URL ini bisa diakses dari mana saja di internet
   - Bisa custom domain juga (gratis)

---

## 🌐 Opsi 2: Deploy ke Vercel

### Langkah-langkah:

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Build Project**:
   ```bash
   pnpm build:client
   ```

3. **Deploy**:
   ```bash
   vercel
   ```
   - Ikuti instruksi di terminal
   - Pilih project settings
   - Vercel akan memberikan URL seperti: `https://your-site-name.vercel.app`

4. **Atau via Dashboard**:
   - Kunjungi: https://vercel.com
   - Import project dari Git repository
   - Set build settings:
     - **Framework Preset**: Vite
     - **Build Command**: `pnpm build:client`
     - **Output Directory**: `dist/spa`

---

## 🔧 Opsi 3: Menggunakan Ngrok (Untuk Testing Cepat)

Ngrok membuat tunnel dari localhost ke internet. Cocok untuk testing sebelum deploy.

### Langkah-langkah:

1. **Install Ngrok**:
   ```bash
   # macOS
   brew install ngrok
   
   # Atau download dari: https://ngrok.com/download
   ```

2. **Daftar & Dapatkan Auth Token**:
   - Daftar di: https://dashboard.ngrok.com/signup
   - Dapatkan auth token
   - Jalankan: `ngrok config add-authtoken YOUR_TOKEN`

3. **Jalankan Website di Localhost**:
   ```bash
   pnpm dev
   ```

4. **Buka Terminal Baru & Jalankan Ngrok**:
   ```bash
   ngrok http 8080
   ```

5. **Dapatkan Public URL**:
   - Ngrok akan memberikan URL seperti: `https://abc123.ngrok.io`
   - URL ini bisa diakses dari mana saja
   - **Catatan**: URL akan berubah setiap kali restart ngrok (kecuali pakai plan berbayar)

---

## 📦 Opsi 4: Deploy Manual ke VPS/Server

Jika punya VPS atau server sendiri:

### Langkah-langkah:

1. **Build Project**:
   ```bash
   pnpm build
   ```

2. **Upload ke Server**:
   - Upload folder `dist/spa` ke server
   - Install Node.js di server
   - Install dependencies: `pnpm install --prod`

3. **Setup Web Server**:
   - Gunakan Nginx atau Apache
   - Point ke folder `dist/spa`
   - Atau jalankan dengan PM2:
     ```bash
     pm2 start dist/server/node-build.mjs
     ```

---

## 🎯 Rekomendasi: Netlify (Paling Mudah)

Untuk project ini, **Netlify adalah pilihan terbaik** karena:
- ✅ Sudah dikonfigurasi di project
- ✅ Gratis untuk project kecil
- ✅ Auto-deploy dari Git
- ✅ SSL certificate gratis
- ✅ CDN global
- ✅ Custom domain gratis

### Quick Start dengan Netlify:

```bash
# 1. Build project
pnpm build:client

# 2. Install Netlify CLI (jika belum)
npm install -g netlify-cli

# 3. Login
netlify login

# 4. Deploy
netlify deploy --prod --dir=dist/spa
```

---

## 📝 Catatan Penting

1. **Environment Variables**: Jika ada API keys atau secrets, set di Netlify/Vercel dashboard
2. **Custom Domain**: Bisa ditambahkan di settings setelah deploy
3. **HTTPS**: Otomatis tersedia (gratis)
4. **Build Time**: Biasanya 1-3 menit untuk first deploy

---

## 🔗 Link Berguna

- **Netlify**: https://www.netlify.com
- **Vercel**: https://vercel.com
- **Ngrok**: https://ngrok.com
- **GitHub Pages**: https://pages.github.com (alternatif lain)

---

## ❓ Troubleshooting

### Build Error?
- Pastikan semua dependencies terinstall: `pnpm install`
- Cek error di terminal saat build
- Pastikan Node.js version sesuai

### Website tidak muncul?
- Cek build output directory
- Pastikan file `index.html` ada di root
- Cek browser console untuk error

### API tidak bekerja?
- Pastikan API routes dikonfigurasi dengan benar
- Cek Netlify Functions (jika pakai Netlify)
- Pastikan CORS settings benar

