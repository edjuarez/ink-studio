//import { Instagram } from 'lucide-react';

export default function Social() {
  return (
    <section className="w-full bg-[#f4f1eb] px-6 py-24 text-neutral-900">
      <div className="mx-auto max-w-4xl text-center">
        
        {/* Cabecera */}
        <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.35em] text-neutral-500 sm:text-xs">
          Comunidad & Día a Día
        </p>
        
        <h2 className="font-serif text-3xl font-normal tracking-tight sm:text-5xl">
          Seguime en redes
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-neutral-600 sm:text-base">
          Explorá el proceso creativo, diseños disponibles en flash, videos del día a día en el estudio y contenido exclusivo.
        </p>

        {/* Imagen Rectangular Centrada */}
        <div className="my-10 overflow-hidden bg-neutral-300">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=1200&auto=format&fit=crop"
              alt="Muestra de contenido en redes sociales"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        {/* Botón de Instagram */}
        <div className="flex justify-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 border border-neutral-900 bg-neutral-900 px-8 py-4 text-xs font-medium uppercase tracking-[0.25em] text-[#f4f1eb] transition-all duration-300 hover:bg-transparent hover:text-neutral-900"
          >
            {/* <Instagram size={16} /> */}
            <span>Seguir en Instagram</span>
          </a>
        </div>

      </div>
    </section>
  );
}