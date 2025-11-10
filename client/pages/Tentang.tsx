import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Tentang() {
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
              <div className="space-y-4 sm:space-y-5 lg:pr-4 xl:pr-8 order-2 lg:order-1">
                <h1 className="font-jakarta font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight sm:leading-[1.1]">
                  <span className="text-neutral-white">Mengalirkan </span>
                  <span className="bg-gradient-to-r from-primary-blue-300 to-primary-blue-100 bg-clip-text text-transparent">Oksigen</span>
                  <span className="text-neutral-white">, Menyalakan </span>
                  <span className="bg-gradient-to-r from-primary-blue-300 to-primary-blue-100 bg-clip-text text-transparent">Harapan</span>
                </h1>
                <p className="text-neutral-white/95 font-nunito text-base sm:text-lg lg:text-xl leading-relaxed sm:leading-8">
                  Setiap tetes oksigen membawa arti kehidupan.
                </p>
              </div>

              {/* Right Column - Logo Image */}
              <div className="relative flex items-center justify-center h-full min-h-[350px] lg:min-h-[600px] order-1 lg:order-2">
                <div className="relative w-full max-w-[350px] lg:max-w-[500px] h-[350px] lg:h-[500px] flex items-center justify-center">
                  {/* Decorative blur effect behind logo */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-blue-400/30 to-primary-blue-600/30 blur-3xl" />
                  
                  {/* Logo Container */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <div className="relative w-full max-w-[300px] lg:max-w-[405px] h-[300px] lg:h-[405px] rounded-full overflow-hidden border-4 border-white/30 shadow-2xl bg-white/5 backdrop-blur-sm">
                      <img
                        src="https://api.builder.io/api/v1/image/assets/TEMP/10effeabf3224343eb720febc0b83622b488def1?width=810"
                        alt="RYFIFA Gas Medic Logo"
                        className="w-full h-full object-cover"
                      />
                    </div>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
              <div className="space-y-5 lg:max-w-[624px]">
                <h2 className="font-jakarta font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight sm:leading-[60px] bg-gradient-primary bg-clip-text text-transparent">
                  Tentang Kami
                </h2>
                <p className="text-neutral-black font-nunito text-base sm:text-lg lg:text-xl leading-relaxed sm:leading-8 text-justify">
                  <span className="font-normal">Berdiri sejak 2006, </span>
                  <span className="font-bold bg-gradient-primary bg-clip-text text-transparent">RYFIFA Gas Medic</span>
                  <span className="font-normal"> hadir untuk menjawab kebutuhan pasokan gas medis rumah sakit, klinik, dan masyarakat umum dengan sistem distribusi yang efisien dan layanan pelanggan 24 jam.</span>
                </p>
              </div>

              <div className="flex gap-4 lg:gap-6">
                <div 
                  className="flex-1 h-[200px] sm:h-[250px] lg:h-[268px] rounded-2xl overflow-hidden"
                  style={{
                    border: '4px solid transparent',
                    background: 'linear-gradient(white, white) padding-box, linear-gradient(100deg, #418BB4 12.34%, #244C63 87.66%) border-box',
                  }}
                >
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/b5cab05859c6a15ab648676550fc2ed0dbc9a39f?width=812"
                    alt="Gas cylinders delivery"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div 
                  className="w-[120px] sm:w-[150px] lg:w-[187px] h-[200px] sm:h-[250px] lg:h-[268px] rounded-2xl overflow-hidden"
                  style={{
                    border: '4px solid transparent',
                    background: 'linear-gradient(white, white) padding-box, linear-gradient(100deg, #418BB4 12.34%, #244C63 87.66%) border-box',
                  }}
                >
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/707b4a3b913b7b7ea1d8113e5b5a85b6913bc92e?width=374"
                    alt="Medical gas facility"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <div 
                className="w-full h-[300px] sm:h-[400px] lg:h-[536px] rounded-2xl overflow-hidden bg-neutral-dark/10"
                style={{
                  border: '4px solid transparent',
                  background: 'linear-gradient(#ECF3F8, #ECF3F8) padding-box, linear-gradient(100deg, #418BB4 12.34%, #244C63 87.66%) border-box',
                }}
              >
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/b5cab05859c6a15ab648676550fc2ed0dbc9a39f?width=812"
                  alt="Company operations"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-8 lg:space-y-12 lg:max-w-[733px]">
                <div className="space-y-5">
                  <h2 className="font-jakarta font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight sm:leading-[60px] bg-gradient-primary bg-clip-text text-transparent">
                    Visi Kami
                  </h2>
                  <p className="text-neutral-black font-nunito text-base sm:text-lg lg:text-xl leading-relaxed sm:leading-8 text-justify">
                    Menjadi penyedia gas medis terpercaya dan inovatif di wilayah Jepara dan sekitarnya.
                  </p>
                </div>

                <div className="space-y-5">
                  <h2 className="font-jakarta font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight sm:leading-[60px] bg-gradient-primary bg-clip-text text-transparent">
                    Misi Kami
                  </h2>
                  <div className="text-neutral-black font-nunito text-base sm:text-lg lg:text-xl leading-relaxed sm:leading-8 text-justify space-y-2">
                    <p>1. Memberikan layanan antar cepat dan aman</p>
                    <p>2. Menjamin kualitas dan keamanan tabung medis</p>
                    <p>3. Mendukung keberlangsungan layanan kesehatan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-primary-blue-800/50 to-primary-blue-800" />
        </section>
      </main>

      <Footer />
    </div>
  );
}
