import Gallery from "../components/shared/Gallery";

const designs = [
  {
    id: 1,
    image: "/designs/design-1.webp",
    title: "Serpiente",
    category: "Ornamental",
  },
  {
    id: 2,
    image: "/designs/design-2.webp",
    title: "Flor",
    category: "Linework",
  },
  {
    id: 3,
    image: "/designs/design-3.webp",
    title: "Daga",
    category: "Tradicional",
  },
  {
    id: 4,
    image: "/designs/design-4.webp",
    title: "Composición",
    category: "Ornamental",
  },
  {
    id: 5,
    image: "/designs/design-5.webp",
    title: "Figura",
    category: "OpArt",
  },
  {
    id: 6,
    image: "/designs/design-6.webp",
    title: "Rosa",
    category: "Linework",
  },
];

export default function DesignsGalleryPage() {
  return (
    <main className="section-bg-primary">
      <section className="mx-auto w-full">

        <div className="mb-16 text-center">

          <h1 className="font-display text-5xl text-neutral-900 md:text-7xl">
            Diseños
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-neutral-600 md:text-base">
            Una selección de diseños creados por Sophie, disponibles para
            tatuar y adaptar a cada persona.
          </p>
        </div>

        <Gallery
          items={designs}
          variant="designs"
        />

      </section>
    </main>
  );
}
