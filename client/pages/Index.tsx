/**
 * Halaman Beranda (Homepage) - RYFIFA Gas Medic
 * 
 * PERHATIAN UNTUK TIM FRONTEND:
 * ========================
 * 
 * File ini menggunakan pattern "Frontend Fetch Data dari PocketBase" menggantikan hardcoded data.
 * 
 * YANG SUDAH DI-REFACTOR:
 * ====================
 * 1. Benefits Section -> Data dari collection `benefits` di PocketBase
 * 2. Partners Section -> Data dari collection `partners` di PocketBase  
 * 3. Hero Section -> Data dari collection `hero_sections` untuk subtitle dan CTA buttons
 * 4. Settings Data -> company_name, whatsapp, email, dll dari collection `settings`
 * 5. Contact Data -> Location address dari collection `contact`
 * 
 * YANG MASIH HARDCODE (Khusus untuk Design Gradient):
 * =================================================
 * - Hero Title "Solusi Oksigen Medis Terbaik" menggunakan inline gradient
 * - Alasan: Design gradient tidak bisa di-render dari database, harus menggunakan CSS classes
 * - Solution: Static HTML dengan CSS gradient classes agar visual consistency dengan Netlify
 * 
 * CARA MENGGUNAKAN PATTERN INI DI HALAMAN LAIN:
 * =========================================
 * 
 * 1. Import hooks yang dibutuhkan:
 *    ```tsx
 *    import { useBenefits, usePartners, useHeroSection, useSettings, useContact, useProducts } from "@/hooks/use-pocketbase";
 *    ```
 * 
 * 2. Ambil data dengan custom hooks:
 *    ```tsx
 *    const { data: benefits, isLoading, error } = useBenefits();
 *    const benefitsData = benefits && Array.isArray(benefits) && benefits.length > 0 ? benefits : fallbackBenefits;
 *    ```
 * 
 * 3. Render data dengan fallback:
 *    ```tsx
 *    {benefitsData.map((benefit) => (
 *      <div key={benefit.id}>
 *        <h3>{benefit.title}</h3>
 *        <p>{benefit.description}</p>
 *      </div>
 *    ))}
 *    ```
 * 
 * STRUCTURE POCKETBASE:
 * ===================
 * 
 * - hero_sections: field, title, subtitle, CTA buttons
 * - benefits: icon_name, title, description, order
 * - partners: name, logo_url, website_url, order  
 * - settings: company_name, whatsapp_number, email, map_url
 * - contact: whatsapp_number, email, address, phone
 * - products: capacity, price, height, diameter, weight, image_url, description
 * - about: section, title, content, order
 * 
 * KEUNTUNGAN APPROACH INI:
 * ======================
 * - Content management di PocketBase admin panel
 * - Real-time updates tanpa deploy
 * - Fallback data untuk error handling
 * - Performance dengan React Query caching
 * - Type safety dengan TypeScript interfaces
 * 
 * Jika ada pertanyaan, lihat dokumentasi lengkap di: client/POCKETBASE_GUIDE.md
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useBenefits, usePartners, useHeroSection, useSettings, useContact } from "@/hooks/use-pocketbase";
import { Benefit as PocketBaseBenefit, Partner as PocketBasePartner, Settings } from "@/lib/pocketbase";
import { Loader2, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

/**
 * Mapping icon name dari PocketBase ke icon file di public folder
 * Ini digunakan untuk mengubah string dari database menjadi path icon yang tepat
 */
const iconMap: Record<string, string> = {
  Award: "/Icon=Best.png",
  Package: "/Icon=Flexible.png",
  Truck: "/Icon=Delivery.png",
  Wrench: "/Icon=Maintenance.png",
  DollarSign: "/Icon=Price.png",
  Clock: "/Icon=CS.png", // Fallback untuk Clock
};

/**
 * Komponen untuk menampilkan loading state
 * Digunakan saat data dari PocketBase masih dimuat
 */
function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <Loader2 className="w-8 h-8 animate-spin text-primary-blue-500" />
      <p className="mt-4 text-neutral-dark font-nunito">Memuat data...</p>
    </div>
  );
}

/**
 * Komponen untuk menampilkan error state
 * Digunakan jika gagal mengambil data dari PocketBase
 */
function ErrorState({ message }: { message: string }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-4">
      <p className="text-red-800 font-nunito">Error: {message}</p>
    </div>
  );
}

