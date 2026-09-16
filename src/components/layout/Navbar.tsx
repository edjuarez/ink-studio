import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { contentData } from "../../data/data";
import { useLocation, Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navLinks = contentData.navigation;
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("home");

      if (!hero) {
        setScrolled(false);
        return;
      }

      const heroHeight = hero.offsetHeight;

      setScrolled(window.scrollY >= heroHeight - 50);
    };

    if (isHome) {
      window.addEventListener("scroll", handleScroll);
      requestAnimationFrame(handleScroll);
    } else {
      setScrolled(true);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHome]);

  return (
    <header
      className={`
        fixed top-0 z-50 w-full
        transition-all duration-500 ease-in-out
        ${
          scrolled || !isHome
            ? "bg-neutral-900 backdrop-blur-md"
            : "bg-transparent"
        }
      `}
    >
      <div
        className={`
          mx-auto flex items-center px-5 py-4
          transition-all duration-100 ease-in-out
          ${scrolled || !isHome ? "justify-between" : "justify-center"}
        `}
      >
        {/* LOGO */}
        <Link
          to="/"
          className={`
            flex flex-row items-center gap-3.5 leading-none
            transition-all duration-500
            ${
              scrolled || !isHome
                ? "flex-1 translate-x-0 justify-start opacity-100"
                : "pointer-events-none absolute -translate-x-8 justify-center opacity-0"
            }
          `}
        >
          <span className="grenze-gotisch-regular font-display text-lg tracking-wider text-white sm:text-[1.5rem]">
            {contentData.site.name}
          </span>

          <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.35em] text-neutral-500 sm:text-[10px]">
            {contentData.site.tagline}
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`
                group relative font-bold uppercase tracking-[0.2em]
                ${
                  scrolled || !isHome
                    ? "text-xs text-white"
                    : "text-[1rem] text-neutral-900"
                }
              `}
            >
              {link.name}

              <span
                className={`
                  absolute -bottom-1 left-0 h-px w-0
                  transition-all duration-300 ease-out
                  group-hover:w-full
                  ${scrolled || !isHome ? "bg-white" : "bg-neutral-900"}
                `}
              />
            </Link>
          ))}
        </nav>

        {/* DESKTOP RIGHT BUTTONS */}
        {scrolled || !isHome ? (
          <div className="hidden flex-1 items-center justify-end gap-3 md:flex">
            {/* INSTAGRAM */}
            <a
              href={contentData.userData.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative text-white/90 transition-colors duration-300 hover:text-white"
            >
              <FaInstagram size={28} />

              <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
            </a>

            {/* WHATSAPP */}
            <a
              href={contentData.userData.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative text-white/90 transition-colors duration-300 hover:text-white"
            >
              <FaWhatsapp size={28} />

              <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          </div>
        ) : null}

        {/* MOBILE */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`
            text-neutral-900 md:hidden
            ${scrolled || !isHome ? "ml-auto" : "absolute right-5"}
          `}
          aria-label={contentData.buttons.openMenu}
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
                className="
                  group relative w-fit py-1
                  text-xs font-medium uppercase tracking-[0.2em]
                  text-neutral-900
                "
              >
                {link.name}

                <span className="absolute bottom-0 left-0 h-px w-0 bg-neutral-900 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            <a
              href={contentData.userData.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-2 flex items-center justify-center
                border border-neutral-900
                bg-neutral-900
                py-3
                text-xs font-medium uppercase tracking-[0.15em]
                text-[#f4f1eb]
                transition-all duration-300
                hover:bg-transparent
                hover:text-neutral-900
              "
            >
              {contentData.buttons.instagram}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}