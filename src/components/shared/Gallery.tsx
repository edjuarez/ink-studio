import { ArrowUpRight } from 'lucide-react';

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
    <section id="galeria" className="z-10 w-full bg-[#e8e7e3] px-6 py-24 text-neutral-900">
      <div className="mx-auto">
        
        <div className="mb-16 flex flex-col">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.35em] text-neutral-500 sm:text-xs">
            Portafolio Seleccionado
          </p>
          <h2 className="section-title-secondary">
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
              <div className="cursor-pointer relative aspect-[3/4] w-full overflow-hidden bg-neutral-300">
                <img
                  src={work.image}
                  alt={work.title}
                  className="saturate-50 contrast-105 transition-all duration-700 group-hover:saturate-100 h-full w-full object-cover duration-1000 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                {/* <div className="absolute inset-0 bg-neutral-950/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" /> */}
              </div>
            </div>
          ))}
        </div>

        {/* Botón hacia la galería completa */}
        <div className="mt-16 flex justify-center">
            <div className="border-2 border-neutral-700 p-1.5">
              <a
                href="#contacto"
                className="group relative bg-neutral-700 flex items-center gap-3 overflow-hidden border-2 border-neutral-700 px-7 py-3.5 uppercase tracking-[0.15em]"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-neutral-900 transition-transform duration-500 group-hover:scale-x-100" />

                <span className="text-white relative z-10 transition-colors duration-500 group-hover:text-[#E8E8E8]">
                  Ver diseños
                </span>
              </a>
            </div>
        </div>

      </div>
    </section>
  );
}