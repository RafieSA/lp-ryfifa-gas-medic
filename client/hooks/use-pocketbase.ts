/**
 * Custom Hooks untuk PocketBase API
 * 
 * FILE INI DIGUNAKAN UNTUK MENGHUBUNGKAN FRONTEND DENGAN POCKETBASE DATABASE
 * 
 * CARA PENGGUNAAN UNTUK TIM FRONTEND:
 * =================================
 * 
 * 1. Import hooks yang dibutuhkan:
 *    ```tsx
 *    import { useBenefits, usePartners, useSettings } from "@/hooks/use-pocketbase";
 *    ```
 * 
 * 2. Gunakan di component:
 *    ```tsx
 *    export default function MyComponent() {
 *      const { data: benefits, isLoading, error } = useBenefits();
 *      
 *      if (isLoading) return <div>Loading...</div>;
 *      if (error) return <div>Error: {error.message}</div>;
 *      
 *      return (
 *        <div>
 *          {benefits?.map(benefit => (
 *            <div key={benefit.id}>
 *              <h3>{benefit.title}</h3>
 *              <p>{benefit.description}</p>
 *            </div>
 *          ))}
 *        </div>
 *      );
 *    }
 *    ```
 * 
 * DAFTAR HOOKS yang TERSEDIA:
 * ===============================
 * 
 * ▪ useSettings() - Mengambil konfigurasi perusahaan (company_name, whatsapp, dll)
 * ▪ useBenefits() - Mengambil data keunggulan layanan (icon, title, description)
 * ▪ usePartners() - Mengambil data mitra perusahaan
 * ▪ useProducts() - Mengambil data produk tabung oksigen
 * ▪ useHeroSection(field) - Mengambil hero section berdasarkan halaman (home/tentang/produk/kontak)
 * ▪ useContact() - Mengambil data kontak (whatsapp, email, address)
 * ▪ useAboutSection(section) - Mengambil data tentang perusahaan sesuai section
 * ▪ useAllAbout() - Mengambil semua data tentang perusahaan
 * 
 * FITUR:
 * ======
 * • Auto-caching 5 menit (React Query)
 * • Loading states otomatis
 * • Error handling otomatis  
 * • Type safety dengan TypeScript
 * • Fetching otomatis saat component mount
 * 
 * URL PocketBase: https://lp-rgm.eastasia.cloudapp.azure.com
 * 
 * Untuk dokumentasi lengkap, lihat: client/POCKETBASE_GUIDE.md
 */

import { useQuery } from '@tanstack/react-query';
import {
  getSettings,
  getBenefits,
  getPartners,
  getProducts,
  getHeroSection,
  getContact,
  getAboutSection,
  getAllAbout,
  Settings,
  Benefit,
  Partner,
  Product,
  HeroSection,
  Contact,
  About
} from '@/lib/pocketbase';

/**
 * Hook untuk mengambil data settings dari PocketBase
 * @returns Query result dengan data settings
 */
export function useSettings() {
  return useQuery<Settings[], Error>({
    queryKey: ['settings'],
    queryFn: getSettings,
    staleTime: 5 * 60 * 1000, // 5 menit
  });
}

/**
 * Hook untuk mengambil data benefits dari PocketBase
 * @returns Query result dengan data benefits yang aktif
 */
export function useBenefits() {
  return useQuery<Benefit[], Error>({
    queryKey: ['benefits'],
    queryFn: getBenefits,
    staleTime: 5 * 60 * 1000, // 5 menit
  });
}

/**
 * Hook untuk mengambil data partners dari PocketBase
 * @returns Query result dengan data partners
 */
export function usePartners() {
  return useQuery<Partner[], Error>({
    queryKey: ['partners'],
    queryFn: getPartners,
    staleTime: 5 * 60 * 1000, // 5 menit
  });
}

/**
 * Hook untuk mengambil data products dari PocketBase
 * @returns Query result dengan data produk yang tersedia
 */
export function useProducts() {
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 5 * 60 * 1000, // 5 menit
  });
}

/**
 * Hook untuk mengambil data hero section berdasarkan field
 * @param field - Field dari hero section (home, tentang, produk, kontak)
 * @returns Query result dengan data hero section yang aktif untuk field tertentu
 */
export function useHeroSection(field: string) {
  return useQuery<HeroSection[], Error>({
    queryKey: ['heroSection', field],
    queryFn: () => getHeroSection(field),
    staleTime: 5 * 60 * 1000, // 5 menit
  });
}

/**
 * Hook untuk mengambil data contact dari PocketBase
 * @returns Query result dengan data contact
 */
export function useContact() {
  return useQuery<Contact[], Error>({
    queryKey: ['contact'],
    queryFn: getContact,
    staleTime: 5 * 60 * 1000, // 5 menit
  });
}

/**
 * Hook untuk mengambil data about berdasarkan section
 * @param section - Section dari about (story, vision, mission, values)
 * @returns Query result dengan data about sesuai section
 */
export function useAboutSection(section: string) {
  return useQuery<About[], Error>({
    queryKey: ['about', section],
    queryFn: () => getAboutSection(section),
    staleTime: 5 * 60 * 1000, // 5 menit
  });
}

/**
 * Hook untuk mengambil semua data about dari PocketBase
 * @returns Query result dengan semua data about
 */
export function useAllAbout() {
  return useQuery<About[], Error>({
    queryKey: ['about-all'],
    queryFn: getAllAbout,
    staleTime: 5 * 60 * 1000, // 5 menit
  });
}
