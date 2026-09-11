import { ArrowUpRight } from "lucide-react";

export default function Social() {
  return (
    <section className="z-10 bg-[#e8e7e3] w-full bg-[#E8E8E8] py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="mb-5 text-xs uppercase tracking-[0.3em] text-neutral-500">
          Redes sociales
        </p>

        <a
          href="https://instagram.com/sophiearttattoo"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-block"
        >
          <h2 className="font-display text-5xl leading-none text-neutral-900 transition-opacity duration-300 group-hover:opacity-60 md:text-6xl lg:text-7xl">
            @sophiearttattoo
          </h2>
        </a>

        <p className="mx-auto mt-8 max-w-xl text-sm leading-7 text-neutral-600 md:text-base">
          Seguime en redes para ver mis últimos trabajos, nuevos diseños y
          todo lo que voy creando. Publico contenido constantemente y
          comparto nuevos tatuajes, ideas e inspiración.
        </p>
      </div>

      {/* IMAGES */}
      <div className="mt-20 grid w-full grid-cols-2">
        <div className="overflow-hidden">
          <img
            src="/social/social-1.webp"
            alt="Sophie Art Tattoo"
            className="h-full w-full object-cover saturate-50"
          />
        </div>

        <div className="overflow-hidden">
          <img
            src="/social/social-2.webp"
            alt="Sophie Art Tattoo"
            className="h-full w-full object-cover saturate-50"
          />
        </div>
      </div>
        <a
          href="https://instagram.com/sophiearttattoo"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-8 inline-flex items-center gap-3 border border-neutral-900 px-7 py-3.5 text-xs uppercase tracking-[0.2em] text-neutral-900 transition-all duration-300 hover:bg-neutral-900 hover:text-[#E8E8E8]"
        >
          Seguir en Instagram

          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </a>
    </section>
  );
}
