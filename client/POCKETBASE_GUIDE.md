# Panduan Integrasi PocketBase dengan Frontend

## Gambaran Umum

Dokumen ini menjelaskan cara frontend aplikasi RYFIFA Gas Medic terhubung dengan backend PocketBase yang sudah di-host di Azure. Semua hardcoded data sudah di-replace menjadi dinamis yang diambil dari PocketBase API.

**Update Terbaru**: Konfigurasi sudah diperbaiki untuk menangani format response dari PocketBase dengan benar. Aplikasi sekarang menggunakan data fallback jika PocketBase tidak dapat diakses.

**Note Khusus**: Hero title "Solusi Oksigen Medis Terbaik" tetap hardcoded untuk mempertahankan gradient design yang sudah ada di production Netlify. Gradient CSS tidak bisa di-render dari database, jadi untuk design consistency tetap menggunakan HTML statis dengan CSS classes.

## URL PocketBase

```
https://lp-rgm.eastasia.cloudapp.azure.com
```

Backend PocketBase sudah di-host dan dapat diakses melalui URL di atas.

## Struktur File

### 1. PocketBase Configuration (`client/lib/pocketbase.ts`)

Berisi konfigurasi utama untuk koneksi ke PocketBase, tipe data yang digunakan, dan fungsi-fungsi API untuk mengambil data dari berbagai collections.

### 2. Custom Hooks (`client/hooks/use-pocketbase.ts`)

Berisi custom hooks yang menggunakan React Query untuk:
- Mengambil data dari PocketBase
- Caching untuk optimasi performa
- State management (loading, error, success)
- Type safety dengan TypeScript

## Struktur Data PocketBase

### Collections yang Tersedia:

1. **settings** - Konfigurasi perusahaan
   - company_name, tagline, contact info, social media
   - **File attachments**: logo, favicon, hero_image, map_image

2. **benefits** - Keunggulan layanan
   - icon_name (pilihan: Award, Package, Truck, Wrench, DollarSign, Clock)
   - title, description, order, is_active

3. **partners** - Mitra perusahaan
   - name, logo_url (bisa URL eksternal atau file attachment), website_url, order
   - **File attachments**: logo (jika menggunakan file attachment PocketBase)

4. **products** - Produk tabung oksigen
   - capacity, price, height, diameter, weight, image_url (bisa URL eksternal atau file attachment), description, is_avail
   - **File attachments**: image (jika menggunakan file attachment PocketBase)

5. **hero_sections** - Hero section per halaman
   - field (home/tentang/produk/kontak)
   - title, subtitle, CTA buttons, background settings
   - **File attachments**: background_image (jika menggunakan file attachment PocketBase)

6. **contact** - Informasi kontak
   - whatsapp_number, email, address, phone

7. **about** - Konten halaman tentang
   - section (story/vision/mission/values)
   - title, content, order
   - **File attachments**: image (jika ada gambar untuk section tertentu)

## Cara Menggunakan Custom Hooks

### Import Hooks yang Diperlukan

```tsx
import { useBenefits, usePartners, useProducts, useHeroSection, useSettings, useContact, useAboutSection } from "@/hooks/use-pocketbase";
import { getPocketBaseFileUrlOrFallback } from "@/lib/pocketbase";
```

### Mengambil Data dalam Komponen

```tsx
function MyComponent() {
  // Mengambil data benefits
  const { data: benefits, isLoading, error } = useBenefits();
  
  // Mengambil data partners
  const { data: partners, isLoading: partnersLoading, error: partnersError } = usePartners();
  
  // Loading state
  if (isLoading) {
    return <div>Memuat data...</div>;
  }
  
  // Error handling
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  // Menampilkan data
  return (
    <div>
      {benefits?.map(benefit => (
        <div key={benefit.id}>
          <h3>{benefit.title}</h3>
          <p>{benefit.description}</p>
        </div>
      ))}
    </div>
  );
}
```

## Menggunakan File Attachments (Aspek) dari PocketBase

