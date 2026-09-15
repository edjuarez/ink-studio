import Gallery from "../components/shared/Gallery";
import FadeIn from "../components/ui/FadeIn";

const prints = [
  {
    id: 1,
    image: "/printsGallery/print-1.webp",
    title: "Serpiente",
    category: "Ornamental",
  },
  {
    id: 2,
    image: "/printsGallery/print-2.webp",
    title: "Flor",
    category: "Linework",
  },
  {
    id: 3,
    image: "/printsGallery/print-3.webp",
    title: "Daga",
    category: "Tradicional",
  },
  {
    id: 4,
    image: "/printsGallery/print-4.webp",
    title: "Composición",
    category: "Ornamental",
  },
  {
    id: 5,
    image: "/printsGallery/print-5.webp",
    title: "Figura",
    category: "OpArt",
  },
  {
    id: 6,
    image: "/printsGallery/print-6.webp",
    title: "Rosa",
    category: "Linework",
  },
    {
    id: 7,
    image: "/printsGallery/print-7.webp",
    title: "Rosa",
    category: "Linework",
    },
      {
    id: 8,
    image: "/printsGallery/print-8.webp",
    title: "Rosa",
    category: "Linework",
  },
    {
    id: 9,
    image: "/printsGallery/print-9.webp",
    title: "Rosa",
    category: "Linework",
  },
    {
    id: 10,
    image: "/printsGallery/print-10.webp",
    title: "Rosa",
    category: "Linework",
  },
];

export default function PrintsGalleryPage() {
  return (
    <main className="section-bg-primary">
      <section className="mx-auto w-full">
        <FadeIn className="mb-16 text-center">
          <h1 className="font-display text-5xl text-neutral-900 md:text-7xl">
            Prints
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-neutral-600 md:text-base">
            Una selección de prints creados por Sophie, disponibles para
            tatuar y adaptar a cada persona.
          </p>
        </FadeIn>

        <Gallery
          items={prints}
          variant="prints"
        />
      </section>
    </main>
  );
}