// Data fallback jika PocketBase tidak dapat diakses
const fallbackBenefits = [
  {
    id: "1",
    icon_name: "Award", 
    title: "Kualitas Terjamin",
    description: "Oksigen murni dengan standar medis nasional untuk keamanan dan keandalan tinggi",
    display_order: 1,
    is_active: true,
  },
  {
    id: "2",
    icon_name: "Package",
    title: "Penyewaan Fleksibel",
    description: "Nikmati kemudahan untuk menyewa sesuai kebutuhan dan anggaran Anda",
    display_order: 2,
    is_active: true,
  },
  {
    id: "3",
    icon_name: "Truck",
    title: "Antar-Jemput Cepat",
    description: "Kami menyediakan layanan pengantaran dan pengambilan tabung langsung ke lokasi Anda",
    display_order: 3,
    is_active: true,
  },
];

const fallbackPartners = [
  {
    id: "1",
    name: "Samator",
    logo_url: "https://api.builder.io/api/v1/image/assets/TEMP/93d81e4c45a2d3b118facb34e78f62dda3426dd5?width=650",
    website_url: "https://samatorgas.com/id/produk-layanan/produk-gas/gas-medis",
    order: 1,
  },
  {
    id: "2",
    name: "Surya Gas Group",
    logo_url: "https://api.builder.io/api/v1/image/assets/TEMP/53f9d04cd687f1af19827e68ace86610dcfbbeec?width=650",
    website_url: "https://www.suryagasindustri.com/home.html",
    order: 2,
  },
  {
    id: "3",
    name: "RSUD dr Rehatta",
    logo_url: "https://via.placeholder.com/325x150/418BB4/FFFFFF?text=RSUD+dr+Rehatta",
    website_url: "https://rsrehatta.jatengprov.go.id/",
    order: 3,
  },
];

const fallbackSettings = {
  id: "fallback",
  company_name: "RYFIFA Gas Medic",
  tagline: "Solusi Oksigen Medis Terbaik",
  whatsapp_number: "6281234567890",
  email: "info@ryfifagasmedic.com",
  facebook_url: "https://facebook.com",
  logo_url: "",
  favicon_url: "",
  meta_title: "RYFIFA Gas Medic",
  meta_description: "Solusi Oksigen Medis Terbaik",
  map_url: "https://api.builder.io/api/v1/image/assets/TEMP/0f11fb8529021e77b1a64edf21e87e989389761f?width=2560",
  hero_image_url: "https://api.builder.io/api/v1/image/assets/TEMP/c0f7fe625f770739cb8ee0b97eb86d30f4883e9e?width=1010",
};

const fallbackHeroSection = {
  id: "fallback",
  field: "home" as const,
  title: "Solusi Oksigen Medis Terbaik",
  subtitle: "Di setiap tetes udara yang kami suplai, terdapat komitmen untuk menjaga kehidupan. Kami memastikan setiap produk dikirim dengan aman, berkualitas, dan siap memenuhi kebutuhan medis Anda kapan pun diperlukan.",
  primary_cta_text: "Pesan Sekarang",
  primary_cta_url: "",
  secondary_cta_text: "Lihat Produk",
  secondary_cta_url: "/produk",
  background_type: "gradient" as const,
  background_image_url: "",
  is_active: true,
};

