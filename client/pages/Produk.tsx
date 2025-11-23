import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

interface ProductVariant {
  id: string;
  capacity: string;
  price: number;
  height: string;
  diameter: string;
  weight: string;
  image: string;
}

const products: ProductVariant[] = [
  {
    id: "1",
    capacity: "1m³",
    price: 100000,
    height: "±65 cm",
    diameter: "±14 cm",
    weight: "12 Kg",
    image: "/1m3.png",
  },
  {
    id: "2",
    capacity: "2m³",
    price: 150000,
    height: "±100 cm",
    diameter: "±16 cm",
    weight: "23 Kg",
    image: "/2m3.png",
  },
  {
    id: "3",
    capacity: "6m³",
    price: 300000,
    height: "±150 cm",
    diameter: "±22 cm",
    weight: "56 Kg",
    image: "/6m3.png",
  },
];

const includedItems = [
  "Tabung oksigen",
  "Regulator (pressure gauge + flowmeter)",
  "Selang oksigen",
  "Nasal cannula",
];

export default function Produk() {
  const [selectedVariant, setSelectedVariant] = useState<string>("1");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const currentProduct = products.find((p) => p.id === selectedVariant) || products[0];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleOrder = () => {
    window.open("https://wa.link/dxfoj1", "_blank");
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % 3);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + 3) % 3);
  };

  return (
    <div className="min-h-screen bg-primary-blue-800">
      <Header />

      <main className="pt-[84px] pb-12 sm:pb-20 lg:pb-28">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 py-12 sm:py-20 lg:py-28">
          {/* Title Section */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h1 className="font-jakarta font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-neutral-white mb-4 sm:mb-5">
              Katalog Produk Kami
            </h1>
            <p className="font-nunito text-base sm:text-lg lg:text-xl text-neutral-white/90 max-w-3xl mx-auto">
              Dapatkan informasi detail produk kami dan pilih yang sesuai dengan kebutuhan Anda.
            </p>
          </div>

          {/* Product Display */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Product Image */}
              <div className="relative">
                <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden bg-neutral-white/10">
                  <img
                    src={currentProduct.image}
                    alt={`Tabung Oksigen ${currentProduct.capacity}`}
                    className="w-full h-full object-contain p-8"
                  />
                  
                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary-blue-800/80 hover:bg-primary-blue-800 text-neutral-white flex items-center justify-center transition-all backdrop-blur-sm"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary-blue-800/80 hover:bg-primary-blue-800 text-neutral-white flex items-center justify-center transition-all backdrop-blur-sm"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-6 sm:space-y-8">
                {/* Variant Selection */}
                <div className="space-y-4">
                  <h3 className="font-jakarta font-bold text-xl sm:text-2xl text-neutral-white">
                    Pilih Varian:
                  </h3>
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    {products.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => setSelectedVariant(product.id)}
                        className={`px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-jakarta font-bold text-base sm:text-lg transition-all ${
                          selectedVariant === product.id
                            ? "bg-gradient-primary text-neutral-white shadow-lg"
                            : "bg-primary-blue-700 text-neutral-white/80 hover:bg-primary-blue-600"
                        }`}
                      >
                        {product.capacity}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <h3 className="font-jakarta font-bold text-2xl sm:text-3xl lg:text-4xl text-neutral-white">
                    {formatPrice(currentProduct.price)}
                  </h3>
                </div>

                {/* Specifications */}
                <div className="space-y-2">
                  <p className="font-nunito text-base sm:text-lg text-neutral-white/90">
                    <span className="font-semibold">Dimensi:</span> Tinggi {currentProduct.height} | Diameter {currentProduct.diameter} | Berat {currentProduct.weight} | Kapasitas {currentProduct.capacity}
                  </p>
                </div>

                {/* Included Items */}
                <div className="space-y-4">
                  <h3 className="font-jakarta font-bold text-xl sm:text-2xl text-neutral-white">
                    Kelengkapan:
                  </h3>
                  <ul className="space-y-3">
                    {includedItems.map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="font-nunito text-base sm:text-lg text-neutral-white/90">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Order Button */}
                <div className="pt-4">
                  <button
                    onClick={handleOrder}
                    className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-lg border-2 border-neutral-white bg-transparent hover:bg-neutral-white/10 text-neutral-white font-jakarta font-bold text-base sm:text-lg transition-all w-full sm:w-auto justify-center"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.6683 2.32804C12.9311 1.58732 12.0531 1.00001 11.0854 0.600331C10.1178 0.200649 9.07987 -0.00341053 8.03216 4.3116e-05C3.64221 4.3116e-05 0.0643217 3.56003 0.0643217 7.92802C0.0643217 9.32802 0.434171 10.688 1.12563 11.888L0 16L4.22111 14.896C5.38693 15.528 6.69749 15.864 8.03216 15.864C12.4221 15.864 16 12.304 16 7.93602C16 5.81603 15.1719 3.82403 13.6683 2.32804ZM8.03216 14.52C6.84221 14.52 5.67638 14.2 4.65528 13.6L4.41407 13.456L1.90553 14.112L2.57286 11.68L2.41206 11.432C1.75079 10.3817 1.39974 9.16744 1.39899 7.92802C1.39899 4.29603 4.37387 1.33604 8.02412 1.33604C9.79296 1.33604 11.4573 2.02404 12.7035 3.27203C13.3207 3.88312 13.8098 4.61007 14.1424 5.41069C14.475 6.21132 14.6446 7.06969 14.6412 7.93602C14.6573 11.568 11.6824 14.52 8.03216 14.52ZM11.6663 9.59202C11.4653 9.49602 10.4844 9.01602 10.3075 8.94402C10.1226 8.88002 9.99397 8.84802 9.85729 9.04002C9.7206 9.24002 9.34271 9.68802 9.23015 9.81602C9.11759 9.95202 8.99698 9.96802 8.79598 9.86402C8.59497 9.76802 7.95176 9.55202 7.19598 8.88002C6.601 8.35202 6.20703 7.70402 6.08643 7.50402C5.97387 7.30402 6.07035 7.20002 6.17487 7.09602C6.26332 7.00802 6.37588 6.86402 6.47236 6.75203C6.56884 6.64003 6.60904 6.55203 6.67337 6.42403C6.73769 6.28803 6.70553 6.17603 6.65729 6.08003C6.60904 5.98403 6.20703 5.00803 6.04623 4.60803C5.88543 4.22403 5.71658 4.27203 5.59598 4.26403H5.21005C5.07337 4.26403 4.86432 4.31203 4.6794 4.51203C4.50251 4.71203 3.98794 5.19203 3.98794 6.16803C3.98794 7.14402 4.70352 8.08802 4.8 8.21602C4.89648 8.35202 6.20703 10.352 8.201 11.208C8.67538 11.416 9.04523 11.536 9.33467 11.624C9.80904 11.776 10.2432 11.752 10.5889 11.704C10.9749 11.648 11.7709 11.224 11.9317 10.76C12.1005 10.296 12.1005 9.90402 12.0442 9.81602C11.9879 9.72802 11.8673 9.68802 11.6663 9.59202Z" fill="currentColor"/>
                    </svg>
                    Pesan Sekarang
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
