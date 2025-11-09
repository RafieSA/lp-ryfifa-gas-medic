# Panduan Ekspor dari Figma untuk RYFIFA Gas Medic

## 📋 Informasi yang Dibutuhkan untuk Update UI

### 1. **Gambar/Design**
- **Format**: PNG atau JPG dengan resolusi tinggi (minimal 1920px width)
- **Export Settings**: 
  - Scale: 2x atau 3x
  - Format: PNG (untuk screenshot) atau JPG (jika ukuran file besar)

### 2. **Warna (Colors)**
Dari panel Inspect di Figma, salin:
- **Hex codes** untuk semua warna yang digunakan
- Atau **HSL values** jika tersedia
- Sertakan nama warna (contoh: Primary Blue, Secondary, dll)

**Contoh format:**
```
Primary Blue: #244C63
Secondary Blue: #418BB4
White: #FDFDFD
Black: #232323
```

### 3. **Typography (Font)**
- **Font Family**: Nama font (contoh: Plus Jakarta Sans, Nunito)
- **Font Sizes**: Ukuran untuk Heading, Body, Button, dll
- **Font Weights**: Regular (400), Medium (600), Bold (700), dll
- **Line Heights**: Spacing antara baris
- **Letter Spacing**: Jarak antar huruf (jika ada)

**Contoh format:**
```
Heading 1: 48px, Bold (700), Line Height: 60px
Body: 16px, Regular (400), Line Height: 24px
```

### 4. **Spacing**
- **Padding**: Jarak internal elemen (dalam px)
- **Margin**: Jarak eksternal elemen (dalam px)
- **Gap**: Jarak antar elemen dalam grid/flex (dalam px)

### 5. **Border Radius**
- Radius untuk buttons, cards, containers (dalam px)

### 6. **Shadows/Effects**
- Box shadows: offset, blur, spread, color
- Atau salin CSS dari Figma Inspect panel

### 7. **Assets (Gambar & Ikon)**
- **Logo**: Export sebagai SVG (preferred) atau PNG 2x
- **Icons**: SVG atau PNG dengan background transparent
- **Images**: PNG/JPG dengan resolusi tinggi
- **Naming**: Gunakan nama deskriptif (contoh: `logo-ryfifa.svg`, `hero-oxygen-tank.png`)

### 8. **Breakpoints (Responsive)**
- Ukuran untuk Mobile (contoh: < 768px)
- Ukuran untuk Tablet (contoh: 768px - 1024px)
- Ukuran untuk Desktop (contoh: > 1024px)

## 🚀 Cara Export dari Figma

### Option 1: Screenshot + Inspect Panel
1. Buka desain di Figma
2. Klik elemen yang ingin di-inspect
3. Di panel kanan, buka tab **Inspect**
4. Screenshot desain + salin values dari Inspect panel

### Option 2: Export Specs
1. File → Export → Specs
2. Atau gunakan Figma Dev Mode
3. Share link dengan akses Inspect

### Option 3: Manual Export
1. Pilih frame/element
2. Klik Export di panel kanan
3. Pilih format (PNG/SVG)
4. Set scale (2x recommended)
5. Export

## 📤 Yang Perlu Dikirim

1. ✅ Screenshot/gambar desain (PNG/JPG)
2. ✅ File assets (logo, ikon, gambar) - jika ada
3. ✅ Daftar warna (hex codes)
4. ✅ Informasi typography
5. ✅ Spacing values (opsional, bisa di-infer dari gambar)
6. ✅ Catatan khusus (animasi, hover effects, dll)

## 💡 Tips

- **Lebih baik terlalu banyak informasi daripada kurang**: Semakin detail informasinya, semakin akurat hasil implementasinya
- **Gunakan Figma Dev Mode**: Jika punya akses, Dev Mode memberikan informasi yang sangat detail
- **Sertakan contoh**: Jika ada contoh website/design lain yang diinginkan, sertakan juga
- **Responsive**: Pastikan desain untuk mobile, tablet, dan desktop (jika ada)

---

**Setelah Anda mengirimkan desain, saya akan:**
1. ✅ Menganalisis desain
2. ✅ Update color scheme di `tailwind.config.ts` dan `global.css`
3. ✅ Update typography dan spacing
4. ✅ Implementasi design ke komponen React
5. ✅ Pastikan responsive untuk semua device
6. ✅ Optimasi assets dan performa

