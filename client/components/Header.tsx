import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { name: "Beranda", path: "/" },
  { name: "Tentang", path: "/tentang" },
  { name: "Produk", path: "/produk" },
  { name: "Kontak", path: "/kontak" },
];

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary-blue-800/95 backdrop-blur-sm shadow-lg">
      <nav className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 py-4 sm:py-5 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 sm:gap-3" onClick={() => setMobileMenuOpen(false)}>
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gradient-to-br from-primary-blue-500 to-primary-blue-800 flex items-center justify-center flex-shrink-0 border-2 border-white/20">
            <span className="text-white font-jakarta font-bold text-lg sm:text-xl">R</span>
          </div>
          <span className="text-neutral-white font-jakarta font-bold text-xl sm:text-2xl lg:text-3xl leading-tight">
            RYFIFA Gas Medic
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-2 lg:gap-4">
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
                    "font-nunito text-base lg:text-lg leading-8 transition-colors",
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

        <button
          className="md:hidden text-neutral-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden bg-primary-blue-800 border-t border-primary-blue-700/50">
          <div className="max-w-[1440px] mx-auto px-4 py-4 flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-primary-blue-700/50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span
                    className={cn(
                      "font-nunito text-base leading-8",
                      isActive
                        ? "text-primary-blue-300 font-semibold"
                        : "text-neutral-white"
                    )}
                  >
                    {item.name}
                  </span>
                  {isActive && (
                    <div className="w-1.5 h-1.5 bg-primary-blue-300 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
