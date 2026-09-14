import Gallery from "../components/shared/Gallery";

const portfolio = [
  {
    id: 1,
    image: "/printsGallery/print_1.webp",
    title: "Serpiente",
    category: "Ornamental",
  },
  {
    id: 2,
    image: "/printsGallery/print_2.webp",
    title: "Flor",
    category: "Linework",
  },
  {
    id: 3,
    image: "/printsGallery/print_3.webp",
    title: "Daga",
    category: "Tradicional",
  },
  {
    id: 4,
    image: "/printsGallery/print_4.webp",
    title: "Composición",
    category: "Ornamental",
  },
  {
    id: 5,
    image: "/printsGallery/print_5.webp",
    title: "Figura",
    category: "OpArt",
  },
  {
    id: 6,
    image: "/printsGallery/print_6.webp",
    title: "Rosa",
    category: "Linework",
  },
    {
    id: 7,
    image: "/printsGallery/print_7.webp",
    title: "Rosa",
    category: "Linework",
    },
      {
    id: 8,
    image: "/printsGallery/print_8.webp",
    title: "Rosa",
    category: "Linework",
  },
    {
    id: 9,
    image: "/printsGallery/print_9.webp",
    title: "Rosa",
    category: "Linework",
  },
    {
    id: 10,
    image: "/printsGallery/print_10.webp",
    title: "Rosa",
    category: "Linework",
  },
];

export default function PortfolioGalleryPage() {
  return (
    <main className="section-bg-primary">
      <section className="mx-auto w-full">
        <div className="mb-16 text-center">
          <h1 className="font-display text-5xl text-neutral-900 md:text-7xl">
            Prints
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-neutral-600 md:text-base">
            Una selección de prints creados por Sophie, disponibles para
            tatuar y adaptar a cada persona.
          </p>
        </div>

        <Gallery
          items={portfolio}
          variant="prints"
        />
      </section>
    </main>
  );
}
