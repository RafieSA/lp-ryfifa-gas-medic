import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Award, Clock, Package, Wrench, DollarSign, HeadphonesIcon, Truck } from "lucide-react";

const benefits = [
  {
    icon: Award,
    title: "Kualitas Terjamin",
    description: "Oksigen murni dengan standar medis nasional untuk keamanan dan keandalan tinggi",
  },
  {
    icon: Package,
    title: "Penyewaan Fleksibel",
    description: "Nikmati kemudahan untuk menyewa sesuai kebutuhan dan anggaran Anda",
  },
  {
    icon: Truck,
    title: "Antar-Jemput Cepat",
    description: "Kami menyediakan layanan pengantaran dan pengambilan tabung langsung ke lokasi Anda",
  },
  {
    icon: Wrench,
    title: "Isi Ulang Mudah",
    description: "Nikmati layanan isi ulang dan perawatan rutin dengan mudah, cepat, dan tanpa repot",
  },
  {
    icon: DollarSign,
    title: "Harga Transparan",
    description: "Harga bersaing tanpa biaya tersembunyi, transparan, jujur, dan ramah di kantong",
  },
  {
    icon: Clock,
    title: "Layanan 24 Jam",
    description: "Bantuan cepat dan ramah 24 jam setiap waktu, karena kenyamanan Anda adalah prioritas kami",
  },
];

const partners = [
  {
    name: "Samator",
    logo: "https://api.builder.io/api/v1/image/assets/TEMP/93d81e4c45a2d3b118facb34e78f62dda3426dd5?width=650",
  },
  {
    name: "Surya Gas",
    logo: "https://api.builder.io/api/v1/image/assets/TEMP/53f9d04cd687f1af19827e68ace86610dcfbbeec?width=650",
  },
  {
    name: "RSUD dr Rehatta",
    logo: "https://api.builder.io/api/v1/image/assets/TEMP/8ec0ca5e25cd9d3a06c212c7ac35b3470c81b7e8?width=650",
  },
];

