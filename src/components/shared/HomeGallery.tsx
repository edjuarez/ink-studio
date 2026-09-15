import ActionButton from '../ui/ActionButton';
import FadeIn from '../ui/FadeIn';

const featuredWorks = [
  {
    id: 1,
    title: 'Serpiente & Peonía',
    style: 'Blackwork',
    image: 'portfolioGallery/portfolio-18.jpg',
  },
  {
    id: 2,
    title: 'Retrato Botánico',
    style: 'Fine Line',
    image: 'portfolioGallery/portfolio-2.webp',
  },
  {
    id: 3,
    title: 'Geometría Sagrada',
    style: 'Dotwork',
    image: 'portfolioGallery/portfolio-3.webp',
  },
  {
    id: 4,
    title: 'Daga Minimalista',
    style: 'Microrealismo',
    image: 'portfolioGallery/portfolio-4.webp',
  },
  {
    id: 5,
    title: 'Dragón Japonés',
    style: 'Custom Blackwork',
    image: 'portfolioGallery/portfolio-5.webp',
  },
  {
    id: 6,
    title: 'Composición Floral',
    style: 'Fine Line',
    image: 'portfolioGallery/portfolio-6.webp',
  },
];

export default function HomeGallery() {
  return (
    <section id="galeria" className="section-bg-primary">
      <div className="mx-auto">
        
        <FadeIn className="mb-16 flex flex-col">
          <p className="section-name">
            Portafolio Seleccionado
          </p>
          <h2 className="section-title-secondary">
            Trabajos Recientes
          </h2>
        </FadeIn>

        <FadeIn className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {featuredWorks.map((work) => (
            <div
              key={work.id}
              className="group relative flex flex-col overflow-hidden bg-neutral-200/50"
            >
              <div className="cursor-pointer relative aspect-[3/4] w-full overflow-hidden bg-neutral-300">
                <img
                  src={work.image}
                  alt={work.title}
                  className="saturate-80 contrast-105 transition-all duration-700 group-hover:saturate-100 h-full w-full object-cover duration-1000 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                {/* <div className="absolute inset-0 bg-neutral-950/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" /> */}
              </div>
            </div>
          ))}
        </FadeIn>
        <div className="flex justify-center">
            <ActionButton href="/portfolio" variant="light">
              Ver diseños
            </ActionButton>
        </div>
      </div>
    </section>
  );
}