PocketBase mendukung penyimpanan file attachments langsung di database. File-file ini bisa berupa gambar, dokumen, atau file lainnya yang di-upload melalui admin panel PocketBase.

### Format File di PocketBase

File attachments di PocketBase bisa berupa:
- **String** - Single file: `"logo.png"`
- **Array of strings** - Multiple files: `["image1.jpg", "image2.jpg"]`
- **Null/undefined** - Tidak ada file

### Cara Menggunakan File Attachments

#### 1. Import Utility Function

```tsx
import { getPocketBaseFileUrl, getPocketBaseFileUrlOrFallback } from "@/lib/pocketbase";
```

#### 2. Menggunakan di Komponen

**Contoh 1: Partner Logo dengan File Attachment**

```tsx
import { usePartners } from "@/hooks/use-pocketbase";
import { getPocketBaseFileUrlOrFallback } from "@/lib/pocketbase";

function PartnersSection() {
  const { data: partners } = usePartners();
  
  return (
    <div>
      {partners?.map(partner => {
        // Jika partner.logo adalah file attachment dari PocketBase
        const logoUrl = getPocketBaseFileUrlOrFallback(
          'partners',        // Collection ID
          partner.id,        // Record ID
          partner.logo,      // File attachment (bisa string, array, atau null)
          'https://fallback-url.com/default-logo.png' // Fallback URL
        );
        
        return (
          <img 
            key={partner.id}
            src={logoUrl} 
            alt={partner.name} 
          />
        );
      })}
    </div>
  );
}
```

**Contoh 2: Product Image dengan File Attachment**

```tsx
import { useProducts } from "@/hooks/use-pocketbase";
import { getPocketBaseFileUrlOrFallback } from "@/lib/pocketbase";

function ProductsSection() {
  const { data: products } = useProducts();
  
  return (
    <div>
      {products?.map(product => {
        // Handle file attachment atau URL eksternal
        const imageUrl = getPocketBaseFileUrlOrFallback(
          'products',
          product.id,
          product.image, // File attachment dari PocketBase
          product.image_url || 'https://default-image.com/product.jpg' // Fallback
        );
        
        return (
          <div key={product.id}>
            <img src={imageUrl} alt={product.capacity} />
            <h3>{product.capacity}</h3>
          </div>
        );
      })}
    </div>
  );
}
```

**Contoh 3: Multiple Files (Ambil yang Pertama)**

```tsx
// Jika PocketBase mengembalikan array of files
const imageUrl = getPocketBaseFileUrlOrFallback(
  'products',
  product.id,
  product.images, // Array: ["image1.jpg", "image2.jpg"]
  'https://default.jpg'
);
// Akan menggunakan image1.jpg (file pertama)
```

### Keuntungan Menggunakan File Attachments

1. **Centralized Storage** - Semua file tersimpan di PocketBase
2. **Automatic URL Generation** - URL otomatis di-generate oleh PocketBase
3. **File Management** - Mudah di-manage melalui admin panel
4. **Fallback Support** - Tetap bisa menggunakan URL eksternal sebagai fallback
5. **Type Safety** - Mendukung string, array, atau null

### Catatan Penting

- Jika field sudah berisi URL lengkap (dimulai dengan `http://` atau `https://`), function akan return URL tersebut langsung
- Jika field adalah file attachment PocketBase (hanya nama file), function akan generate URL lengkap
- Function `getPocketBaseFileUrlOrFallback` selalu return string (tidak pernah null), karena ada fallback
- Function `getPocketBaseFileUrl` bisa return `null` jika tidak ada file

## Pattern yang Sudah Diimplementasikan

### 1. Index.tsx (Halaman Beranda)

Halaman ini sudah mereplace **SEMUA hardcoded data** dengan data dari PocketBase:

