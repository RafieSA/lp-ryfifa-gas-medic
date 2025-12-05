import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Send } from "lucide-react";

export default function Kontak() {
  const [formData, setFormData] = useState({
    nama: "",
    whatsapp: "",
    alamat: "",
    pesan: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mengarah ke link WhatsApp yang sama dengan tombol lainnya
    window.open("https://wa.me/6285325946992", "_blank");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-primary-blue-800">
      <Header />

      <main className="pt-[84px] pb-12 sm:pb-20 lg:pb-28">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 py-12 sm:py-20 lg:py-28">
          {/* Title Section */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h1 className="font-jakarta font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-neutral-white mb-4 sm:mb-5">
              Hubungi Kami
            </h1>
            <p className="font-nunito text-base sm:text-lg lg:text-xl text-neutral-white/90 max-w-3xl mx-auto">
              Kami siap membantu Anda. Jangan ragu menghubungi kami untuk berkonsultasi dengan tim kami
            </p>
          </div>

          {/* Contact Form Card */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-neutral-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                {/* Nama Lengkap */}
                <div className="space-y-2">
                  <label htmlFor="nama" className="block font-nunito font-semibold text-base sm:text-lg text-neutral-black">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="nama"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    placeholder="Masukkan nama lengkap Anda..."
                    required
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg border border-neutral-light bg-neutral-white/50 focus:outline-none focus:ring-2 focus:ring-primary-blue-500 focus:border-transparent font-nunito text-base text-neutral-black placeholder:text-neutral-dark/60 transition-all"
                  />
                </div>

                {/* Nomor WhatsApp */}
                <div className="space-y-2">
                  <label htmlFor="whatsapp" className="block font-nunito font-semibold text-base sm:text-lg text-neutral-black">
                    Nomor WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="Masukkan nomor WhatsApp Anda... (Contoh: 08xxxxxxxxxx)"
                    required
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg border border-neutral-light bg-neutral-white/50 focus:outline-none focus:ring-2 focus:ring-primary-blue-500 focus:border-transparent font-nunito text-base text-neutral-black placeholder:text-neutral-dark/60 transition-all"
                  />
                </div>

                {/* Alamat Lengkap */}
                <div className="space-y-2">
                  <label htmlFor="alamat" className="block font-nunito font-semibold text-base sm:text-lg text-neutral-black">
                    Alamat Lengkap
                  </label>
                  <input
                    type="text"
                    id="alamat"
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleChange}
                    placeholder="Masukkan alamat lengkap Anda... (Contoh: RT xx / RW xx, Desa xxxx, Kecamatan xxxx, Kabupaten xxxx)"
                    required
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg border border-neutral-light bg-neutral-white/50 focus:outline-none focus:ring-2 focus:ring-primary-blue-500 focus:border-transparent font-nunito text-base text-neutral-black placeholder:text-neutral-dark/60 transition-all"
                  />
                </div>

                {/* Pesan */}
                <div className="space-y-2">
                  <label htmlFor="pesan" className="block font-nunito font-semibold text-base sm:text-lg text-neutral-black">
                    Pesan
                  </label>
                  <textarea
                    id="pesan"
                    name="pesan"
                    value={formData.pesan}
                    onChange={handleChange}
                    placeholder="Ketik pesan disini..."
                    rows={6}
                    required
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg border border-neutral-light bg-neutral-white/50 focus:outline-none focus:ring-2 focus:ring-primary-blue-500 focus:border-transparent font-nunito text-base text-neutral-black placeholder:text-neutral-dark/60 resize-none transition-all"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-gradient-primary text-neutral-white font-jakarta font-bold text-base sm:text-lg shadow-lg hover:opacity-90 transition-opacity"
                  >
                    Kirim Pesan
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
