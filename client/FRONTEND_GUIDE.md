# 📋 Panduan Tim Frontend - RYFIFA Gas Medic

## 🎯 Objective: DARI HARDCODE KE POCKETBASE

Mengganti semua hardcoded data menjadi dynamic dari PocketBase database sambil maintain visual design consistency.

---

## 📁 File yang Perlu Dipantau untuk PocketBase Integration:

### 1. `client/pages/Index.tsx` ✅ (DONE - Example)
- Pattern: Hero section → PocketBase, Title → Gradient (static)
- Lihat dokumentasi lengkap di file ini

### 2. `client/pages/Tentang.tsx` 🔄 (TO DO)
- Hero section → PocketBase  
- About content (story/vision/mission/values) → PocketBase
- Title gradient → static (maintain design)

### 3. `client/pages/Produk.tsx` 🔄 (TO DO)
- Hero section → PocketBase
- Products data → PocketBase
- Maintain gradient titles jika ada

### 4. `client/pages/Kontak.tsx` 🔄 (TO DO)
- Hero section → PocketBase
- Contact form → hardcoded (form logic)
- Contact info → PocketBase

---

## 🛠️ Tools & Libraries yang Digunakan:

### PocketBase Integration:
- **`lib/pocketbase.ts`** - API functions layer + File attachments utilities
- **`hooks/use-pocketbase.ts`** - React Query hooks layer

### React & UI:
- **React 18** + **React Router 6**
- **TypeScript** untuk type safety
- **TailwindCSS** untuk styling
- **React Query** untuk data fetching & caching
- **Radix UI** untuk components

### File Attachments (Aspek):
- **`getPocketBaseFileUrl()`** - Generate URL untuk file attachment PocketBase
- **`getPocketBaseFileUrlOrFallback()`** - Generate URL dengan fallback support

---

## 🔄 Pattern Implementation di Halaman Lain:

### Step 1: Import Hooks
```tsx
import { 
  useHeroSection, 
  useAboutSection, 
  useSettings,
  useContact,
  useProducts 
} from "@/hooks/use-pocketbase";
```

### Step 2: Fetch Data Hooks
```tsx
export default function Tentang() {
  const { data: heroSection, isLoading, error } = useHeroSection('tentang');
  const { data: about, isLoading: aboutLoading, error: aboutError } = useAboutSection('story');
  const { data: vision } = useAboutSection('vision');
  const { data: mission } = useAboutSection('mission');
  const { data: values } = useAboutSection('values');
  const { data: settings } = useSettings();

  // Data processing
  const heroData = heroSection?.[0];
  const settingsData = settings?.[0];
}
```

### Step 3: Render dengan Fallback
```tsx
{heroError ? (
  <ErrorFallback />
) : heroLoading ? (
  <LoadingFallback />
) : (
  <div>
    <h1>{heroData?.title || 'Default Title'}</h1>
    <p>{heroData?.subtitle || 'Default subtitle'}</p>
  </div>
)}
```

### Step 4: Handle File Attachments (Aspek)
```tsx
import { getPocketBaseFileUrlOrFallback } from "@/lib/pocketbase";

// Di dalam component
const imageUrl = getPocketBaseFileUrlOrFallback(
  'partners',           // Collection ID
  partner.id,           // Record ID
  partner.logo,         // File attachment dari PocketBase
  'https://fallback.com/logo.png' // Fallback URL
);

<img src={imageUrl} alt={partner.name} />
```

---

## 🎨 Important: Design Gradient Exception

### WHY hero title tetap hardcoded:
- ✅ Design consistency dengan Netlify production
- ✅ Gradient CSS memerlukan HTML structure spesifik
- ✅ Database hanya bisa store plain text
- ✅ DOM structure untuk bg-clip-text tidak bisa dari database

### WHAT harus hardcoded:
- Hero titles dengan gradient (Solusi **Oksigen** Medis **Terbaik**)
- Any text styling yang memerlukan complex CSS structure

### WHAT harus dynamic:
- Subtitles, descriptions, benefits, partners, products
- Contact information, company settings
- CTA buttons text and URLs
- All content dengan simple styling

---

## 🗄️ PocketBase Collections Summary:

| Collection | Fields | Usage | Already Used In |
|------------|--------|-------|-----------------|
| `hero_sections` | field, title, subtitle, CTA texts | Hero per halaman | ✅ Index |
| `benefits` | icon_name, title, description | Keunggulan layanan | ✅ Index |
| `partners` | name, logo_url, website_url | Partner list | ✅ Index |
| `products` | capacity, price, height, diameter, weight, image_url | Product data | ⏳ Menunggu |
| `settings` | company_name, whatsapp_number, email, etc | Global settings | ✅ Index |
| `contact` | whatsapp_number, email, address, phone | Contact info | ✅ Index |
| `about` | section, title, content, order | About per section | ⏳ Menunggu |

---

## 📝 Quick Start Checklist untuk Halaman Baru:

- [ ] Import hooks yang dibutuhkan
- [ ] Setup data fetching dengan hooks  
- [ ] Add loading and error states
- [ ] Implement fallback data
- [ ] Maintain gradient titles (jika ada)
- [ ] Test dengan PocketBase online
- [ ] Test dengan PocketBase offline (fallback)

---

## 🚨 Common Issues & Solutions:

| Issue | Solution |
|-------|----------|
| `useXXX is not defined` | Tambahkan hook ke import statement |
| Data tidak muncul | Cek collection name dan field structure |
| Gradient tidak muncul | Ini by design! Lihat section Gradient Exception |
| CORS error | Pastikan PocketBase allow frontend origin |
| Icon tidak muncul | Cek icon_name match dengan iconMap |
| File attachment tidak muncul | Gunakan `getPocketBaseFileUrlOrFallback()` untuk generate URL |
| Image broken | Pastikan collection ID dan record ID benar, atau gunakan fallback URL |

---

## 📚 Documentation Lengkap:

- **`client/POCKETBASE_GUIDE.md`** - Dokumentasi teknis lengkap
- **`client/lib/pocketbase.ts`** - API functions documentation  
- **`client/hooks/use-pocketbase.ts`** - Custom hooks documentation
- **Index.tsx comments** - Example implementation details

---

## 🎯 Next Steps:

1. **Tentang.tsx** - Implement about sections dengan useAboutSection
2. **Produk.tsx** - Implement product data dengan useProducts  
3. **Kontak.tsx** - Implement contact form dengan useContact
4. **Testing** - Test semua scenarios (online/offline/error states)
5. **Deployment** - Pastikan Netlify version tetap match dengan local

---

**💡 Remember**: 100% dynamic data + design consistency = Perfect solution! 

**Questions?** Hubungi tim backend atau lihat documentation lengkap.