export default function Index() {
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
                <div className="space-y-4 sm:space-y-5">
                  <h1 className="font-jakarta font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight sm:leading-[1.1]">
                    <span className="text-neutral-white">Solusi </span>
                    <span className="bg-gradient-to-r from-primary-blue-300 to-primary-blue-100 bg-clip-text text-transparent">Oksigen</span>
                    <span className="text-neutral-white"> Medis </span>
                    <span className="bg-gradient-to-r from-primary-blue-300 to-primary-blue-100 bg-clip-text text-transparent">Terbaik</span>
                  </h1>
                  <p className="text-neutral-white/95 font-nunito text-base sm:text-lg lg:text-xl leading-relaxed sm:leading-8 max-w-full">
                    <span className="font-normal">Di setiap tetes udara yang kami suplai, terdapat komitmen untuk menjaga kehidupan. </span>
                    <span className="font-bold">RYFIFA GAS MEDIC</span>
                    <span className="font-normal"> memastikan setiap produk dikirim dengan aman, berkualitas, dan siap memenuhi kebutuhan medis Anda kapan pun diperlukan.</span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 sm:gap-6">
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-gradient-primary text-neutral-white font-jakarta font-bold text-base sm:text-lg leading-[26px] shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                  >
                    Pesan Sekarang
                    <svg className="w-4 h-4" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.6683 2.32804C12.9311 1.58732 12.0531 1.00001 11.0854 0.600331C10.1178 0.200649 9.07987 -0.00341053 8.03216 4.3116e-05C3.64221 4.3116e-05 0.0643217 3.56003 0.0643217 7.92802C0.0643217 9.32802 0.434171 10.688 1.12563 11.888L0 16L4.22111 14.896C5.38693 15.528 6.69749 15.864 8.03216 15.864C12.4221 15.864 16 12.304 16 7.93602C16 5.81603 15.1719 3.82403 13.6683 2.32804ZM8.03216 14.52C6.84221 14.52 5.67638 14.2 4.65528 13.6L4.41407 13.456L1.90553 14.112L2.57286 11.68L2.41206 11.432C1.75079 10.3817 1.39974 9.16744 1.39899 7.92802C1.39899 4.29603 4.37387 1.33604 8.02412 1.33604C9.79296 1.33604 11.4573 2.02404 12.7035 3.27203C13.3207 3.88312 13.8098 4.61007 14.1424 5.41069C14.475 6.21132 14.6446 7.06969 14.6412 7.93602C14.6573 11.568 11.6824 14.52 8.03216 14.52ZM11.6663 9.59202C11.4653 9.49602 10.4844 9.01602 10.3075 8.94402C10.1226 8.88002 9.99397 8.84802 9.85729 9.04002C9.7206 9.24002 9.34271 9.68802 9.23015 9.81602C9.11759 9.95202 8.99698 9.96802 8.79598 9.86402C8.59497 9.76802 7.95176 9.55202 7.19598 8.88002C6.601 8.35202 6.20703 7.70402 6.08643 7.50402C5.97387 7.30402 6.07035 7.20002 6.17487 7.09602C6.26332 7.00802 6.37588 6.86402 6.47236 6.75203C6.56884 6.64003 6.60904 6.55203 6.67337 6.42403C6.73769 6.28803 6.70553 6.17603 6.65729 6.08003C6.60904 5.98403 6.20703 5.00803 6.04623 4.60803C5.88543 4.22403 5.71658 4.27203 5.59598 4.26403H5.21005C5.07337 4.26403 4.86432 4.31203 4.6794 4.51203C4.50251 4.71203 3.98794 5.19203 3.98794 6.16803C3.98794 7.14402 4.70352 8.08802 4.8 8.21602C4.89648 8.35202 6.20703 10.352 8.201 11.208C8.67538 11.416 9.04523 11.536 9.33467 11.624C9.80904 11.776 10.2432 11.752 10.5889 11.704C10.9749 11.648 11.7709 11.224 11.9317 10.76C12.1005 10.296 12.1005 9.90402 12.0442 9.81602C11.9879 9.72802 11.8673 9.68802 11.6663 9.59202Z" fill="white"/>
                    </svg>
                  </a>

                  <a
                    href="/produk"
                    className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-lg border-2 border-neutral-white/40 bg-transparent hover:bg-neutral-white/10 text-neutral-white font-jakarta font-bold text-base sm:text-lg leading-[26px] transition-all"
                  >
                    Lihat Produk
                  </a>
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
                      src="https://api.builder.io/api/v1/image/assets/TEMP/c0f7fe625f770739cb8ee0b97eb86d30f4883e9e?width=1010"
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
                <span className="text-neutral-black">Mengapa Memilih Tabung Oksigen  </span>
                <span className="bg-gradient-primary bg-clip-text text-transparent">RYFIFA Gas Medic</span>
                <span className="text-neutral-black">?</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-[1280px] mx-auto">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col items-center gap-4 sm:gap-5 text-center"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
                    <benefit.icon className="w-12 h-12 sm:w-16 sm:h-16 text-[#418BB4]" strokeWidth={1.5} />
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="font-jakarta font-bold text-xl sm:text-2xl lg:text-[28px] leading-tight sm:leading-[38px] text-neutral-black">
                      {benefit.title}
                    </h3>
                    <p className="font-nunito text-base sm:text-lg lg:text-xl leading-relaxed sm:leading-8 text-neutral-dark">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
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
                Kepercayaan mereka menjadi bukti komitmen kami menghadirkan layanan oksigen medis terbaik
              </p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 max-w-[1280px] mx-auto">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl sm:rounded-[30px] p-6 sm:p-8 lg:p-10 shadow-[0_8px_16px_0_rgba(35,35,35,0.5)]"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-[200px] sm:w-[250px] lg:w-[325px] h-auto object-contain"
                  />
                </div>
              ))}
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
              <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[704px] rounded-2xl overflow-hidden">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/0f11fb8529021e77b1a64edf21e87e989389761f?width=2560"
                  alt="Map location"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <svg className="w-12 h-16 text-red-600" viewBox="0 0 45 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.5 30.4C20.3688 30.4 18.3249 29.5571 16.8179 28.0569C15.3109 26.5566 14.4643 24.5217 14.4643 22.4C14.4643 20.2783 15.3109 18.2434 16.8179 16.7431C18.3249 15.2429 20.3688 14.4 22.5 14.4C24.6312 14.4 26.6751 15.2429 28.1821 16.7431C29.6891 18.2434 30.5357 20.2783 30.5357 22.4C30.5357 23.4506 30.3279 24.4909 29.924 25.4615C29.5202 26.4321 28.9283 27.314 28.1821 28.0569C27.4359 28.7997 26.5501 29.389 25.5751 29.791C24.6002 30.1931 23.5553 30.4 22.5 30.4ZM22.5 0C16.5326 0 10.8097 2.35999 6.5901 6.56081C2.37053 10.7616 0 16.4592 0 22.4C0 39.2 22.5 64 22.5 64C22.5 64 45 39.2 45 22.4C45 16.4592 42.6295 10.7616 38.4099 6.56081C34.1903 2.35999 28.4674 0 22.5 0Z"/>
                  </svg>
                </div>
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
