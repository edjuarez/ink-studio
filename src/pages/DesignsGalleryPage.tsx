import Gallery from "../components/shared/Gallery";
import FadeIn from "../components/ui/FadeIn";

const designs = [
  {
    id: 1,
    image: "/designsGallery/opticArt/design-1.webp",
    category: "opticArt",
  },
  {
    id: 2,
    image: "/designsGallery/opticArt/design-2.webp",
    category: "opticArt",
  },
  {
    id: 3,
    image: "/designsGallery/opticArt/design-3.webp",
    category: "opticArt",
  },
  {
    id: 4,
    image: "/designsGallery/opticArt/design-4.webp",
    category: "opticArt",
  },
  {
    id: 5,
    image: "/designsGallery/opticArt/design-5.webp",
    category: "opticArt",
  },
  {
    id: 6,
    image: "/designsGallery/opticArt/design-6.webp",
    category: "opticArt",
  },
  {
    id: 7,
    image: "/designsGallery/opticArt/design-7.webp",
    category: "opticArt",
  },
  {
    id: 8,
    image: "/designsGallery/opticArt/design-8.webp",
    category: "opticArt",
  },
  {
    id: 9,
    image: "/designsGallery/opticArt/design-9.webp",
    category: "opticArt",
  },
  {
    id: 10,
    image: "/designsGallery/opticArt/design-10.webp",
    category: "opticArt",
  },
  {
    id: 11,
    image: "/designsGallery/opticArt/design-11.webp",
    category: "opticArt",
  },
  {
    id: 12,
    image: "/designsGallery/opticArt/design-12.webp",
    category: "opticArt",
  },
  {
    id: 13,
    image: "/designsGallery/opticArt/design-13.webp",
    category: "opticArt",
  },
  {
    id: 14,
    image: "/designsGallery/opticArt/design-14.webp",
    category: "opticArt",
  },
  {
    id: 15,
    image: "/designsGallery/opticArt/design-15.webp",
    category: "opticArt",
  },
  {
    id: 16,
    image: "/designsGallery/opticArt/design-16.webp",
    category: "opticArt",
  },
  {
    id: 17,
    image: "/designsGallery/opticArt/design-17.webp",
    category: "opticArt",
  },
  {
    id: 18,
    image: "/designsGallery/ornamental/design-1.webp",
    category: "ornamental",
  },
  {
    id: 19,
    image: "/designsGallery/ornamental/design-2.webp",
    category: "ornamental",
  },
  {
    id: 20,
    image: "/designsGallery/ornamental/design-3.webp",
    category: "ornamental",
  },
  {
    id: 21,
    image: "/designsGallery/ornamental/design-4.webp",
    category: "ornamental",
  },
  {
    id: 22,
    image: "/designsGallery/ornamental/design-5.webp",
    category: "ornamental",
  },
  {
    id: 23,
    image: "/designsGallery/ornamental/design-6.webp",
    category: "ornamental",
  },
  {
    id: 24,
    image: "/designsGallery/ornamental/design-7.webp",
    category: "ornamental",
  },
  {
    id: 25,
    image: "/designsGallery/ornamental/design-8.webp",
    category: "ornamental",
  },
  {
    id: 26,
    image: "/designsGallery/ornamental/design-9.webp",
    category: "ornamental",
  },
  {
    id: 27,
    image: "/designsGallery/ornamental/design-10.webp",
    category: "ornamental",
  },
  {
    id: 28,
    image: "/designsGallery/ornamental/design-11.webp",
    category: "ornamental",
  },
  {
    id: 29,
    image: "/designsGallery/ornamental/design-12.jpg",
    category: "ornamental",
  },
  {
    id: 30,
    image: "/designsGallery/ornamental/design-13.jpg",
    category: "ornamental",
  },
  {
    id: 31,
    image: "/designsGallery/tradicional/design-1.webp",
    category: "tradicional",
  },
  {
    id: 32,
    image: "/designsGallery/tradicional/design-2.webp",
    category: "tradicional",
  },
  {
    id: 33,
    image: "/designsGallery/tradicional/design-3.webp",
    category: "tradicional",
  },
  {
    id: 34,
    image: "/designsGallery/tradicional/design-4.jpg",
    category: "tradicional",
  },
  {
    id: 35,
    image: "/designsGallery/tradicional/design-5.webp",
    category: "tradicional",
  },
  {
    id: 36,
    image: "/designsGallery/tradicional/design-6.webp",
    category: "tradicional",
  },
  {
    id: 37,
    image: "/designsGallery/tradicional/design-7.webp",
    category: "tradicional",
  },
  {
    id: 38,
    image: "/designsGallery/tradicional/design-8.webp",
    category: "tradicional",
  },
  {
    id: 39,
    image: "/designsGallery/tradicional/design-9.webp",
    category: "tradicional",
  },
  {
    id: 40,
    image: "/designsGallery/tradicional/design-10.webp",
    category: "tradicional",
  },
];

export default function DesignsGalleryPage() {
  return (
    <main className="section-bg-primary">
      <section className="mx-auto w-full">

        <FadeIn className="mb-16 text-center">

          <h1 className="font-display text-5xl text-neutral-900 md:text-7xl">
            Diseños
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-neutral-600 md:text-base">
            Una selección de diseños creados por Sophie, disponibles para
            tatuar y adaptar a cada persona.
          </p>
        </FadeIn>

        <Gallery
          items={designs}
          variant="designs"
        />

      </section>
    </main>
  );
}
