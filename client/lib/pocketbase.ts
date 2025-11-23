/**
 * PocketBase Client Configuration
 * 
 * FILE INI MENJADI JEMBATAN ANTARA FRONTEND DAN POCKETBASE DATABASE
 * 
 * STRUKTUR DATA YANG DITANGANI:
 * ============================
 * 
 * • Settings - Konfigurasi perusahaan (nama, kontak, media sosial)
 * • Benefits - Keunggulan layanan (icon mapping, title, description)
 * • Partners - Data mitra (nama, logo, website)
 * • Products - Informasi produk (kapasitas, harga, spesifikasi)
 * • Hero Sections - Hero section per halaman (home/tentang/produk/kontak)
 * • Contact - Data kontak (whatsapp, email, address)
 * • About - Tentang perusahaan (story/vision/mission/values)
 * 
 * FUNGSI UTAMA UNTUK TIM FRONTEND:
 * ===================================
 * 
 * getSettings() - Ambil konfigurasi perusahaan
 * getBenefits() - Ambil data keunggulan layanan  
 * getPartners() - Ambil data mitra
 * getProducts() - Ambil data produk
 * getHeroSection(field) - Ambil hero per halaman
 * getContact() - Ambil data kontak
 * getAboutSection(section) - Ambil data tentang perusahaan
 * getAllAbout() - Ambil semua data tentang perusahaan
 * 
 * UTILITY FUNCTIONS UNTUK FILE ATTACHMENTS:
 * =========================================
 * 
 * getPocketBaseFileUrl(collectionId, recordId, filename) - Generate URL untuk file attachment
 * getPocketBaseFileUrlOrFallback(...) - Generate URL dengan fallback jika file tidak ada
 * 
 * Contoh penggunaan file attachments:
 * ```tsx
 * import { getPocketBaseFileUrlOrFallback } from '@/lib/pocketbase';
 * 
 * // Di component
 * const logoUrl = getPocketBaseFileUrlOrFallback(
 *   'partners',
 *   partner.id,
 *   partner.logo, // File attachment dari PocketBase (bisa string atau array)
 *   'https://fallback-url.com/logo.png' // Fallback jika tidak ada
 * );
 * 
 * <img src={logoUrl} alt={partner.name} />
 * ```
 * 
 * FORMAT RESPONSE POCKETBASE:
 * ==========================
 * PocketBase mengembalikan data dalam format:
 * {
 *   "items": [...],  // Data array yang kita perlukan
 *   "totalItems": 100,
 *   "page": 1,
 *   "perPage": 50,
 *   "totalPages": 2
 * }
 * 
 * Semua fungsi sudah otomatis mengekstrak field "items"
 * sehingga langsung mengembalikan array data yang simple.
 * 
 * CUSTOM HOOKS LAYER (use-pocketbase.ts):
 * ==========================================
 * 
 * Custom hooks menggunakan fungsi-fungsi ini dan menambahkan:
 * • React Query caching (5 menit)
 * • Loading state (isLoading)
 * • Error state (error)
 * • Type safety dengan TypeScript
 * • Automatic refetch saat component mount
 * 
 * URL PocketBase Production: https://lp-rgm.eastasia.cloudapp.azure.com
 * 
 * Cara pakai: Lihat file hooks/use-pocketbase.ts
 * Lihat juga: client/POCKETBASE_GUIDE.md
 */

// PocketBase base URL
const POCKETBASE_URL = 'https://lp-rgm.eastasia.cloudapp.azure.com';

