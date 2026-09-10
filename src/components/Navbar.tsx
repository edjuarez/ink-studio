import { useState } from 'react';
import {  Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Artista', href: '#sobre-mi' },
    { name: 'Diseños', href: '#disenos' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-300/40 bg-black backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="group flex items-center gap-3.5">
{/*           <div className="h-full w-20 shrink-0 overflow-hidden">
            <img
              src="logo.webp"
              alt="Logo Artista"
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div> */}
          <div className="flex flex-col leading-none">
            <span className="text-white font-display text-lg font-normal uppercase tracking-wider text-neutral-900 sm:text-xl">
              Sophie
            </span>
            <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.35em] text-neutral-500 sm:text-[10px]">
              TATTOO
            </span>
          </div>
        </a>

        {/* Menú Desktop (derecha) */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-white text-xs font-medium uppercase tracking-[0.2em] text-neutral-800 transition-colors hover:text-neutral-500"
            >
              {link.name}
            </a>
          ))}

          {/* Botón Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-neutral-900 px-4 py-2 text-xs font-medium uppercase tracking-[0.15em] text-neutral-900 transition-all duration-300 hover:bg-neutral-900 hover:text-[#f4f1eb]"
          >
           {/*  <Instagram size={14} /> */}
            <span>Instagram</span>
          </a>
        </nav>

        {/* Botón Menú Hamburguesa para Mobile */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 text-neutral-900 md:hidden"
          aria-label="Abrir menú de navegación"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menú Desplegable Móvil */}
      {isOpen && (
        <div className="border-b border-neutral-300/50 bg-[#f4f1eb] px-6 pb-6 pt-2 md:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-1 text-xs font-medium uppercase tracking-[0.2em] text-neutral-900 transition-colors hover:text-neutral-500"
              >
                {link.name}
              </a>
            ))}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 border border-neutral-900 bg-neutral-900 py-3 text-xs font-medium uppercase tracking-[0.15em] text-[#f4f1eb]"
            >
              {/* <Instagram size={14} /> */}
              <span>Instagram</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}