- **Hero Section**: Mengambil title, subtitle, CTA buttons, dan background image dari collection `hero_sections` dengan field "home"
- **Benefits**: Mengambil icon, title, dan description dari collection `benefits` yang aktif (is_active=true), diurutkan berdasarkan display_order
- **Partners**: Mengambil name dan logo_url dari collection `partners`, diurutkan berdasarkan order
- **Settings**: Mengambil company_name, whatsapp_number, email, facebook_url, map_url, dan hero_image_url untuk berbagai bagian aplikasi
- **Contact**: Mengambil address untuk lokasi peta
- **Footer & Header**: Menggunakan company_name, email, whatsapp_number, dan facebook_url dari settings
- **100% Dinamis**: Tidak ada hardcoded text yang tersisa, semua fallback juga menggunakan data settings

### 2. Format Response PocketBase

PocketBase API mengembalikan data dalam format:
```json
{
  "items": [/* array data */],
  "totalItems": 100,
  "page": 1,
  "perPage": 50,
  "totalPages": 2
}
```

Backend API sudah dikonfigurasi untuk mengekstrak field `items` dan mengembalikan array data yang dapat langsung digunakan.

### 2. Design Gradient Special Case

**PENTING!** Hero title gradient tidak bisa diambil dari PocketBase:

```tsx
// ❌ INI TIDAK BISA DILAKUKAN:
<h1>{heroData?.title}</h1>

// ✅ SOLUSI YANG DIGUNAKAN:
<h1>
  <span className="text-white">Solusi </span>
  <span className="bg-gradient-to-r from-primary-blue-300 to-primary-blue-100 bg-clip-text text-transparent">Oksigen</span>
  <span className="text-white"> Medis </span>
  <span className="bg-gradient-to-r from-primary-blue-300 to-primary-blue-100 bg-clip-text text-transparent">Terbaik</span>
</h1>
```

**Alasannya:**
- Gradient CSS memerlukan HTML structure dan CSS classes spesifik
- Database hanya bisa menyimpan plain text, tidak bisa menyimpan DOM structure
- Design consistency dengan production Netlify adalah prioritas

### 3. Pattern Icon Mapping

Icons diambil dari PocketBase sebagai string dan di-mapping ke Lucide React icons:

```tsx
const iconMap = {
  Award,
  Package,
  Truck,
  Wrench,
  DollarSign,
  Clock,
};

// Penggunaan:
const IconComponent = iconMap[benefit.icon_name as keyof typeof iconMap];
```

### 3. Error Handling & Loading States

Setiap komponen memiliki:
1. Loading state saat data masih dimuat
2. Error state jika gagal mengambil data
3. Success state saat data berhasil dimuat

```tsx
// Error State component
function ErrorState({ message }: { message: string }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-4">
      <p className="text-red-800">Error: {message}</p>
    </div>
  );
}

// Loading State component
function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <Loader2 className="w-8 h-8 animate-spin text-primary-blue-500" />
      <p className="mt-4 text-neutral-dark">Memuat data...</p>
    </div>
  );
}
```

## Cara Melanjutkan ke Halaman Lain

Untuk mereplace hardcoded data di halaman lain (Tentang, Produk, Kontak), ikuti pattern yang sama:

### 1. Tentang.tsx

```tsx
// Import hooks yang diperlukan
import { useAboutSection, useHeroSection } from "@/hooks/use-pocketbase";

// Di dalam component
export default function Tentang() {
  // Hero section untuk halaman tentang
  const { data: heroSection, isLoading, error } = useHeroSection('tentang');
  const heroData = heroSection && heroSection.length > 0 ? heroSection[0] : null;
  
  // Data about untuk berbagai section
  const storySection = useAboutSection('story');
  const visionSection = useAboutSection('vision');
  const missionSection = useAboutSection('mission');
  const valuesSection = useAboutSection('values');
  
  // ... lanjutkan dengan loading/error handling dan rendering
}
```

### 2. Produk.tsx

```tsx
import { useProducts, useHeroSection } from "@/hooks/use-pocketbase";

export default function Produk() {
  const { data: products, isLoading, error } = useProducts();
  const { data: heroSection, isLoading: heroLoading } = useHeroSection('produk');
  
  // ... lanjutkan dengan implementasi produk
}
```

### 3. Kontak.tsx