/**
 * Utility function untuk mendapatkan URL file dari PocketBase
 * 
 * PocketBase menyimpan file attachments dan format URL-nya adalah:
 * https://pocketbase-url/api/files/collection_id/record_id/filename
 * 
 * @param collectionId - Nama collection (contoh: 'partners', 'products', 'settings')
 * @param recordId - ID record yang memiliki file
 * @param filename - Nama file (bisa berupa string atau array of strings)
 * @returns URL lengkap untuk mengakses file, atau null jika tidak ada file
 * 
 * @example
 * // Single file
 * const logoUrl = getPocketBaseFileUrl('partners', 'abc123', 'logo.png');
 * // Returns: https://lp-rgm.eastasia.cloudapp.azure.com/api/files/partners/abc123/logo.png
 * 
 * @example
 * // Multiple files (ambil yang pertama)
 * const imageUrl = getPocketBaseFileUrl('products', 'xyz789', ['image1.jpg', 'image2.jpg']);
 * // Returns: https://lp-rgm.eastasia.cloudapp.azure.com/api/files/products/xyz789/image1.jpg
 */
export function getPocketBaseFileUrl(
  collectionId: string,
  recordId: string,
  filename: string | string[] | null | undefined
): string | null {
  if (!filename) return null;
  
  // Jika array, ambil yang pertama
  const file = Array.isArray(filename) ? filename[0] : filename;
  
  if (!file || file.trim() === '') return null;
  
  // Jika sudah URL lengkap (eksternal), return langsung
  if (file.startsWith('http://') || file.startsWith('https://')) {
    return file;
  }
  
  // Generate URL untuk file attachment PocketBase
  return `${POCKETBASE_URL}/api/files/${collectionId}/${recordId}/${file}`;
}

/**
 * Utility function untuk mendapatkan URL file dari PocketBase dengan fallback
 * 
 * Mencoba mendapatkan file dari PocketBase attachment, jika tidak ada atau error,
 * akan menggunakan fallback URL yang diberikan.
 * 
 * @param collectionId - Nama collection
 * @param recordId - ID record yang memiliki file
 * @param filename - Nama file dari PocketBase (bisa string, array, atau null)
 * @param fallbackUrl - URL fallback jika file tidak tersedia
 * @returns URL file dari PocketBase atau fallback URL
 * 
 * @example
 * const imageUrl = getPocketBaseFileUrlOrFallback(
 *   'products',
 *   product.id,
 *   product.image, // File attachment dari PocketBase
 *   'https://example.com/default-image.jpg' // Fallback
 * );
 */
export function getPocketBaseFileUrlOrFallback(
  collectionId: string,
  recordId: string,
  filename: string | string[] | null | undefined,
  fallbackUrl: string
): string {
  const fileUrl = getPocketBaseFileUrl(collectionId, recordId, filename);
  return fileUrl || fallbackUrl;
}

/**
 * Tipe data untuk settings dari PocketBase
 */
export interface Settings {
  id: string;
  company_name: string;
  tagline: string;
  whatsapp_number: string;
  email: string;
  facebook_url: string;
  logo_url: string;
  logo?: string | string[]; // File attachment dari PocketBase (optional)
  favicon_url: string;
  meta_title: string;
  meta_description: string;
  map_url?: string;
  hero_image_url?: string;
  contact_address?: string;
  contact_phone?: string;
}

/**
 * Tipe data untuk benefits dari PocketBase
 */
export interface Benefit {
  id: string;
  icon_name: string; // "Award", "Package", "Truck", "Wrench", "DollarSign", "Clock"
  title: string;
  description: string;
  display_order: number;
  is_active: boolean;
}

/**
 * Tipe data untuk partners dari PocketBase
 */
export interface Partner {
  id: string;
  name: string;
  logo_url: string;
  website_url: string;
  order: number;
}

/**
 * Tipe data untuk products dari PocketBase
 */
export interface Product {
  id: string;
  capacity: string;
  price: number;
  height: string;
  diameter: string;
  weight: string;
  image_url: string;
  description: string;
  is_avail: boolean;
}

/**
 * Tipe data untuk hero_sections dari PocketBase
 */
export interface HeroSection {
  id: string;
  field: "home" | "tentang" | "produk" | "kontak";
  title: string;
  subtitle: string;
  primary_cta_text: string;
  primary_cta_url: string;
  secondary_cta_text: string;
  secondary_cta_url: string;
  background_type: "gradient" | "image";
  background_image_url?: string;
  is_active: boolean;
}

