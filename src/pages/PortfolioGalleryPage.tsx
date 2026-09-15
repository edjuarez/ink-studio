import Gallery from "../components/shared/Gallery";
import FadeIn from "../components/ui/FadeIn";

const portfolio = [
  { id: 1, image: "/portfolioGallery/portfolio-1.webp" },
  { id: 2, image: "/portfolioGallery/portfolio-2.webp" },
  { id: 3, image: "/portfolioGallery/portfolio-3.webp" },
  { id: 4, image: "/portfolioGallery/portfolio-4.webp" },
  { id: 5, image: "/portfolioGallery/portfolio-5.jpg" },
  { id: 6, image: "/portfolioGallery/portfolio-6.jpg" },
  { id: 7, image: "/portfolioGallery/portfolio-7.webp" },
  { id: 8, image: "/portfolioGallery/portfolio-8.webp" },
  { id: 9, image: "/portfolioGallery/portfolio-9.webp" },
  { id: 10, image: "/portfolioGallery/portfolio-10.jpg" },
  { id: 11, image: "/portfolioGallery/portfolio-11.jpg" },
  { id: 12, image: "/portfolioGallery/portfolio-12.jpg" },
  { id: 13, image: "/portfolioGallery/portfolio-13.webp" },
  { id: 14, image: "/portfolioGallery/portfolio-14.jpg" },
  { id: 15, image: "/portfolioGallery/portfolio-15.jpg" },
  { id: 16, image: "/portfolioGallery/portfolio-16.jpg" },
  { id: 17, image: "/portfolioGallery/portfolio-17.jpg" },
  { id: 18, image: "/portfolioGallery/portfolio-18.jpg" },
  { id: 19, image: "/portfolioGallery/portfolio-19.jpg" },
  { id: 20, image: "/portfolioGallery/portfolio-20.jpg" },
  { id: 21, image: "/portfolioGallery/portfolio-21.jpg" },
  { id: 22, image: "/portfolioGallery/portfolio-22.jpg" },
  { id: 23, image: "/portfolioGallery/portfolio-23.jpg" },
  { id: 24, image: "/portfolioGallery/portfolio-24.jpg" },
  { id: 25, image: "/portfolioGallery/portfolio-25.jpg" },
  { id: 26, image: "/portfolioGallery/portfolio-26.jpg" },
  { id: 27, image: "/portfolioGallery/portfolio-27.jpg" },
  { id: 28, image: "/portfolioGallery/portfolio-28.jpg" },
  { id: 29, image: "/portfolioGallery/portfolio-29.jpg" },
  { id: 30, image: "/portfolioGallery/portfolio-30.jpg" },
  { id: 31, image: "/portfolioGallery/portfolio-31.webp" },
  { id: 32, image: "/portfolioGallery/portfolio-32.jpg" },
  { id: 33, image: "/portfolioGallery/portfolio-33.jpg" },
  { id: 34, image: "/portfolioGallery/portfolio-34.jpg" },
  { id: 35, image: "/portfolioGallery/portfolio-35.jpg" },
  { id: 36, image: "/portfolioGallery/portfolio-36.webp" },
  { id: 37, image: "/portfolioGallery/portfolio-37.jpg" },
  { id: 38, image: "/portfolioGallery/portfolio-38.jpg" },
  { id: 39, image: "/portfolioGallery/portfolio-39.webp" },
  { id: 40, image: "/portfolioGallery/portfolio-40.webp" },
];

export default function PortfolioGalleryPage() {
  return (
    <main className="section-bg-primary">
      <section className="mx-auto w-full">
        <FadeIn className="mb-16 text-center">
          <h1 className="font-display text-5xl text-neutral-900 md:text-7xl">
            Portfolio
          </h1>

{/*           <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-neutral-600 md:text-base">
            Una selección de prints creados por Sophie, disponibles para
            tatuar y adaptar a cada persona.
          </p> */}
        </FadeIn>
        <Gallery
          items={portfolio}
          variant="tattoos"
        />
      </section>
    </main>
  );
}
