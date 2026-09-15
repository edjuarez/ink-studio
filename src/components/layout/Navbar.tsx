import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { FaWhatsappSquare, FaInstagramSquare } from 'react-icons/fa';
import { contentData } from '../../data/data';
import { useLocation, Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navLinks = contentData.navigation;
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('home');

      if (!hero) return;

      const heroHeight = hero.offsetHeight;

      setScrolled(window.scrollY >= heroHeight - 50);
    };

    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`
        fixed top-0 z-50 w-full
        transition-all duration-500 ease-in-out
        ${
          scrolled || !isHome
            ? ' bg-neutral-900 backdrop-blur-md'
            : 'bg-transparent'
        }
      `}
    >
      <div
        className={`
          mx-auto flex items-center px-5 py-4
          transition-all duration-100 ease-in-out
          ${scrolled || !isHome ? 'justify-between' : 'justify-center'}
        `}
      >
        {/* LOGO */}
        <a
          href="/"
          className={`
            flex flex-row leading-none
            transition-all duration-500
            items-center gap-3.5
            ${
              scrolled || !isHome
                ? 'flex-1 justify-start translate-x-0 opacity-100 text-white'
                : 'pointer-events-none absolute -translate-x-8 opacity-0 justify-center'
            }
          `}
        >
          <span className="grenze-gotisch-regular text-white font-display text-lg tracking-wider text-neutral-900 sm:text-[1.5rem]">
            Sophie Art
          </span>

          <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.35em] text-neutral-500 sm:text-[10px]">
            TATTOO
          </span>
        </a>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`
                font-bold uppercase tracking-[0.2em]
                ${
                  scrolled || !isHome
                    ? "text-xs text-white hover:text-neutral-500"
                    : "text-[1rem] text-neutral-900 hover:text-[#f4f1eb] underline-offset-4 hover:underline"
                }
              `}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* DESKTOP RIGHT BUTTONS */}
        {scrolled || !isHome ? (
          <div className="hidden flex-1 items-center justify-end gap-3 md:flex">
            <a
              href="https://instagram.com/sophiearttattoo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/90 transition-colors duration-300 hover:text-white"
            >
              <FaInstagramSquare size={28} />
            </a>
            <a
              href="https://wa.me/34600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/90 transition-colors duration-300 hover:text-white"
            >
              <FaWhatsappSquare size={28} />
            </a>
          </div>
        ) : null}

        {/* MOBILE */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`
            text-neutral-900 md:hidden
            ${scrolled || !isHome ? 'ml-auto' : 'absolute right-5'}
          `}
          aria-label="Abrir menú de navegación"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="border-t border-neutral-300/50 bg-[#f4f1eb] px-6 pb-6 pt-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-1 text-xs font-medium uppercase tracking-[0.2em] text-neutral-900"
              >
                {link.name}
              </a>
            ))}

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center border border-neutral-900 bg-neutral-900 py-3 text-xs font-medium uppercase tracking-[0.15em] text-[#f4f1eb]"
            >
              Instagram
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}