/**
 * Tipe data untuk contact dari PocketBase
 */
export interface Contact {
  id: string;
  whatsapp_number: string;
  email: string;
  address: string;
  phone: string;
}

/**
 * Tipe data untuk about dari PocketBase
 */
export interface About {
  id: string;
  section: "story" | "vision" | "mission" | "values";
  title: string;
  content: string;
  order: number;
}

/**
 * Interface untuk format response dari PocketBase API
 */
interface PocketbaseResponse<T> {
  items: T[];
  totalItems: number;
  page: number;
  perPage: number;
  totalPages: number;
}

/**
 * Utility function untuk fetch data dari PocketBase API
 * 
 * @param endpoint - API endpoint path (tanpa /api/)
 * @param options - Fetch options
 * @returns Promise dengan data JSON dari field items
 */
async function fetchFromPocketBase<T>(endpoint: string, options?: RequestInit): Promise<T[]> {
  const url = `${POCKETBASE_URL}/api/collections/${endpoint}`;

  const defaultOptions: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const finalOptions = { ...defaultOptions, ...options };

  try {
    const response = await fetch(url, finalOptions);
    
    if (!response.ok) {
      throw new Error(`Gagal mengambil data dari PocketBase: ${response.statusText}`);
    }

    const result: PocketbaseResponse<T> = await response.json();
    return result.items;  // Hanya mengembalikan array items
  } catch (error) {
    console.error(`Error saat mengambil data dari ${endpoint}:`, error);
    throw error;
  }
}

/**
 * API Service Functions
 */

/**
 * Mengambil data settings dari PocketBase
 * @returns Promise dengan data settings
 */
export async function getSettings(): Promise<Settings[]> {
  return fetchFromPocketBase<Settings>('settings/records');
}

/**
 * Mengambil data benefits aktif dari PocketBase
 * Data di-sort berdasarkan display_order
 * @returns Promise dengan data benefits yang aktif
 */
export async function getBenefits(): Promise<Benefit[]> {
  return fetchFromPocketBase<Benefit>('benefits/records?filter=is_active=true&sort=display_order');
}

/**
 * Mengambil data partners dari PocketBase
 * Data di-sort berdasarkan order
 * @returns Promise dengan data partners
 */
export async function getPartners(): Promise<Partner[]> {
  return fetchFromPocketBase<Partner>('partners/records?sort=order');
}

/**
 * Mengambil data products yang tersedia dari PocketBase
 * @returns Promise dengan data produk yang tersedia
 */
export async function getProducts(): Promise<Product[]> {
  return fetchFromPocketBase<Product>('products/records?filter=is_avail=true');
}

/**
 * Mengambil data hero section aktif berdasarkan field
 * @param field - Field dari hero section (home, tentang, produk, kontak)
 * @returns Promise dengan data hero section yang aktif
 */
export async function getHeroSection(field: string): Promise<HeroSection[]> {
  return fetchFromPocketBase<HeroSection>(`hero_sections/records?filter=field='${field}'&&is_active=true`);
}

/**
 * Mengambil data contact dari PocketBase
 * @returns Promise dengan data contact
 */
export async function getContact(): Promise<Contact[]> {
  return fetchFromPocketBase<Contact>('contact/records');
}

/**
 * Mengambil data about berdasarkan section
 * @param section - Section dari about (story, vision, mission, values)
 * @returns Promise dengan data about sesuai section
 */
export async function getAboutSection(section: string): Promise<About[]> {
  return fetchFromPocketBase<About>(`about/records?filter=section='${section}'&sort=order`);
}

/**
 * Mengambil semua data about dari PocketBase
 * @returns Promise dengan semua data about di-sort berdasarkan section dan order
 */
export async function getAllAbout(): Promise<About[]> {
  return fetchFromPocketBase<About>('about/records?sort=section,order');
}
