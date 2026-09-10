import { ArrowUpRight } from 'lucide-react';

// Datos de ejemplo (puedes reemplazarlos con tus imágenes reales)
const featuredWorks = [
  {
    id: 1,
    title: 'Serpiente & Peonía',
    style: 'Blackwork',
    image: 'homeGallery/home1.webp',
  },
  {
    id: 2,
    title: 'Retrato Botánico',
    style: 'Fine Line',
    image: 'homeGallery/home2.webp',
  },
  {
    id: 3,
    title: 'Geometría Sagrada',
    style: 'Dotwork',
    image: 'homeGallery/home3.webp',
  },
  {
    id: 4,
    title: 'Daga Minimalista',
    style: 'Microrealismo',
    image: 'homeGallery/home4.webp',
  },
  {
    id: 5,
    title: 'Dragón Japonés',
    style: 'Custom Blackwork',
    image: 'homeGallery/home5.webp',
  },
  {
    id: 6,
    title: 'Composición Floral',
    style: 'Fine Line',
    image: 'homeGallery/home6.webp',
  },
];

export default function HomeGallery() {
  return (
    <section className="w-full bg-[#f4f1eb] px-6 py-24 text-neutral-900">
      <div className="mx-auto max-w-6xl">
        
        {/* Cabecera de la sección */}
        <div className="mb-16 flex flex-col items-center text-center">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.35em] text-neutral-500 sm:text-xs">
            Portafolio Seleccionado
          </p>
          <h2 className="font-serif text-3xl font-normal tracking-tight sm:text-5xl">
            Trabajos Recientes
          </h2>
        </div>

        {/* Grilla de 6 imágenes */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {featuredWorks.map((work) => (
            <div
              key={work.id}
              className="group relative flex flex-col overflow-hidden bg-neutral-200/50"
            >
              {/* Contenedor con aspecto de proporción fija (vertical 3:4 ideal para tatuajes) */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-300">
                <img
                  src={work.image}
                  alt={work.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Overlay sutil al hacer hover */}
                <div className="absolute inset-0 bg-neutral-950/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </div>
          ))}
        </div>

        {/* Botón hacia la galería completa */}
        <div className="mt-16 flex justify-center">
          <a
            href="/galeria" // O '#galeria' / enlace de React Router / Next.js Link
            className="group inline-flex items-center gap-3 border border-neutral-900/30 px-8 py-4 text-xs font-medium uppercase tracking-[0.25em] text-neutral-900 transition-all duration-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-[#f4f1eb]"
          >
            Ver Galería Completa
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>

      </div>
    </section>
  );
}