export default function Index() {
  // State untuk mengontrol visibility popup map
  const [showMapPopup, setShowMapPopup] = useState(false);

  // Mengambil data dari PocketBase menggunakan custom hooks
  const { data: benefits, isLoading: benefitsLoading, error: benefitsError } = useBenefits();
  const { data: partners, isLoading: partnersLoading, error: partnersError } = usePartners();
  const { data: heroSection, isLoading: heroLoading, error: heroError } = useHeroSection('home');
  const { data: settings, isLoading: settingsLoading, error: settingsError } = useSettings();
  const { data: contact, isLoading: contactLoading, error: contactError } = useContact();

  

  // Gunakan data dari PocketBase jika ada, gunakan fallback jika error atau tidak ada data
  const benefitsData = benefits && Array.isArray(benefits) && benefits.length > 0 ? benefits : fallbackBenefits;
  
  // Validasi partners: pastikan website_url valid dan external, jika tidak gunakan fallback
  const validPartners = partners && Array.isArray(partners) && partners.length > 0 
    ? partners.filter(p => {
        const url = p.website_url?.trim() || '';
        const isValid = url !== '' && (url.startsWith('http://') || url.startsWith('https://'));
        if (!isValid) {
          console.warn('Invalid partner URL, will use fallback:', p.name, 'URL:', url);
        }
        return isValid;
      })
    : [];
  const partnersData = validPartners.length > 0 ? validPartners : fallbackPartners;
  
  // Debug: log data yang digunakan
  console.log('Partners data being used:', partnersData.map(p => ({ name: p.name, url: p.website_url })));
  const settingsData = settings && Array.isArray(settings) && settings.length > 0 ? settings[0] : fallbackSettings;
  const heroData = heroSection && Array.isArray(heroSection) && heroSection.length > 0 ? heroSection[0] : fallbackHeroSection;
  const contactData = contact && Array.isArray(contact) && contact.length > 0 ? contact[0] : null;

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-[84px]">
        <section className="relative bg-gradient-to-br from-primary-blue-900 via-primary-blue-800 to-primary-blue-700 min-h-[600px] md:min-h-[800px] lg:min-h-[900px] flex items-center overflow-hidden">
          {/* Background Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-blue-800/100 via-primary-blue-800/95 to-primary-blue-800/80" />
          
          {/* Decorative gradient circle - lebih ke kanan dan tidak overlap */}
          <div className="absolute right-0 top-0 w-[500px] sm:w-[700px] lg:w-[900px] h-[500px] sm:h-[700px] lg:h-[900px] -translate-y-1/4 translate-x-1/4 opacity-30">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-blue-500 via-primary-blue-400 to-primary-blue-600 blur-3xl" />
          </div>

          {/* Content Container with Grid Layout */}
          <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 py-12 sm:py-16 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
              {/* Left Column - Text Content */}
              <div className="space-y-6 sm:space-y-8 lg:pr-4 xl:pr-8 order-2 lg:order-1">
                {/* Hero Section - Jika ada error, tampilkan fallback hardcoded */}
                {heroError ? (
                  <ErrorState message={heroError.message} />
                ) : heroLoading ? (
                  <LoadingState />
                ) : (
                  <div className="space-y-4 sm:space-y-5">
                    <h1 className="font-jakarta font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight sm:leading-[1.1]">
                      <span className="text-neutral-white">Solusi </span>
                      <span className="bg-gradient-to-r from-primary-blue-300 to-primary-blue-100 bg-clip-text text-transparent">Oksigen</span>
                      <span className="text-neutral-white"> Medis </span>
                      <span className="bg-gradient-to-r from-primary-blue-300 to-primary-blue-100 bg-clip-text text-transparent">Terbaik</span>
                    </h1>
                    <p className="text-neutral-white/95 font-nunito text-base sm:text-lg lg:text-xl leading-relaxed sm:leading-8 max-w-full">
                      <span>{heroData?.subtitle ? heroData.subtitle : 'Di setiap tetes udara yang kami suplai, terdapat komitmen untuk menjaga kehidupan. Kami memastikan setiap produk dikirim dengan aman, berkualitas, dan siap memenuhi kebutuhan medis Anda kapan pun diperlukan.'}</span>
                    </p>
                  </div>
                )}

                {/* Call to Action Buttons - Menggunakan WhatsApp link */}
                <div className="flex flex-wrap gap-4 sm:gap-6">
                  <a
                    href="https://wa.link/dxfoj1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-gradient-primary text-neutral-white font-jakarta font-bold text-base sm:text-lg leading-[26px] shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                  >
                    {heroData?.primary_cta_text || 'Pesan Sekarang'}
                    <svg className="w-4 h-4" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.6683 2.32804C12.9311 1.58732 12.0531 1.00001 11.0854 0.600331C10.1178 0.200649 9.07987 -0.00341053 8.03216 4.3116e-05C3.64221 4.3116e-05 0.0643217 3.56003 0.0643217 7.92802C0.0643217 9.32802 0.434171 10.688 1.12563 11.888L0 16L4.22111 14.896C5.38693 15.528 6.69749 15.864 8.03216 15.864C12.4221 15.864 16 12.304 16 7.93602C16 5.81603 15.1719 3.82403 13.6683 2.32804ZM8.03216 14.52C6.84221 14.52 5.67638 14.2 4.65528 13.6L4.41407 13.456L1.90553 14.112L2.57286 11.68L2.41206 11.432C1.75079 10.3817 1.39974 9.16744 1.39899 7.92802C1.39899 4.29603 4.37387 1.33604 8.02412 1.33604C9.79296 1.33604 11.4573 2.02404 12.7035 3.27203C13.3207 3.88312 13.8098 4.61007 14.1424 5.41069C14.475 6.21132 14.6446 7.06969 14.6412 7.93602C14.6573 11.568 11.6824 14.52 8.03216 14.52ZM11.6663 9.59202C11.4653 9.49602 10.4844 9.01602 10.3075 8.94402C10.1226 8.88002 9.99397 8.84802 9.85729 9.04002C9.7206 9.24002 9.34271 9.68802 9.23015 9.81602C9.11759 9.95202 8.99698 9.96802 8.79598 9.86402C8.59497 9.76802 7.95176 9.55202 7.19598 8.88002C6.601 8.35202 6.20703 7.70402 6.08643 7.50402C5.97387 7.30402 6.07035 7.20002 6.17487 7.09602C6.26332 7.00802 6.37588 6.86402 6.47236 6.75203C6.56884 6.64003 6.60904 6.55203 6.67337 6.42403C6.73769 6.28803 6.70553 6.17603 6.65729 6.08003C6.60904 5.98403 6.20703 5.00803 6.04623 4.60803C5.88543 4.22403 5.71658 4.27203 5.59598 4.26403H5.21005C5.07337 4.26403 4.86432 4.31203 4.6794 4.51203C4.50251 4.71203 3.98794 5.19203 3.98794 6.16803C3.98794 7.14402 4.70352 8.08802 4.8 8.21602C4.89648 8.35202 6.20703 10.352 8.201 11.208C8.67538 11.416 9.04523 11.536 9.33467 11.624C9.80904 11.776 10.2432 11.752 10.5889 11.704C10.9749 11.648 11.7709 11.224 11.9317 10.76C12.1005 10.296 12.1005 9.90402 12.0442 9.81602C11.9879 9.72802 11.8673 9.68802 11.6663 9.59202Z" fill="white"/>
                    </svg>
                  </a>

                  <Link
                    to={heroData?.secondary_cta_url || '/produk'}
                    className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-lg border-2 border-neutral-white/40 bg-transparent hover:bg-neutral-white/10 text-neutral-white font-jakarta font-bold text-base sm:text-lg leading-[26px] transition-all"
                  >
                    {heroData?.secondary_cta_text || 'Lihat Produk'}
                  </Link>
                </div>
              </div>

              {/* Right Column - Image */}
              <div className="relative flex items-center justify-center h-full min-h-[400px] lg:min-h-[600px] order-1 lg:order-2">
                <div className="relative w-full max-w-[400px] lg:max-w-[600px] h-[400px] lg:h-[600px] flex items-center justify-center">
                  {/* Decorative blur effect behind image */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-blue-400/30 to-primary-blue-600/30 blur-3xl" />
                  
                  {/* Image */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <img
                      src={heroData?.background_image_url || settingsData?.hero_image_url || "https://api.builder.io/api/v1/image/assets/TEMP/c0f7fe625f770739cb8ee0b97eb86d30f4883e9e?width=1010"}
                      alt="Oxygen cylinders"
                      className="w-full h-full max-w-[350px] lg:max-w-[500px] max-h-[400px] lg:max-h-[600px] object-contain drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Gradient Transition */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-primary-blue-50/30 to-primary-blue-50" />
        </section>

        <section className="bg-gradient-to-b from-primary-blue-50 via-primary-blue-50 to-primary-blue-100 py-12 sm:py-20 lg:py-28 relative overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 relative z-10">
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <h2 className="font-jakarta font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight sm:leading-[60px]">
                <span className="text-neutral-black">Mengapa Memilih Produk </span>
                <span className="bg-gradient-primary bg-clip-text text-transparent">{settingsData?.company_name || 'RYFIFA Gas Medic'}</span>
                <span className="text-neutral-black">?</span>
              </h2>
            </div>

            {/* Benefits Section - Menggunakan data dari PocketBase atau fallback */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-[1280px] mx-auto">
                {benefitsData && Array.isArray(benefitsData) && benefitsData.map((benefit: PocketBaseBenefit) => {
                  return (
                    <div
                      key={benefit.id}
                      className="group bg-white rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col items-center gap-4 sm:gap-5 text-center transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-2 hover:bg-neutral-black cursor-pointer"
                    >
                      <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
                        {iconMap[benefit.icon_name] ? (
                          <img
                            src={iconMap[benefit.icon_name]}
                            alt={benefit.icon_name}
                            className="w-12 h-12 sm:w-16 sm:h-16 object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                          />
                        ) : (
                          <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-[#418BB4] font-jakarta font-bold text-lg transition-colors duration-300 group-hover:text-neutral-white">
                            {benefit.icon_name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="space-y-3 sm:space-y-4">
                        <h3 className="font-jakarta font-bold text-xl sm:text-2xl lg:text-[28px] leading-tight sm:leading-[38px] text-neutral-black transition-colors duration-300 group-hover:text-neutral-white">
                          {benefit.title}
                        </h3>
                        <p className="font-nunito text-base sm:text-lg lg:text-xl leading-relaxed sm:leading-8 text-neutral-dark transition-colors duration-300 group-hover:text-neutral-white">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
          </div>
          
          {/* Smooth transition to next section */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-primary-blue-100/80 to-primary-blue-200 pointer-events-none" />
        </section>

        <section className="bg-gradient-to-b from-primary-blue-200 via-primary-blue-400 via-primary-blue-600 via-primary-blue-700 via-primary-blue-800 via-primary-blue-800 via-primary-blue-800 via-primary-blue-800 via-primary-blue-700 via-primary-blue-600 via-primary-blue-500 via-primary-blue-400 to-primary-blue-300 py-12 sm:py-20 lg:py-28 relative overflow-hidden">

          <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <h2 className="font-jakarta font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight sm:leading-[60px] text-neutral-white mb-4 sm:mb-5">
                Mitra Terpercaya Kami
              </h2>
              <p className="font-nunito text-base sm:text-lg lg:text-xl leading-relaxed sm:leading-8 text-neutral-light">
                Kepercayaan mereka menjadi bukti komitmen {settingsData?.company_name || 'RYFIFA Gas Medic'} menghadirkan layanan terbaik
              </p>
            </div>

            {/* Partners Section - Menggunakan data dari PocketBase atau fallback */}
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 max-w-[1280px] mx-auto">
              {partnersData && Array.isArray(partnersData) && partnersData.map((partner: PocketBasePartner) => {
                // Pastikan URL selalu valid dan external
                const getValidUrl = (url: string | undefined): string => {
                  if (!url || url.trim() === '') {
                    console.warn('Empty URL for partner:', partner.name);
                    return '';
                  }
                  // Jika sudah memiliki protocol, return langsung
                  if (url.startsWith('http://') || url.startsWith('https://')) {
                    return url;
                  }
                  // Jika tidak ada protocol, tambahkan https://
                  return `https://${url}`;
                };

                const partnerUrl = getValidUrl(partner.website_url);
                const isExternalLink = partnerUrl !== '' && partnerUrl.startsWith('http');


                // Jika tidak ada URL valid, jangan render sebagai link
                if (!isExternalLink) {
                  return (
                    <div
                      key={partner.id}
                      className="group bg-white rounded-2xl sm:rounded-[30px] p-6 sm:p-8 lg:p-10 shadow-[0_8px_16px_0_rgba(35,35,35,0.5)] transition-all duration-300 hover:shadow-2xl hover:scale-110 hover:-translate-y-2 hover:bg-neutral-black cursor-not-allowed"
                    >
                      <img
                        src={partner.logo_url}
                        alt={partner.name}
                        className="w-[200px] sm:w-[250px] lg:w-[325px] h-auto object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert opacity-50"
                      />
                    </div>
                  );
                }

                // Gunakan tag <a> dengan href langsung untuk memastikan link bekerja
                return (
                  <a
                    key={partner.id}
                    href={partnerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      // Pastikan link benar-benar external dan tidak di-intercept
                      if (!partnerUrl || !partnerUrl.startsWith('http')) {
                        e.preventDefault();
                        return;
                      }
                      // Biarkan browser menangani link secara default
                      // Tidak perlu preventDefault untuk link external
                    }}
                    className="group bg-white rounded-2xl sm:rounded-[30px] p-6 sm:p-8 lg:p-10 shadow-[0_8px_16px_0_rgba(35,35,35,0.5)] transition-all duration-300 hover:shadow-2xl hover:scale-110 hover:-translate-y-2 hover:bg-neutral-black cursor-pointer no-underline"
                  >
                    <img
                      src={partner.logo_url}
                      alt={partner.name}
                      className="w-[200px] sm:w-[250px] lg:w-[325px] h-auto object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                    />
                  </a>
                );
              })}
            </div>
          </div>

        </section>

        <section className="bg-gradient-to-b from-primary-blue-300 via-primary-blue-200 via-primary-blue-100 via-primary-blue-50 to-white py-12 sm:py-20 lg:py-28 relative overflow-hidden">

          <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <h2 className="font-jakarta font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight sm:leading-[60px] text-neutral-black mb-4 sm:mb-5">
                Temukan Kami di Peta
              </h2>
              <p className="font-nunito text-base sm:text-lg lg:text-xl leading-relaxed sm:leading-8 text-neutral-dark">
                Temukan lokasi kami di peta dan kunjungi kami untuk layanan oksigen medis terbaik
              </p>
            </div>

            <div className="max-w-[1280px] mx-auto">
              <div 
                className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[704px] rounded-2xl overflow-hidden"
              >
                {/* Clickable overlay untuk map */}
                <div
                  className="absolute inset-0 cursor-pointer z-10 bg-transparent"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowMapPopup(true);
                  }}
                  style={{ 
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'transparent'
                  }}
                />
                <img
                  src={settingsData?.map_url || "https://api.builder.io/api/v1/image/assets/TEMP/0f11fb8529021e77b1a64edf21e87e989389761f?width=2560"}
                  alt="Lokasi {settingsData?.company_name || 'RYFIFA Gas Medic'}"
                  className="w-full h-full object-cover pointer-events-none"
                />
                {/* Map Pin Marker */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-12 h-16 text-red-600" viewBox="0 0 45 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.5 30.4C20.3688 30.4 18.3249 29.5571 16.8179 28.0569C15.3109 26.5566 14.4643 24.5217 14.4643 22.4C14.4643 20.2783 15.3109 18.2434 16.8179 16.7431C18.3249 15.2429 20.3688 14.4 22.5 14.4C24.6312 14.4 26.6751 15.2429 28.1821 16.7431C29.6891 18.2434 30.5357 20.2783 30.5357 22.4C30.5357 23.4506 30.3279 24.4909 29.924 25.4615C29.5202 26.4321 28.9283 27.314 28.1821 28.0569C27.4359 28.7997 26.5501 29.389 25.5751 29.791C24.6002 30.1931 23.5553 30.4 22.5 30.4ZM22.5 0C16.5326 0 10.8097 2.35999 6.5901 6.56081C2.37053 10.7616 0 16.4592 0 22.4C0 39.2 22.5 64 22.5 64C22.5 64 45 39.2 45 22.4C45 16.4592 42.6295 10.7616 38.4099 6.56081C34.1903 2.35999 28.4674 0 22.5 0Z"/>
                  </svg>
                </div>
                
                {/* Overlay backdrop - Muncul saat popup aktif */}
                {showMapPopup && (
                  <div 
                    className="absolute inset-0 bg-black/20 z-40"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowMapPopup(false);
                    }}
                  />
                )}
                
                {/* Popup Box - Muncul saat map diklik */}
                {showMapPopup && (
                  <div 
                    className="absolute top-[calc(50%-120px)] left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-4 sm:p-5 max-w-[280px] sm:max-w-[320px] z-50"
                    onClick={(e) => {
                      // Hanya stop propagation, jangan prevent default
                      e.stopPropagation();
                    }}
                    style={{
                      display: 'block',
                    }}
                  >
                    {/* Close button */}
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-jakarta font-bold text-base sm:text-lg text-neutral-black pr-2">
                        {settingsData?.company_name || 'RYFIFA Gas Medic'}
                      </h3>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setShowMapPopup(false);
                        }}
                        className="flex-shrink-0 w-6 h-6 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-colors"
                        aria-label="Tutup popup"
                      >
                        <X className="w-4 h-4 text-neutral-600" />
                      </button>
                    </div>
                    <p className="font-nunito text-xs sm:text-sm text-neutral-dark leading-relaxed mb-3">
                      GW22+9MJ, Krajan, Kelet, Kec. Keling, Kabupaten Jepara, Jawa Tengah 59454
                    </p>
                    <a
                      href="https://maps.app.goo.gl/M4XhQCZjxfMe8LUQ9"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        // Biarkan link bekerja secara normal
                        e.stopPropagation();
                        // Tidak perlu preventDefault untuk link external
                      }}
                      className="flex items-center gap-2 text-primary-blue-600 font-nunito font-semibold text-xs sm:text-sm hover:text-primary-blue-700 transition-colors cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      <span>Buka di Google Maps</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent via-primary-blue-800/40 to-primary-blue-800" />
        </section>
      </main>

      <Footer />
    </div>
  );
}
