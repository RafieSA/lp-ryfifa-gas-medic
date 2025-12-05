import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSettings } from "@/hooks/use-pocketbase";

const navItems = [
  { name: "Beranda", path: "/" },
  { name: "Tentang", path: "/tentang" },
  { name: "Produk", path: "/produk" },
  { name: "Kontak", path: "/kontak" },
];

export default function Footer() {
  const location = useLocation();
  const { data: settings } = useSettings();
  const settingsData = settings && settings.length > 0 ? settings[0] : null;

  return (
    <footer className="bg-primary-blue-800 py-12 sm:py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 flex flex-col items-center gap-4">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center gap-2"
              >
                <span
                  className={cn(
                    "font-nunito text-base sm:text-lg leading-8 transition-colors",
                    isActive
                      ? "text-primary-blue-300 font-semibold"
                      : "text-neutral-white hover:text-primary-blue-200"
                  )}
                >
                  {item.name}
                </span>
                {isActive && (
                  <div className="w-full h-0.5 bg-primary-blue-300 rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href={`mailto:${settingsData?.email || 'info@ryfifagasmedic.com'}`}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center hover:bg-primary-blue-50 transition-colors shadow-md"
            aria-label="Email"
          >
            <img
              src="/Icon=Gmail.png"
              alt="Gmail"
              className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
            />
          </a>
          <a
            href="https://wa.me/6285325946992"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center hover:bg-primary-blue-50 transition-colors shadow-md"
            aria-label="WhatsApp"
          >
            <img
              src="/Icon=Whatsapp.png"
              alt="WhatsApp"
              className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
              style={{
                filter: 'brightness(0.5) contrast(1.3)',
              }}
            />
          </a>
          <a
            href={settingsData?.facebook_url || "https://facebook.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center hover:bg-primary-blue-50 transition-colors shadow-md"
            aria-label="Facebook"
          >
            <img
              src="/Icon=Facebook.png"
              alt="Facebook"
              className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
            />
          </a>
        </div>

        <p className="text-neutral-white/80 text-center font-nunito text-xs sm:text-sm leading-[18px] px-4 mt-4">
          Design with love by Team 8, 2025. All right reserved
        </p>
      </div>
    </footer>
  );
}
