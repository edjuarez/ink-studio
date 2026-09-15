import { ArrowUpRight } from "lucide-react";
import {contentData} from "../../data/data";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-900/15 bg-[#E8E8E8] text-neutral-900">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10 lg:px-12">
        {/* Main footer */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Logo + description */}
          <div className="flex flex-col items-start gap-3">
            <a
              href="/"
              className="grenze-gotisch-regular text-5xl leading-none transition-opacity hover:opacity-60"
            >
              Sophie Art
            </a>
            <span className="mt-1 md:text-[1rem] text-[9px] font-medium uppercase tracking-[0.35em] text-neutral-500">
            TATTOO
             </span>

            <p className="mt-5 max-w-xs text-sm leading-6 text-neutral-600">
              Artista de tatuajes en Barcelona. Diseños personalizados
              pensados para cada persona y su propia forma de expresión.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-neutral-500">
              Navegación
            </p>

            <nav className="flex flex-col items-start gap-3 text-sm">
              {contentData.navigation.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="transition-opacity hover:opacity-50"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Policies */}
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-neutral-500">
              Políticas
            </p>

            <nav className="flex flex-col items-start gap-3 text-sm">
              <a
                href="/privacidad"
                className="transition-opacity hover:opacity-50"
              >
                Política de privacidad
              </a>

              <a
                href="/cookies"
                className="transition-opacity hover:opacity-50"
              >
                Política de cookies
              </a>

              <a
                href="/aviso-legal"
                className="transition-opacity hover:opacity-50"
              >
                Aviso legal
              </a>
            </nav>
          </div>

          {/* Information */}
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-neutral-500">
              Información
            </p>

            <div className="flex flex-col gap-3 text-sm text-neutral-700">
              <a
                href="tel:+34600000000"
                className="transition-opacity hover:opacity-50"
              >
                +34 600 000 000
              </a>

              <p>Barcelona, España</p>

              <p>
                Lunes — Viernes
                <br />
                10:00 — 19:00
              </p>

              <a
                href="mailto:hola@sophiearttattoo.com"
                className="transition-opacity hover:opacity-50"
              >
                hola@sophiearttattoo.com
              </a>

              <a
                href="https://instagram.com/sophiearttattoo"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-fit items-center gap-2 transition-opacity hover:opacity-50"
              >
                Instagram
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col gap-3 border-t border-neutral-900/15 pt-6 text-[10px] uppercase tracking-[0.18em] text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Sophie Art Tattoo. Todos los
            derechos reservados.
          </p>

          <a
            href="#"
            className="transition-opacity hover:opacity-60"
          >
            Hecho por Tuchidigital
          </a>
        </div>
      </div>
    </footer>
  );
}