```tsx
import { useContact, useHeroSection } from "@/hooks/use-pocketbase";

export default function Kontak() {
  const { data: contact, isLoading, error } = useContact();
  const { data: heroSection, isLoading: heroLoading } = useHeroSection('kontak');
  
  // ... lanjutkan dengan implementasi form kontak
}
```

## Catatan Penting

1. **Caching**: React Query melakukan caching otomatis dengan staleTime 5 menit
2. **Error Handling**: Setiap fetch memiliki fallback hardcoded jika PocketBase tidak dapat diakses
3. **Type Safety**: Semua data memiliki TypeScript interface yang didefinisikan di `pocketbase.ts`
4. **Responsif**: Struktur data yang diambil sudah sesuai dengan kebutuhan UI yang responsif

## Testing

Untuk testing koneksi PocketBase:

1. Buka browser dan akses: https://lp-rgm.eastasia.cloudapp.azure.com/_/
2. Login dengan admin credentials
3. Periksa collections dan data yang tersedia
4. Verifikasi API endpoints melalui:
   - https://lp-rgm.eastasia.cloudapp.azure.com/api/collections/benefits/records
   - https://lp-rgm.eastasia.cloudapp.azure.com/api/collections/partners/records
   - dsb.

## Troubleshooting

### 1. CORS Error
Jika terjadi CORS error, pastikan PocketBase server mengizinkan origin dari aplikasi frontend (Netlify).

### 2. Data Tidak Muncul
- Periksa koneksi internet
- Verifikasi URL PocketBase dapat diakses
- Cek console untuk error messages
- Pastikan collection dan field names sesuai dengan struktur yang ada

### 3. Icon Tidak Muncul
Pastikan icon_name di PocketBase sesuai dengan nama yang ada di iconMap:
- "Award", "Package", "Truck", "Wrench", "DollarSign", "Clock"

### 4. Hook Error (useContact is not defined)
Pastikan import hook yang benar:
```tsx
// ❌ Salah
import { useBenefits, usePartners, useHeroSection, useSettings } from "@/hooks/use-pocketbase";

// ✅ Benar  
import { useBenefits, usePartners, useHeroSection, useSettings, useContact } from "@/hooks/use-pocketbase";
```

### 5. Gradient Tidak Muncul di Hero Title
Ini adalah behavior yang diinginkan! Hero title tetap hardcoded untuk maintain design consistency. Lihat section "Design Gradient Special Case" untuk penjelasan lengkap.

### 6. File Attachment Tidak Muncul
Pastikan:
- Collection ID benar (contoh: 'partners', 'products', 'settings')
- Record ID benar (gunakan `record.id` dari data PocketBase)
- Field name benar (contoh: `partner.logo`, `product.image`)
- File sudah di-upload di PocketBase admin panel
- Gunakan `getPocketBaseFileUrlOrFallback()` untuk handle fallback

### 7. URL File Attachment Salah
Format URL yang benar:
```
https://lp-rgm.eastasia.cloudapp.azure.com/api/files/{collection_id}/{record_id}/{filename}
```

Pastikan:
- Collection ID menggunakan nama collection (bukan ID)
- Record ID menggunakan ID record (bukan nama)
- Filename adalah nama file yang di-return dari PocketBase API

---

## Quick Reference: File Attachments

### Import
```tsx
import { getPocketBaseFileUrlOrFallback } from "@/lib/pocketbase";
```

### Basic Usage
```tsx
const imageUrl = getPocketBaseFileUrlOrFallback(
  'collection_name',
  record.id,
  record.file_field,
  'fallback-url.jpg'
);
```

### Collections & Common Fields
- **partners**: `logo` (file attachment)
- **products**: `image` (file attachment)
- **settings**: `logo`, `favicon`, `hero_image`, `map_image` (file attachments)
- **hero_sections**: `background_image` (file attachment)

---

Dokumen ini akan membantu tim frontend untuk melanjutkan integrasi PocketBase ke seluruh halaman aplikasi. Jika ada pertanyaan, silakan hubungi tim backend.
